import type {CartItem} from "@/types/CartItem.ts";
import type {BookType} from "@/types/BookType.ts";

export function addToCart(book: BookType, quantity: number = 1): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      discount: book.discount,
      quantity,
      coverImage: book.coverImage,
      stock: book.stock,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeItem(book: CartItem, quantity: number = 1): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    existingItem.quantity -= quantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addItem(book: CartItem, quantity: number = 1): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(bookId: string): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.filter((item) => item.id !== bookId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}


export function clearCart(): void {
  localStorage.removeItem('cart');
}