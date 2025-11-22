const API_URL = "http://localhost:5000/api/items";

export async function getItems() {
  const res = await fetch(API_URL);
  return await res.json();
}
