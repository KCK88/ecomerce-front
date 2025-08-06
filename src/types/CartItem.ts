export interface CartItem {
  id: string;
  title: string;
  price: number;
  discount?: number;
  quantity: number;
  coverImage: string;
  stock: number;
}