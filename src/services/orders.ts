// src/services/orders.ts
// A lightweight orders service that works with your existing backend endpoints
// and falls back to localStorage when the API is unavailable.

import { BASE_URL } from "../constants/urls";

export type AddressPayload = {
  province: string;
  territory: string;
  sector: string;
  quarter: string;
  village: string;
};

export type CartCow = {
  id: number;
  name: string;
  price: string | number;
  photos?: string[];
};

export type CartItem = {
  id: number; // cart row id (if any)
  cow: CartCow;
};

export type OrderItem = {
  id?: number;
  cow_id: number;
  name?: string;
  price?: number;
  photo?: string;
  quantity?: number;
};

export type OrderRecord = {
  id: number | string;
  created_at?: string;
  date?: string; // some APIs return a date field
  status?: string;
  total?: number;
  items?: OrderItem[];
  phone?: string;
  address?: string[] | AddressPayload | string;
};

// Normalizes server payloads to OrderRecord[]
function normalizeOrders(raw: any): OrderRecord[] {
  if (!raw) return [];

  // If backend returns an array of rows with fields id, created_at, status, total
  if (Array.isArray(raw) && raw.length && (raw[0].id !== undefined)) {
    return raw.map((r) => ({
      id: r.id,
      created_at: r.created_at || r.createdAt || r.date,
      date: r.date,
      status: r.status || r.order_status,
      total: Number(r.total ?? r.amount ?? 0),
      items: r.items || r.order_items || [],
      phone:
        r.phone ||
        r.user_phone ||
        r.contact_phone ||
        r.phone_number ||
        r.phoneNumber ||
        r.mobile ||
        r.mobile_number ||
        r.tel ||
        r.telephone,
      address:
        r.address ||
        r.delivery_address ||
        r.shipping_address ||
        r.shippingAddress ||
        [
          r.province || r.province_name || r.provinceName,
          r.territory || r.city || r.district,
          r.sector || r.sector_name || r.sectorName,
          r.quarter || r.street || r.cell,
          r.village || r.village_name || r.villageName,
        ].filter(Boolean),
    }));
  }

  // If backend returns { orders: [...] }
  if (raw.orders && Array.isArray(raw.orders)) return normalizeOrders(raw.orders);

  return [];
}

export async function createOrdersForCart(params: {
  userId: number;
  cartItems: CartItem[];
  address: AddressPayload;
  phone?: string;
}): Promise<void> {
  const { userId, cartItems, address, phone } = params;

  // Current backend accepts one order per cow. Keep behavior for compatibility.
  // We also store a local backup so the Orders page can still show something
  // if the backend is down.
  const localOrdersKey = `orders:user:${userId}`;
  const localNow = new Date().toISOString();

  for (const item of cartItems) {
    try {
      const res = await fetch(`${BASE_URL}/api/order/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          cow_id: item.cow.id,
          address: [
            address.province,
            address.territory,
            address.sector,
            address.quarter,
            address.village,
          ],
          phone,
        }),
      });

      if (!res.ok) {
        // If server rejects, still store locally as a fallback
        console.warn("Order create failed with status", res.status);
      }
    } catch (e) {
      console.warn("Order create network error, storing locally", e);
    } finally {
      // Local backup (append minimal order)
      const existing: OrderRecord[] = JSON.parse(
        localStorage.getItem(localOrdersKey) || "[]"
      );
      const newOrder: OrderRecord = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        created_at: localNow,
        status: "Processing",
        total: Number(item.cow.price) || 0,
        phone,
        address: [
          address.province,
          address.territory,
          address.sector,
          address.quarter,
          address.village,
        ],
        items: [
          {
            cow_id: item.cow.id,
            name: item.cow.name,
            price: Number(item.cow.price) || 0,
            photo: item.cow.photos?.[0],
            quantity: 1,
          },
        ],
      };
      existing.unshift(newOrder);
      localStorage.setItem(localOrdersKey, JSON.stringify(existing.slice(0, 50)));
      // Save last known contact for enrichment of remote orders
      try {
        localStorage.setItem(
          `orders:lastContact:user:${userId}`,
          JSON.stringify({ phone, address: newOrder.address })
        );
      } catch (_) {}
    }
  }
}

export async function fetchUserOrders(userId: number): Promise<OrderRecord[]> {
  // Try a few common endpoints. The first that returns 2xx wins.
  const tries: Array<() => Promise<Response>> = [
    () => fetch(`${BASE_URL}/api/order/by-user`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: userId }) }),
    () => fetch(`${BASE_URL}/api/order/user-orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: userId }) }),
    () => fetch(`${BASE_URL}/api/order/getbyuserid`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: userId }) }),
    () => fetch(`${BASE_URL}/api/order/list?user_id=${userId}`),
    () => fetch(`${BASE_URL}/api/order/user/${userId}`),
  ];

  for (const attempt of tries) {
    try {
      const res = await attempt();
      if (!res.ok) continue;
      const data = await res.json();
      const normalized = normalizeOrders(data);
      if (normalized.length) {
        // Enrich with last known contact if missing
        try {
          const last = localStorage.getItem(`orders:lastContact:user:${userId}`);
          if (last) {
            const parsed = JSON.parse(last);
            return normalized.map((o) => ({
              ...o,
              phone: o.phone ?? parsed.phone ?? o.phone,
              address: o.address ?? parsed.address ?? o.address,
            }));
          }
        } catch (_) {
          // ignore enrich errors
        }
        return normalized;
      }
    } catch (_) {
      // ignore and try the next endpoint
    }
  }

  // Fallback: read any local backups
  const local = localStorage.getItem(`orders:user:${userId}`);
  if (local) {
    try {
      const arr: OrderRecord[] = JSON.parse(local);
      // Enrich with last known contact if missing
      try {
        const last = localStorage.getItem(`orders:lastContact:user:${userId}`);
        if (last) {
          const parsed = JSON.parse(last);
          return arr.map((o) => ({
            ...o,
            phone: o.phone ?? parsed.phone ?? o.phone,
            address: o.address ?? parsed.address ?? o.address,
          }));
        }
      } catch (_) {}
      return arr;
    } catch (_) {
      return [];
    }
  }
  return [];
}
