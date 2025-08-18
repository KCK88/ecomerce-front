import type {PostType} from "@/types/PostType.ts";

export async function orderPost (postData: PostType): Promise<Response> {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
}