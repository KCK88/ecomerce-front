import {AlertCircle} from "lucide-react";

export default function ErrorBooks() {

  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-red-50 border border-red-200 text-stone-500 px-4 py-3 rounded-lg max-w-md">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5"/>
          <h3 className="font-medium">Não encontramos nenhum pedido</h3>
        </div>
        <p className="mt-2 text-sm">
          Nenhum pedido encontrado… sua próxima história ainda está para ser escolhida
        </p>
      </div>
    </div>
  );
}
