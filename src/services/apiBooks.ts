import type {BookType, BookTypeReq} from "@/types/BookType.ts";

export async function getBooks(): Promise<BookType[]> {
  const response = await fetch('http://localhost:3000/books');
  const data = await response.json();
  return data;
}

export async function getImageBook(bookId: string): Promise<string> {
  const response = await fetch(`http://localhost:3000/books/${bookId}/cover`);
  const data = await response.json()
  return data.image
}

export async function getSearchBook(page: number, limit: number, params: string | null, category: string | null): Promise<BookType[]> {
  const response = await fetch(`http://localhost:3000/books/${page}/${limit}/search?params=${params}&genre=${category}`);
  const data = await response.json()
  return data
}


export async function getBook(id: string): Promise<BookType> {
  const response = await fetch(`http://localhost:3000/books/${id}`);
  const data = await response.json()
  return data
}

export async function getPagedBook(page: number, limit: number): Promise<BookType[]> {
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

async function createBookFormData(book: BookTypeReq): Promise<FormData> {
  const formData = new FormData();

  const excludeFields = ['coverImage', 'images', 'id', '_id', '__v', 'createdAt', 'search'];

  for (const [key, value] of Object.entries(book)) {
    if (excludeFields.includes(key) || value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string' && value) {
      formData.append(key, value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      formData.append(key, value.toString());
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    }
  }

  if (book.coverImage) {
    if (book.coverImage instanceof File) {
      formData.append('coverImage', book.coverImage);
    } else if (book.coverImage instanceof FileList && book.coverImage.length > 0) {
      formData.append('coverImage', book.coverImage[0]);
    } else if (typeof book.coverImage === 'string' && book.coverImage.startsWith('data:')) {
      const response = await fetch(book.coverImage);
      const blob = await response.blob();
      formData.append('coverImage', blob, 'cover.jpg');
    } else {
      formData.append('coverImage', book.coverImage);
    }
  }

  if (book.images && book.images.length > 0) {
    for (let i = 0; i < book.images.length; i++) {
      const image = book.images[i];
      if (image instanceof File) {
        formData.append('images', image);
      } else if (image.startsWith('data:')) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image-${i}.jpg`);
      } else {
        formData.append('images', image);
      }
    }
  }

  return formData;
}

export async function createBook(book: BookTypeReq) {

  const formData = await createBookFormData(book);

  const response = await fetch('http://localhost:3000/books', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  } as RequestInit);

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  const data = await response.json();

  if (response.ok) {
    console.log('Livro criado com sucesso!');
  } else {
    console.error(data.message || 'Erro ao criar livro');
  }
  return data;
}

export async function updateBook(book: BookTypeReq): Promise<BookType> {

  const formData = await createBookFormData(book);

  const response = await fetch(`http://localhost:3000/books/${book._id}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  } as RequestInit);

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  const data = await response.json();

  if (response.ok) {
    console.log('Livro editado com sucesso!');
  } else {
    console.error(data.message || 'Erro ao editar livro');
  }
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await fetch(`http://localhost:3000/books/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
}
