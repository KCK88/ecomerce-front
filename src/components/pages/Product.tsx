import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {convertImg, getBook} from "@/services/apiBooks.ts";
import type {BookType} from "@/types/BookType.ts";
import {ChevronDown, ChevronUp} from "lucide-react";
import Stars from "@/components/ui/Stars.tsx";
import {dateFormater} from "@/utils/dateFormater.ts";
import {useNavigate} from "react-router";
import {updateCart} from "@/utils/cartHandlers.ts";
import CustButton from "@/components/ui/CustButton.tsx";


export default function Product() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {bookId} = useParams();
  const navigate = useNavigate();

  const {data, isPending} = useQuery({
    queryKey: ['book', bookId],
    queryFn: async () => {
      if (!bookId) {
        throw new Error('Invalid book id');
      }
      return await getBook(bookId)
    }
  })

  const book: BookType = useMemo(() => data?.book || [], [data?.book]);

  const {data: imageUrl, isPending: isImagesLoading} = useQuery({
    queryKey: ['book-image', bookId],
    queryFn: async () => {
      try {
        const id = bookId ? bookId : '/placeholder-image.png'
        return await convertImg(id);
      } catch (error) {
        console.error(`Failed to load image for book ${bookId}:`, error);
        return '/placeholder-image.png';
      }
    },
  });


  function toggleDescription() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          {isImagesLoading ? (
            <Skeleton className="h-[300px] w-[250px]"/>
          ) : (
            <img
              src={imageUrl || `${book.coverImage}`}
              alt={book.title}
              className="w-[250px] h-[300px] object-contain border rounded-lg"
            />
          )}
        </div>

        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-2">{book.title || <Skeleton/>}</h1>
          <div>
            <span className="text-gray-500">Edição {book.language} | </span>
            <span className="text-gray-500"> por {book.authors?.[0]?.name || "Autor desconhecido"} | </span>
            <span
              className="text-gray-500">{book.publishedDate ? dateFormater(book.publishedDate) : "Data não disponível"}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {isPending ? (
              <Skeleton className="w-[100px]"/>
            ) : (
              <>
                <span className="text-xl font-semibold">{book.averageRating}</span>
                <span><Stars averageRating={book.averageRating}/></span>
                <span className="text-base text-gray-600">({book.reviewsCount} avaliações)</span>
              </>
            )}
          </div>

          <div className="mb-6">
            {isPending ? (
              <Skeleton className="w-[80]"/>
            ) : (
              <span className="text-3xl font-bold text-stone-600">R$ {book.price.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={toggleDescription}
            >
              <h2 className="text-lg font-semibold">Sinopse</h2>
              {isExpanded ? (
                <ChevronUp className="text-gray-500"/>
              ) : (
                <ChevronDown className="text-gray-500"/>
              )}
            </div>

            {isExpanded && (
              <div className="p-4 bg-gray-50 rounded-lg">
                {isPending ? (
                  <>
                    <Skeleton/>
                    <Skeleton/>
                  </>
                ) : (
                  <p className="text-gray-700">{book.description}</p>
                )}
              </div>
            )}
          </div>

          <div  className="flex mb-6 gap-4">
            <CustButton
              className="w-full md:w-auto bg-stone-600 hover:bg-stone-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
              onClick={()=> {
                navigate('/cart')
                updateCart(book, 'add')
              }}
            >
              Comprar Agora
            </CustButton>
            <CustButton
              className="w-full md:w-auto bg-stone-700 hover:bg-stone-800 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
              onClick={()=> updateCart(book, 'add')}
            >
              Adicionar ao carrinho
            </CustButton>

          </div>

        </div>
      </div>
    </div>
  );
}