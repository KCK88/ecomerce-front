import type {BookType} from "@/types/BookType.ts";

export async function getBooks(): Promise<any> {
  const response = await fetch('http://localhost:3000/books');
  const data = await response.json();
  return data;
}

export async function getImageBook(bookId: string): Promise<string> {
  const response = await fetch(`http://localhost:3000/books/${bookId}/cover`);
  const data = await response.json()
  return data.image
}

export async function getSearchBook(page: number, limit: number, params: string | null, category: string | null): Promise<any> {
  const response = await fetch(`http://localhost:3000/books/${page}/${limit}/search?params=${params}&genre=${category}`);
  const data = await response.json()
  return data
}


export async function getBook(id: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/books/${id}`);
  const data = await response.json()
  return data
}
export async function getPagedBook(page: number, limit: number): Promise<any> {
  const response = await fetch(`http://localhost:3000/books/${page}/${limit}/booksBko`);
  const data = await response.json()
  return data
}

export async function convertImg(base: string) {
  const dataUrl = await getImageBook(base);

  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid data URL format: MIME type not found.");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], {type: mime});
  return URL.createObjectURL(blob)
}

export async function createBook(book: BookType) {
  const response = await fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  const data = await response.json();

  if (response.ok) {
    console.log('Livro criado com sucesso!');
  } else {
    console.error(data.message || 'Erro ao criar livro');
  }
  return data;
}