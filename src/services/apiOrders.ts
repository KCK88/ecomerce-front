import type {Book} from "@/types/CartItem.ts";
import type {UserType} from "@/types/UserType.ts";

export async function orderPost(postData: Book[]): Promise<Response> {
  const storedUser = localStorage.getItem("user");
  const user: UserType | null = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id || '';
  const toPost = {
    books: postData,
    userId
  }
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(toPost),
    credentials: 'include',
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create order');
  }
  return response.json();
}

export async function getOrdersByUser(userId: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/orders/${userId}`);
  return await response.json();
}