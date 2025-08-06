import {addItem, getCart, removeFromCart, removeItem} from "@/utils/cartHandlers.ts";
import {BookMinus, BookPlus, BookX} from 'lucide-react';


export default function Cart() {
  const books = getCart()

  const total = books.reduce(
    (acc, item) => acc + (item.price * item.quantity), 0
  );


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Carrinho de Compras</h2>

      {books.length === 0 ? (
        <p className="text-stone-600">Seu carrinho está vazio</p>
      ) : (
        <div>
          <ul className="divide-y divide-stone-200">
            {books.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <span className="text-stone-800 font-medium">{item.title}</span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      item.quantity === 1 ? removeFromCart(item.id) : removeItem(item)
                    }
                  >
                    {item.quantity === 1 ? <BookX/> : <BookMinus/>}
                  </button>
                  <span className="text-stone-600">{item.quantity}x</span>
                  <button
                    onClick={() => addItem(item)}
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
            className="mt-6 w-full bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};
