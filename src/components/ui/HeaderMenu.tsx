import Logo from "@/components/ui/Logo.tsx";
import {useQuery} from "@tanstack/react-query";
import {MapPin, Search, ShoppingCartIcon} from "lucide-react";
import {getCategories} from "@/services/apiCategories.ts";
import type {CategoryType} from "@/types/CategoryType.ts";
import {useMemo} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import Modal from "@/components/ui/Modal.tsx";
import ModalUser from "@/components/ui/ModalUser.tsx";
import type {SearchInputs} from "@/types/SearchInputs.ts";

export default function HeaderMenu() {
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


  return (
    <div>
      <ul className="p-2 flex fllex-col gap-1">
        <li><Logo/></li>
        <li className="flex flex-col items-center">
          <span className="text-[10px]">Enviar para</span>
          <div className="flex"><MapPin/><span className="font-bold">02161110</span></div>
        </li>
        <li className="flex-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center rounded-2xl overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-stone-500"
          >
            <select
              className="text-sm text-gray-700 px-3 py-2 bg-gray-100 border-r border-gray-300 outline-none"
              {...register("category")}
            >
              <option value="" /*disabled hidden*/>Categoria</option>
              {categories.map((category: CategoryType) => (
                <option key={category.id} value={category.genre}>{category.genre}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Procure livros"
              className="flex-grow px-4 py-2 text-sm outline-none"
              {...register("search")}
            />

            <button
              type="submit"
              className="bg-stone-400 rounded-r-2xl hover:bg-stone-500 transition-colors px-4 py-2"
            >
              <Search className="text-black"/>
            </button>
          </form>
        </li>
        <li className="items-center flex flex-col" onClick={() => navigate('/login')}>
          <Modal text={`Ola, faça login \nWishlist`}>
            <div className="w-[200px]">
              <ModalUser/>
            </div>
          </Modal>
        </li>
        <li onClick={() => navigate('/order')} className="cursor-pointer items-center flex flex-col">
          <span>Compras</span>
          <span>Devoluções</span>
        </li>
        <li onClick={() => navigate('/cart')} className="flex flex-col items-center cursor-pointer">
          <span>Carrinho </span><ShoppingCartIcon/></li>
      </ul>
    </div>
  )
}