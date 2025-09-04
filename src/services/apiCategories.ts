import type {CategoryType} from "@/types/CategoryType.ts";

export async function getCategories() {
  const response = await fetch('http://localhost:3000/categories');

  return await response.json();
}

export async function createCategory(category: CategoryType) {
  const response = await fetch('http://localhost:3000/categories',{
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create category');
  }
  return response.json();
}