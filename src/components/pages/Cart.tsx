import { getCart, updateCart } from "@/utils/cartHandlers.ts";
import { BookMinus, BookPlus, BookX } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { orderPost } from "@/services/apiOrders.ts";
import ModalOrder from "@/components/ui/ModalOrder.tsx";
import type {Book} from "@/types/CartItem.ts";



export default function Cart() {
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState<Book[]>(getCart().books);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);

  const { mutate } = useMutation({
    mutationFn: orderPost,
    onSuccess: () => {
      localStorage.setItem('cart', JSON.stringify({ books: [] }));
      setBooks([]);
      setIsOpen(true);
    },
    onError: (error) => {
      console.error("Erro ao finalizar pedido", error);
    }
  });

  useEffect(() => {
    const totalPrice = books.reduce((acc, book) => acc + (book.price * book.quantity), 0);
    setTotal(totalPrice);
  }, [books]);

  function handleAddOrder(order: Book[]) {

    mutate(order);
  }

  function handleAddItem(book: Book) {
    updateCart(book, 'add');
    setBooks(getCart().books);
  }

  function handleRemoveItem(book: Book) {
    updateCart(book, 'remove');
    setBooks(getCart().books);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 my-5">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Carrinho de Compras</h2>

      {books.length === 0 ? (
        <div>
          <p className="text-stone-600">Seu carrinho está vazio</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Página inicial
          </button>
        </div>
      ) : (
        <div>
          <ul className="divide-y divide-stone-200">
            {books.map((book) => (
              <li key={book._id} className="py-4 flex justify-between items-center">
                <span className="text-stone-800 font-medium">{book.title}</span>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handleRemoveItem(book)}>
                    {book.quantity === 1 ? <BookX /> : <BookMinus />}
                  </button>
                  <span className="text-stone-600">{book.quantity}x</span>
                  <button onClick={() => handleAddItem(book)}>
                    <BookPlus />
                  </button>
                  <span className="text-stone-800 font-medium">
                    R$ {(book.quantity * book.price).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-stone-200 mt-4 pt-4">
            <strong className="flex justify-between text-lg text-stone-800">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </strong>
          </div>

          <button
            className="mt-6 w-full bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            onClick={() => handleAddOrder(books)}
          >
            Finalizar Compra
          </button>

          <ModalOrder isOpen={isOpen} onClose={closeModal}>
            <h1>Compra realizada com sucesso</h1>
          </ModalOrder>
        </div>
      )}
    </div>
  );
}
