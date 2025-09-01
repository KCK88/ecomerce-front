import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import type {BookType} from "@/types/BookType.ts";
import Select from "react-select";
import type {AuthorType} from "@/types/AutorType.ts";
import type {CategoryType} from "@/types/CategoryType.ts";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {updateBook} from "@/services/apiBooks.ts";
import {getCategories} from "@/services/apiCategories.ts";
import {getAuthors} from "@/services/apiAuthors.ts";
import {useMemo} from "react";
import type {OptionType} from "@/types/SelectTypes.ts";

type EditBookProps = {
  book: BookType
}

export default function EditBook({book}: EditBookProps) {
  const {register, control, handleSubmit, formState: { errors }} = useForm<BookType>();

  const queryClient = new QueryClient({})


  const {mutate} = useMutation({
    mutationFn: updateBook,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({queryKey: ['booksBko']});
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const {data: category, isLoading: loadingCategories} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const {data: author, isLoading: loadingAuthors, isError: authorError} = useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors
  })

  const categories: CategoryType[] = useMemo(() => category?.data || [], [category?.data])
  const authors: AuthorType[] = useMemo(() => author?.authors || [], [author?.authors])
  const authorOptions = authors.map((author) => ({
    label: author.name,
    value: author,
  }));

  const categoryOptions = categories.map((category) => ({
    label: category.genre,
    value: category,
  }));


  const onSubmit: SubmitHandler<BookType> = (data) => {
    console.log(data);
    mutate(data)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titulo</label>
          <input
            {...register("title")}
            id="title"
            name="title"
            type="text"
            defaultValue={book.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titulo</label>
          <input
            {...register("_id")}
            id="_id"
            name="_id"
            hidden
            type="text"
            defaultValue={book._id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700">Autor(es)</label>
          <Controller
            name="authors"
            control={control}
            render={({field}) => (
              <Select<OptionType<AuthorType>>
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
                {...field}
                options={authorOptions}
                isLoading={loadingAuthors}
                isClearable
                isMulti
                placeholder={loadingAuthors ? 'Carregando...' : 'Selecione uma categoria'}
                noOptionsMessage={() => (authorError ? 'Erro ao carregar' : 'Nenhuma opção')}
              />
            )}
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categoria</label>
          <Controller
            name="categories"
            control={control}
            render={({field}) => (
              <Select<OptionType<CategoryType>>
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
                {...field}
                options={categoryOptions}
                isLoading={loadingCategories}
                isClearable
                isMulti
                placeholder={loadingAuthors ? 'Carregando...' : 'Selecione uma categoria'}
                noOptionsMessage={() => (authorError ? 'Erro ao carregar' : 'Nenhuma opção')}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Editora</label>
          <input
            {...register("publisher")}
            id="publisher"
            name="publisher"
            type="text"
            defaultValue={book.publisher}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Data de publicação</label>
          <input
            {...register("publishedDate")}
            id="publishedDate"
            name="publishedDate"
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma</label>
          <input
            {...register("language")}
            id="language"
            name="language"
            type="text"
            defaultValue={book.language}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            rows={5}
            defaultValue={book.description}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
          <input
            {...register("price")}
            id="price"
            name="price"
            type="number"
            defaultValue={book.price}
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque</label>
          <input
            {...register("stock")}
            id="stock"
            name="stock"
            type="number"
            defaultValue={book.stock}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Desconto (%)</label>
          <input
            {...register("discount")}
            id="discount"
            name="discount"
            type="number"
            defaultValue={book.discount*100}
            min="0"
            max="100"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
            <input
                {...register("featured")}
                id="featured"
                name="featured"
                type="checkbox"
                value="true"
                className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Em promoção?
            </label>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Imagem de capa</label>
          <input
            {...register("coverImage")}
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700 hover:file:bg-stone-100"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Imagens</label>
          <input
            {...register("images", {
              validate: (files) => {
                if (files.length > 3) {
                  return "You can only upload up to 3 images.";
                }
                return true;
              }
            })}
            id="images"
            name="images"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            multiple
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-50 file:text-stone-700 hover:file:bg-stone-100"
          />
          {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
