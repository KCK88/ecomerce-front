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
import AddAuthor from "@/components/ui/AddAuthor.tsx";
import AddCategory from "@/components/ui/AddCategory.tsx";
import DeleteBook from "@/components/ui/DeleteBook.tsx";


export function BackOffice() {
  const [searchParams] = useSearchParams();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null as 'addBook' | 'addAuthor' | 'addCategory' | 'editBook' | 'deleteBook' | null,
    data: null as BookType | null
  });

  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));

  const {data} = useQuery({
    queryKey: ['booksBko', page, limit],
    queryFn: async () => {
      return await getPagedBook(page, limit);
    },
  });

  const storedUser = localStorage.getItem("user");
  const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";
  const books: BookType[] = useMemo(() => data?.data || [], [data?.data]);

  const openModal = (
    type: 'addBook' | 'addAuthor' | 'addCategory' | 'editBook' | 'deleteBook', data?: BookType) => {
    setModalState({isOpen: true, type, data: data || null});
  };

  const closeModal = () => {
    setModalState({isOpen: false, type: null, data: null});
  };

  if (!isAdmin || !user) return <NotFound/>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BackOffice - Gerenciamento de Livros</h1>

      <div className="flex justify-end mb-4 gap-4">
        <button
          onClick={() => openModal('addBook')}
          className="bg-stone-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar livros
        </button>

        <button
          onClick={() => openModal('addAuthor')}
          className="bg-stone-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar autor
        </button>

        <button
          onClick={() => openModal('addCategory')}
          className="bg-stone-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar categoria
        </button>
      </div>

      {modalState.isOpen && (
        <ModalOrder
          isOpen={modalState.isOpen}
          onClose={closeModal}
          className={'w-full max-w-280 shadow-sm'}
        >
          {modalState.type === 'addBook' && <AddBook/>}
          {modalState.type === 'addAuthor' && <AddAuthor/>}
          {modalState.type === 'addCategory' && <AddCategory/>}
          {modalState.type === 'editBook' && modalState.data && (
            <EditBook book={modalState.data}/>
          )}
          {modalState.type === 'deleteBook' && modalState.data && (

            <DeleteBook id={modalState.data.id} onClose={closeModal}/>
          )}
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
          {books.map((book: BookType) => (
            <tr key={book._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{book.title}</td>
              <td className="py-3 px-6 text-left">{book.authors.length > 0 ? book.authors[0].name : 'N/A'}</td>
              <td className="py-3 px-6 text-center">R$ {book.price.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    onClick={() => openModal('editBook', book)}
                    className="w-16 h-8 rounded-full bg-stone-500 hover:bg-blue-700 text-white mr-2"
                  >
                    Editar
                  </button>
                  <button onClick={()=> openModal("deleteBook", book)} className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-700 text-white">X</button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}