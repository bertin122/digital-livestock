import React, { useEffect, useMemo, useState } from "react";
import { Package, Calendar, DollarSign, Eye } from "lucide-react";
import { fetchUserOrders } from "../services/orders";
import type { OrderRecord } from "../services/orders";
import { getUserId } from "../services/auth";
import { BASE_URL } from "../constants/urls";

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | number | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const uid = getUserId();
        if (!uid) {
          if (mounted) setOrders([]);
          return;
        }
        const list = await fetchUserOrders(uid);
        if (mounted) setOrders(list);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id: string | number) => {
    const uid = getUserId();
    if (!uid) return;
    setDeletingId(id);
    try {
      if (String(id).startsWith("local-")) {
        const key = `orders:user:${uid}`;
        const existingRaw = localStorage.getItem(key);
        const existing: any[] = existingRaw ? JSON.parse(existingRaw) : [];
        const filtered = existing.filter((o) => String(o.id) !== String(id));
        localStorage.setItem(key, JSON.stringify(filtered));
        setOrders((prev) => prev.filter((o) => String(o.id) !== String(id)));
      } else {
        const res = await fetch(`${BASE_URL}/api/order/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          setOrders((prev) => prev.filter((o) => String(o.id) !== String(id)));
        } else {
          console.warn("Delete failed", res.status);
        }
      }
    } catch (e) {
      console.warn("Delete error", e);
    } finally {
      setDeletingId(null);
    }
  };

  const pretty = useMemo(
    () =>
      orders.map((o) => ({
        id: o.id,
        date: o.date || (o.created_at ? new Date(o.created_at).toLocaleDateString() : ""),
        status: o.status || "Processing",
        total: typeof o.total === "number" ? `$${o.total.toFixed(2)}` : "-",
        items: o.items?.length ?? 1,
      })),
    [orders]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
      case "completed":
        return "text-green-600 bg-green-100";
      case "Shipped":
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "Processing":
      case "processing":
      default:
        return "text-yellow-700 bg-yellow-100";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Loading your order history...</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="h-6 bg-gray-200 w-40 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-14 bg-gray-100 rounded" />
            <div className="h-14 bg-gray-100 rounded" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">View and track your order history.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
        </div>
        <div className="p-6">
          {pretty.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {pretty.map((order) => {
                const full = orders.find((o) => String(o.id) === String(order.id));
                const isOpen = openId !== null && String(openId) === String(order.id);
                const addressParts = Array.isArray((full as any)?.address)
                  ? ((full as any).address as string[])
                  : full && typeof (full as any).address === "object" && (full as any).address !== null
                  ? [
                      (full as any).address.province,
                      (full as any).address.territory,
                      (full as any).address.sector,
                      (full as any).address.quarter,
                      (full as any).address.village,
                    ].filter(Boolean) as string[]
                  : typeof (full as any)?.address === "string"
                  ? [((full as any).address as string)]
                  : [];
                return (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Package className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4" />
                            <span>{order.items} items</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{order.total}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setOpenId(isOpen ? null : order.id)} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{isOpen ? "Hide Details" : "View Details"}</span>
                        </button>
                        <button onClick={() => handleDelete(order.id)} disabled={deletingId === order.id} className={`text-sm ${deletingId === order.id ? "text-gray-400" : "text-red-600 hover:text-red-800"}`}>
                          {deletingId === order.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-4 border-t pt-4">
                        <div className="mb-3 text-sm text-gray-700">
                          <div>
                            <span className="font-medium">Phone:</span> {full && (full as any).phone ? (full as any).phone : "-"}
                          </div>
                          <div>
                            <span className="font-medium">Address:</span> {addressParts.length ? addressParts.join(", ") : "-"}
                          </div>
                        </div>
                        {full?.items?.length ? (
                          <div className="space-y-2">
                            {full.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {it.photo ? (
                                    <img
                                      src={it.photo}
                                      alt={it.name || `Cow ${it.cow_id}`}
                                      className="w-10 h-10 rounded object-cover"
                                    />
                                  ) : null}
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">{it.name || `Cow #${it.cow_id}`}</span>
                                    {typeof it.price === "number" ? (
                                      <span className="text-xs text-gray-500">${it.price.toFixed(2)}</span>
                                    ) : null}
                                  </div>
                                </div>
                                {it.quantity ? (
                                  <span className="text-xs text-gray-600">x{it.quantity}</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No item details available for this order.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
