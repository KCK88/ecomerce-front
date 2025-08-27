export interface Book {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  status: 'pendente' | 'concluido' | 'cancelado' | string;
  coverImage: string;
  discount: number;
  stock: number;
  bookId: string;
  userId: string;
}

export interface Order {
  _id: string;
  books: Book[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
