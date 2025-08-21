import type {CartItem} from "@/types/CartItem.ts";
import type {BookType} from "@/types/BookType.ts";
import type {UserType} from "@/types/UserType.ts";

const storedUser = localStorage.getItem("user");
const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;

export function updateCart(book: BookType | CartItem, action: 'add' | 'remove', quantity: number = 1): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const userId = user?.id || '';

  const bookId = (book as BookType).id || (book as CartItem).bookId;
  const existingItem = cart.find((item) => item.bookId === bookId);

  if (action === 'add') {
    if (existingItem) {
      existingItem.quantity += quantity;
    }  else {
      const newBook = book as BookType;
      if (!newBook.id) {
        console.error('Book object is missing id property');
        return;
      }

      cart.push({
        userId,
        bookId: newBook.id,
        title: newBook.title,
        price: newBook.price,
        discount: newBook.discount,
        quantity,
        coverImage: newBook.coverImage,
        stock: newBook.stock,
      });
    }
  }

  if (action === 'remove' && existingItem) {
    existingItem.quantity -= quantity;
    if (existingItem.quantity <= 0) {
      cart.splice(cart.indexOf(existingItem), 1);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}


// export function clearCart(): void {
//   localStorage.removeItem('cart');
// }
