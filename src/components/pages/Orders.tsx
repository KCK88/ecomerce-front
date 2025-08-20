import {useQuery} from "@tanstack/react-query";
import {getOrdersByUser} from "@/services/apiOrders.ts";
import type {UserType} from "@/types/UserType.ts";
import type {CartItem} from "@/types/CartItem.ts";
import {useMemo, useState} from "react";
import {dateFormater} from "@/utils/dateFormater.ts";
import ModalOrder from "@/components/ui/ModalOrder.tsx";

export default function Orders() {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false);

  const storedUser = sessionStorage.getItem("user");
  const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id || '';

  const {data} = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      return await getOrdersByUser(userId)
    }
  })

  const orders: CartItem[] = useMemo(() => data?.order || [], [data?.order])


  function getStatusColor(status: string) {
    switch (status) {
      case 'concluído':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {orders.map(function(order) {
            return (
              <tr key={order.bookId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status!)}`}>
                      {order.status === 'pendente' ? 'Pendente' : order.status === 'concluido' ? 'cancelado' : 'Cancelado'}
                    </span>
                  {order.status === 'concluido'? <button onClick={()=>setIsOpen(true)}>Devolver</button>  : ''}
                  <ModalOrder isOpen={isOpen} onClose={closeModal}>
                    <h1>Tem certeza que deseja devover o seu pedido?</h1>
                    <button>Sim</button>
                    <button>Não</button>
                  </ModalOrder>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateFormater(order.createdAt!)}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
