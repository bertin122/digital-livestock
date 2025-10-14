// src/services/cows.ts
// Service functions for creating cows with image uploads and basic fallbacks

import { BASE_URL } from "../constants/urls";
import { getUserId } from "./auth";

export type NewCowPayload = {
  name: string;
  description: string;
  price: number;
  category: number; // category id
  breed: string;
  age: number; // years or months depending on backend
  weight: number; // kg
  health_status: string;
  purchase_status: string; // available | offered | purchased
  discount?: number;
};

export async function createCow(payload: NewCowPayload, images: File[]): Promise<any> {
  const ownerId = getUserId();
  if (!ownerId) throw new Error("Please login first");

  const createPathFromEnv = (import.meta as any)?.env?.VITE_COW_CREATE_PATH as string | undefined;

  const form = new FormData();
  form.append("name", payload.name);
  form.append("description", payload.description);
  form.append("price", String(payload.price));
  form.append("category", String(payload.category));
  // Also include category_id for backends that expect that name
  form.append("category_id", String(payload.category));
  form.append("breed", payload.breed);
  form.append("age", String(payload.age));
  form.append("weight", String(payload.weight));
  form.append("health_status", payload.health_status);
  form.append("purchase_status", payload.purchase_status);
  if (payload.discount != null) form.append("discount", String(payload.discount));
  // Common names backends expect
  form.append("owner_id", String(ownerId));
  form.append("user_id", String(ownerId));

  images.forEach((file, idx) => {
    // Try common keys: photos[] and images[]
    form.append("photos[]", file, file.name);
    form.append("images[]", file, file.name);
    // Some backends accept a single key 'files'
    form.append("files", file, file.name);
  });

  const endpoints = [
    // Allow overriding the path via env for exact backend alignment
    ...(createPathFromEnv ? [createPathFromEnv] : []),
    "/api/cows/create",
    "/api/cow/create",
    "/api/cows/add",
    "/api/cow/add",
    "/api/cows/insert",
    "/api/cow/insert",
    // RESTful common pattern: POST /api/cows
    "/api/cows",
  ];

  const errors: string[] = [];
  for (const path of endpoints) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        body: form,
      });
      const text = await res.text();
      if (!res.ok) {
        errors.push(`${path}: ${res.status} ${text.slice(0, 300)}`);
        continue;
      }
      try {
        return JSON.parse(text);
      } catch (_) {
        // If backend returns created object as plain text/ID
        return text;
      }
    } catch (e: any) {
      errors.push(`${path}: ${e?.message || e}`);
    }
  }

  throw new Error(`Create cow failed. Tried: ${endpoints.join(", ")}. Errors: ${errors.join(" | ")}`);
}
