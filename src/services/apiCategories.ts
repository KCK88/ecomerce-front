export async function getCategories() {
  const response = await fetch('http://localhost:3000/categories');

  return await response.json();
}