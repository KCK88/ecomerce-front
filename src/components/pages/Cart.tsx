import {getCart, updateCart} from "@/utils/cartHandlers.ts";
import {BookMinus, BookPlus, BookX} from 'lucide-react';
import {useEffect, useState} from "react";
import type {CartItem} from "@/types/CartItem.ts";
import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {orderPost} from "@/services/apiOrders.ts";


export default function Cart() {
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState(getCart())
  const navigate = useNavigate();

const {mutate} = useMutation({
  mutationFn: orderPost,
  onSuccess: (data) => {
    console.log(data)
  },
  onError: (error) => {
    console.log(error)
  }
})

  useEffect(() => {
    setTotal(books.reduce((acc, item) => acc + (item.price * item.quantity), 0))
  }, [books]);

  function handleAddOrder(order: CartItem[]) {
    console.log('handleAddOrder', order);
    mutate(order);
    localStorage.setItem('cart', '[]');
    setBooks([]);
  }

  function handleAddItem(item: CartItem) {
    updateCart(item, 'add');
    setBooks(getCart());
  }

  function handleRemoveItem(item: CartItem) {
    updateCart(item,'remove');
    setBooks(getCart());
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Carrinho de Compras</h2>

      {books.length === 0 ? (
        <div>
          <p className="text-stone-600">Seu carrinho está vazio</p>
          <button
            onClick={()=>navigate('/')}
            className="mt-6 w-full bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Pagina inicial
          </button>
        </div>
      ) : (
        <div>
          <ul className="divide-y divide-stone-200">
            {books.map((item) => (
              <li key={item.bookId} className="py-4 flex justify-between items-center">
                <span className="text-stone-800 font-medium">{item.title}</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleRemoveItem(item)
                    }
                  >
                    {item.quantity === 1 ? <BookX/> : <BookMinus/>}
                  </button>
                  <span className="text-stone-600">{item.quantity}x</span>
                  <button
                    onClick={() => handleAddItem(item)}
                  >
                    <BookPlus/>
                  </button>
                  <span className="text-stone-800 font-medium">R$ {(item.quantity * item.price).toFixed(2)}</span>
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
        </div>
      )}
    </div>
  );
};
