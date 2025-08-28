export async function getAuthors(): Promise<any> {
  const response = await fetch('http://localhost:3000/authors');
  const data = await response.json();
  return data;
}