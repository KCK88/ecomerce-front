import {useQuery} from "@tanstack/react-query";
import {getOrdersByUser} from "@/services/apiOrders.ts";
import type {UserType} from "@/types/UserType.ts";
import {useMemo, useState} from "react";
import {dateFormater} from "@/utils/dateFormater.ts";
import ModalOrder from "@/components/ui/ModalOrder.tsx";
import type {Order} from "@/types/CartItem.ts";
import ErrorBooks from "@/components/ui/ErrorBooks.tsx";
import NoOrders from "@/components/ui/NoOrders.tsx";
import CustButton from "@/components/ui/CustButton.tsx";

export default function Orders() {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false);

  const storedUser = localStorage.getItem("user");
  const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id || '';

  const {data, isLoading, isError} = useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      return await getOrdersByUser(userId)
    }
  })
  const ordersData: Order[] = useMemo(() => data || [], [data])

  const orders = ordersData.map((order) => order)


  function getStatusColor(status: string) {
    switch (status) {
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  if (!isLoading && !isError && orders.length === 0) return <NoOrders/>

  if (isError) return <ErrorBooks/>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

      {orders.map(order => (
        <div className="m-8" key={order._id}>
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Pedido de {dateFormater(order.createdAt!)}</h2>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full border-b border-gray-300 table-fixed">
              <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
              </thead>

              <tbody>
              {order.books.map(book => (
                <tr key={book._id}>
                  <td className="px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">{book.title}</td>
                  <td className="px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">{book.quantity}</td>
                  <td className="px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">${book.price.toFixed(2)}</td>
                  <td className="px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(book.status!)}`}>
                      {book.status === 'pendente' ? 'Pendente' : book.status === 'concluido' ? 'concluido' : 'Cancelado'}
                    </span>
                    <ModalOrder isOpen={isOpen} onClose={closeModal}>
                      <h1>Tem certeza que deseja devover o seu pedido?</h1>
                      <button>Sim</button>
                      <button>Não</button>
                    </ModalOrder>
                  </td>
                  <td className="px-1 py-3 whitespace-nowrap">
                    {book.status === 'concluido' && (
                      <CustButton
                        onClick={() => setIsOpen(true)}
                        className=" bg-stone-700 text-sm hover:bg-red-800 text-white py-1 px-2 rounded-md transition duration-200"
                      >
                        Devolver
                      </CustButton>
                    )}
                    {book.status !== 'concluido' && (
                      <CustButton
                        onClick={() => setIsOpen(true)}
                        className=" bg-stone-700 text-sm hover:bg-stone-800 text-white py-1 px-4.5 rounded-md transition duration-200"
                      >
                        Ajuda
                      </CustButton>
                    )}
                  </td>

                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
