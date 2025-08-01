const itens = [
  {
    id: 1,
    title: 'Dom Casmurro',
    quantity: 1,
    price: 26.90,
    status: 'completed',
    date: '2023-05-15'
  },
  {
    id: 2,
    title: 'O Hobbit',
    quantity: 2,
    price: 76.6,
    status: 'pending',
    date: '2023-06-20'
  },
  {
    id: 3,
    title: 'Maus',
    quantity: 1,
    price: 53,
    status: 'pending',
    date: '2023-06-22'
  },
  {
    id: 4,
    title: 'Rápido e devagar: Duas formas de pensar',
    quantity: 1,
    price: 61.49,
    status: 'cancelled',
    date: '2023-05-30'
  }
];

const total = itens.reduce(
  (acc, item) => acc + (item.price * item.quantity), 0
);

export default function Cart() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Carrinho de Compras</h2>

      {itens.length === 0 ? (
        <p className="text-stone-600">Seu carrinho está vazio</p>
      ) : (
        <div>
          <ul className="divide-y divide-stone-200">
            {itens.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <span className="text-stone-800 font-medium">{item.title}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-stone-600">{item.quantity}x</span>
                  <span className="text-stone-800 font-medium">R$ {item.price.toFixed(2)}</span>
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

          <button className="mt-6 w-full bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};
