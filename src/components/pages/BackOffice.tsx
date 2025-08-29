import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getPagedBook} from "@/services/apiBooks.ts";
import type {BookType} from "@/types/BookType.ts";
import {useMemo, useState} from "react";
import AddBook from "@/components/ui/AddBook.tsx";
import EditBook from "@/components/ui/BookEdit.tsx";
import type {UserType} from "@/types/UserType.ts";
import NotFound from "@/components/pages/NotFound.tsx";
import ModalOrder from "@/components/ui/ModalOrder.tsx";


export function BackOffice() {
  const [searchParams] = useSearchParams();
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  const closeModal = () => setIsOpenAdd(false);
  const closeEditModal = () => {
    setIsOpenEdit(false);
    setSelectedBook(null);
  }

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const {data} = useQuery({
    queryKey: ['booksBko', page, limit],
    queryFn: async () => {
      return await getPagedBook(page, limit)
    }
  })

  const storedUser = localStorage.getItem("user");
  const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";


  const books: BookType[] = useMemo(() => data?.data || [], [data?.data]);

  if (!isAdmin || !user) return <NotFound/>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BackOffice - Gerenciamento de Livros</h1>

      <div className="flex justify-end mb-4">
        <button onClick={() => setIsOpenAdd(!isOpenAdd)}
                className="bg-stone-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Adicionar livros
        </button>
      </div>

      {isOpenAdd && <ModalOrder
          isOpen={isOpenAdd}
          onClose={closeModal}
          className={'w-full max-w-280 shadow-sm'}
      >
          <AddBook action={"Adicionar"}/>
      </ModalOrder>}

      {isOpenEdit && selectedBook && (
          <ModalOrder
              isOpen={isOpenEdit}
              onClose={closeEditModal}
              className={'w-full max-w-280 shadow-sm'}
          >
              <EditBook book={selectedBook}/>
          </ModalOrder>
      )}

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>

          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Título</th>
            <th className="py-3 px-6 text-left">Autor</th>
            <th className="py-3 px-6 text-center">Preço</th>
            <th className="py-3 px-6 text-center">Ações</th>
          </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">

          {
            books.map((book: BookType) => (
              <tr key={book._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{book.title}</td>
                <td className="py-3 px-6 text-left">{book.authors[0].name}</td>
                <td className="py-3 px-6 text-center">R$ {book.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button onClick={() => {
                      setSelectedBook(book);
                      setIsOpenEdit(true);
                    }}
                            className="w-16 h-8 rounded-full bg-green-500 text-white mr-2">Editar
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-500 text-white">X</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*{isOpenEdit && <EditBook/>}*/}
      </div>


      <div className="hidden">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Adicionar/Editar Livro</h2>
            <form>

              <div className="flex justify-end mt-4">
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancelar
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}