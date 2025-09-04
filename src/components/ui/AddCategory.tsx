import {type SubmitHandler, useForm} from "react-hook-form";
import type {CategoryType} from "@/types/CategoryType.ts";
import {useMutation} from "@tanstack/react-query";
import {createCategory} from "@/services/apiCategories.ts";

export default function AddCategory() {
  const {register, handleSubmit} = useForm<CategoryType>();

  const {mutate} = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.log("Error", error);
    }
  })

  const onSubmit: SubmitHandler<CategoryType> = (data) => {
    mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adicionar categoria</h1>
      <form onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">Faixa etária</label>
          <input
            {...register("ageGroup")}
            id="ageGroup"
            name="ageGroup"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Genero</label>
          <input
            {...register("genre")}
            id="genre"
            name="genre"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
          >
            Salvar autor
          </button>
        </div>
      </form>
    </div>
  );

}