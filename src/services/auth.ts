// src/services/auth.ts
// Minimal auth utilities to store and retrieve the authenticated user's id

const USER_ID_KEY = 'userId';

export function setUserId(id: number | string): void {
  try {
    // Normalize to string for localStorage
    localStorage.setItem(USER_ID_KEY, String(id));
  } catch (_) {
    // ignore
  }
}

export function getUserId(): number | null {
  try {
    const fromStore = localStorage.getItem(USER_ID_KEY);
    if (!fromStore) return null;
    const asNum = Number(fromStore);
    return Number.isFinite(asNum) ? asNum : null;
  } catch (_) {
    return null;
  }
}

export function clearUserId(): void {
  try {
    localStorage.removeItem(USER_ID_KEY);
  } catch (_) {
    // ignore
  }
}
