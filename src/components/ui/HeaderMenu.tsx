import Logo from "@/components/ui/Logo.tsx";
import {useQuery} from "@tanstack/react-query";
import {Search, ShoppingCartIcon} from "lucide-react";
import {getCategories} from "@/services/apiCategories.ts";
import type {CategoryType} from "@/types/CategoryType.ts";
import {useMemo} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";

type Inputs = {
  category: string
  search: string
}

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
  } = useForm<Inputs>({
    defaultValues: {
      category: ""
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
      navigate(`/home?page=1&limit=1&category=${data.category}&search=${data.search}`);
  }


  return (
    <div>
      <ul className="p-2 flex fllex-col gap-1">
        <li><Logo/></li>
        <li><span>Location</span></li>
        <li className="flex-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center rounded-2xl overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-stone-500"
          >
            <select
              className="text-sm text-gray-700 px-3 py-2 bg-gray-100 border-r border-gray-300 outline-none"
              {...register("category")}
            >
              <option value="" disabled hidden>Categoria</option>
              {categories.map((category: CategoryType) => (
                <option key={category.id} value={category.id}>{category.name}</option>
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
        <li onClick={() => navigate('/login')} className="cursor-pointer items-center flex flex-col">
          <span>Ola, faça login</span>
          <span>Wishlist</span>
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