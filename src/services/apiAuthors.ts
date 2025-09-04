import type {AuthorType} from "@/types/AutorType.ts";

export async function getAuthors(): Promise<any> {
  const response = await fetch('http://localhost:3000/authors');
  const data = await response.json();
  return data;
}

export async function createAuthor(author: AuthorType) {
  const response = await fetch('http://localhost:3000/authors',{
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create author');
  }
  return response.json();
}