import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBook} from "@/services/apiBooks.ts";
import ButtonSpinner from "@/components/ui/ButtonSpinner.tsx";

type DeleteBookProps = {
  id: string;
  onClose: () => void;

}

export default function DeleteBook({id, onClose}: DeleteBookProps) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: deleteBook,
    onSuccess: async () => {
      console.log('DeleteBook', id);
      await queryClient.invalidateQueries({queryKey: ['booksBko']});
      onClose()
    },
    onError: () => {
      console.log('Error', id);
    }
  })
  return (
    <div className="flex flex-col items-center space-y-6">
      <span className="text-3xl">Tem certeza que deseja excluir este livro?</span>
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
        onClick={() => {
          mutate(id)
        }}
      >
        {isPending ? <ButtonSpinner/> : 'Sim'}
      </button>
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
        onClick={onClose}
      >
        Não
      </button>
    </div>
  )
}
