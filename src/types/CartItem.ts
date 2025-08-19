export interface CartItem {
  bookId: string;
  userId: string;
  title: string;
  price: number;
  discount?: number;
  quantity: number;
  coverImage: string;
  status?: string;
  stock: number;
  createdAt?: string;
}