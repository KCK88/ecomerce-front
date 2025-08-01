interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export interface BookType {
  id: string;
  _id: string;
  __v: number;
  title: string;
  description: string;
  authors: Author[];
  categories: Category[];
  coverImage: string;
  images: string[];
  averageRating: number;
  reviewsCount: number;
  price: number;
  discount: number;
  stock: number;
  pageCount: number;
  language: string;
  publisher: string;
  publishedDate: string;
  createdAt: string;
  featured: boolean;
}