import { API_BASE } from '../config/api';

export async function fetchDishes() {
  const url = `${API_BASE}/api/dishes`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const data = await res.json();
  // Ensure imagelink_square is a string URL (API already sends string)
  return Array.isArray(data) ? data : [];
}
