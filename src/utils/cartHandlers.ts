import type {Book, Order} from "@/types/CartItem.ts";
import type {BookType} from "@/types/BookType.ts";
import type {UserType} from "@/types/UserType.ts";

const storedUser = localStorage.getItem("user");
const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;

export function updateCart(book: BookType | Book, action: 'add' | 'remove', quantity: number = 1): void {
  const cart: Order = JSON.parse(localStorage.getItem('cart') || '{"books": []}');
  const userId = user?.id || '';

  const bookId = (book as BookType).id || (book as Book).bookId;
  const existingItem = cart.books.find((item) => item.bookId === bookId);

  if (action === 'add') {
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newBook = book as BookType;

      if (!newBook.id) {
        console.error('Book object is missing id property');
        return;
      }

      const bookToAdd: Book = {
        _id: newBook.id,
        bookId: newBook.id,
        userId,
        title: newBook.title,
        price: newBook.price,
        discount: newBook.discount,
        quantity,
        coverImage: newBook.coverImage,
        stock: newBook.stock,
        status: 'pendente', // valor default
      };

      cart.books.push(bookToAdd);
    }
  }

  if (action === 'remove' && existingItem) {
    existingItem.quantity -= quantity;
    if (existingItem.quantity <= 0) {
      cart.books.splice(cart.books.indexOf(existingItem), 1);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart(): Order {
  const cart: Order = JSON.parse(localStorage.getItem('cart') || '{"books": []}');

  cart.books.forEach(book => {
    if (!book._id && book.bookId) {
      book._id = book.bookId;
    }
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
}


// export function clearCart(): void {
//   localStorage.removeItem('cart');
// }
