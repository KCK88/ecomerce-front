import {type SubmitHandler, useForm} from "react-hook-form";
import type {AuthorType} from "@/types/AutorType.ts";
import {useMutation} from "@tanstack/react-query";
import {createAuthor} from "@/services/apiAuthors.ts";

export default function AddAuthor() {
  const {register, handleSubmit} = useForm<AuthorType>();

  const {mutate} = useMutation({
    mutationFn: createAuthor,
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.log("Error", error);
    }
  })

  const onSubmit: SubmitHandler<AuthorType> = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adicionar autor</h1>
      <form onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register("bio")}
            id="bio"
            name="bio"
            rows={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nacionalidade</label>
          <input
            {...register("nationality")}
            id="nationality"
            name="nationality"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
          <input
            {...register("website")}
            id="website"
            name="website"
            type="text"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto</label>
          <input
            {...register("photo")}
            id="photo"
            name="photo"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700 hover:file:bg-stone-100"
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