import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function LoadingOrders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-8" /> {/* Título principal */}

      {Array.from({ length: 2 }).map((_, orderIndex) => (
        <div className="m-8" key={orderIndex}>
          <div className="flex items-center mb-4">
            <Skeleton className="h-6 w-64" />
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full border-b border-gray-300 table-fixed">
              <thead>
              <tr>
                {["Produto", "Quantidade", "Preço", "Status", "Ações"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {Array.from({ length: 3 }).map((_, bookIndex) => (
                <tr key={bookIndex}>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-16" />
                  </td>

                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>

                  <td className="px-1 py-4">
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}