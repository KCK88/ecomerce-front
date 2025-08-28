import Logo from "@/components/ui/Logo.tsx";
import {useQuery} from "@tanstack/react-query";
import {MapPin, Search, ShoppingCartIcon} from "lucide-react";
import {getCategories} from "@/services/apiCategories.ts";
import type {CategoryType} from "@/types/CategoryType.ts";
import {useEffect, useMemo, useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import Modal from "@/components/ui/Modal.tsx";
import ModalUser from "@/components/ui/ModalUser.tsx";
import type {SearchInputs} from "@/types/SearchInputs.ts";
import type {Order} from "@/types/CartItem.ts";
import {useAuth} from "@/context/AuthContext.tsx";

export default function HeaderMenu() {
  const [cartAmount, setCartAmount] = useState(0)
  
  const {data} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  const categories: CategoryType[] = useMemo(() => data?.data || [], [data?.data])

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<SearchInputs>({
    defaultValues: {
      category: ""
    }
  })


  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    navigate(`/search?page=0&limit=10&category=${data.category}&search=${data.search}`);
  }

  const storedCart = localStorage.getItem("cart");
  const cart: Order | null = storedCart ? JSON.parse(storedCart) : null;


  const {user} = useAuth();
  const username = user?.name?.split(" ")[0] ?? "";
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const cartQuantity = cart?.books?.length ?? 0;

  useEffect(() => {
    setCartAmount(cartQuantity)
  }, [cartQuantity]);

  return (
    <header className="bg-white shadow-sm py-1 px-2">
      <ul className="flex flex-wrap items-center justify-between gap-4">

        <li className="flex-shrink-0">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo/>
          </div>
        </li>

        <li className="hidden md:flex flex-col items-start text-xs border-r border-gray-200 pr-4 mr-2">
          <span className="text-gray-500">Enviar para</span>
          <div className="flex items-center font-semibold">
            <MapPin className="w-4 h-4 mr-1 text-gray-700"/>
            <span>02161110</span>
          </div>
        </li>

        <li className="flex-grow w-full md:w-auto order-last md:order-none min-w-[200px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center rounded-full overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-stone-500 focus-within:border-stone-500 transition-all"
          >
            <select
              className="text-sm text-gray-700 px-3 py-2.5 bg-gray-50 border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-100 transition-colors hidden md:block"
              {...register("category")}
            >
              <option value="">Todas categorias</option>
              {categories.map((category: CategoryType) => (
                <option key={category.id} value={category.genre}>{category.genre}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Procure livros, autores ou categorias..."
              className="flex-grow px-4 py-2.5 text-sm outline-none w-full"
              {...register("search")}
            />

            <button
              type="submit"
              className="bg-stone-600 hover:bg-stone-700 transition-colors px-5 py-2.5 flex items-center justify-center"
            >
              <Search className="text-white w-5 h-5"/>
            </button>
          </form>
        </li>

        <li className="flex flex-col items-center cursor-pointer text-sm hover:text-stone-600 transition-colors px-2"
        >
          <div className="flex items-center">
            <Modal text={user ? `Olá ${username.split(' ')[0]} \nConta e Wishlist` : `Ola, faça login \nWishlist`}>
              <div className="w-[200px]">
                <ModalUser isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
              </div>
            </Modal>
          </div>
        </li>

        <li
          onClick={() => navigate('/order')}
          className="hidden md:flex flex-col cursor-pointer text-sm hover:text-stone-600 transition-colors px-2"
        >
          <span>Devoluções</span>
          <span className="font-semibold">& Pedidos</span>
        </li>

        <li
          onClick={() => navigate('/cart')}
          className="flex items-center cursor-pointer text-sm hover:text-stone-600 transition-colors relative px-2"
        >
          <span className="hidden md:block ml-1 font-semibold"><ShoppingCartIcon className="w-7 h-7"/></span>
          <span
            className="absolute -top-1 -right-1 bg-stone-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            {cartAmount}
          </span>
        </li>
      </ul>
    </header>
  )
}