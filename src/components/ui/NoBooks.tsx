import {AlertCircle} from "lucide-react";

type searchProps = {
  page?: number;
  limit?: number;
  category: string,
  search: string,
}

export default function NoBooks({search, category}: searchProps) {

  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-blue-50 border border-blue-200 text-stone-800 px-4 py-3 rounded-lg max-w-md">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5"/>
          <h3 className="font-medium">Nenhum livro encontrado</h3>
        </div>
        <p className="mt-2 text-sm">
          Sua busca por "{search || category}" não retornou resultados. Tente outros termos.
        </p>
      </div>
    </div>
  );
}
