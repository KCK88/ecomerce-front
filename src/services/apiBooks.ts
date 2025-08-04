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

export async function getSearchBook(page: number, limit: number, params: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/books/${page}/${limit}/search?key=${params}`);
  const data = await response.json()
  return data
}

export async function getCategoryBook(page: number, limit: number, params: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/books/${page}/${limit}/category?key=${params}`);
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
