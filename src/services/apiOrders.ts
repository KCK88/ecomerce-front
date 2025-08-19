import type {CartItem} from "@/types/CartItem.ts";

export async function orderPost (postData: CartItem[]): Promise<Response> {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}

export async function getOrdersByUser(userId: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/orders/${userId}`);
  const data = await response.json();
  return data;
}