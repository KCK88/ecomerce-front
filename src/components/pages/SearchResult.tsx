import {useSearchParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {convertImg, getSearchBook} from "@/services/apiBooks.ts";
import type {BookType} from "@/types/BookType.ts";
import {useMemo} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {dateFormater} from "@/utils/dateFormater.ts";
import Stars from "@/components/ui/Stars.tsx";
import {useNavigate} from "react-router";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const {data} = useQuery({
    queryKey: ['search-books', page, limit, category, search],
    queryFn: async () => {
      try {
        if (category || search) {
          return await getSearchBook(page, limit, search, category);
        }
      } catch (error) {
        return {data: []}
      }
    },

  })

  const books: BookType[] = useMemo(() => data?.data || [], [data?.data]);

  const {data: imageUrls, isPending: isImagesLoading} = useQuery({
    queryKey: ['book-images', books.map(book => book._id)],
    queryFn: async () => {
      const urls: Record<string, string> = {};
      await Promise.all(books.map(async (book: BookType) => {
        try {
          urls[book._id] = await convertImg(book._id);
        } catch (error) {
          console.error(`Failed to load image for book ${book._id}:`, error);
          urls[book._id] = '/placeholder-image.png';
        }
      }));
      return urls;
    },
    enabled: books.length > 0 // Não tiver libros não executa
  });


  return (
    <div>
      {books.map((book: BookType) => (
        <ul key={book._id}>
          <li className="flex p-5 gap-4 border-8">
            <div>{isImagesLoading ? (<div>
              <Skeleton className="h-[100px] w-[100px] rounded-full"/>
              <div className="space-y-2">
                <Skeleton className="h-5 w-[250px]"/>
                <Skeleton className="h-5 w-[250px]"/>
              </div>
            </div>) : <img
              src={imageUrls?.[book._id] || `${book.coverImage}`}
              alt={book.title}
              onClick={()=> navigate(`/product/${book._id}`)}
              className='max-w-[150px] max-h-[200px] border-[20px] cursor-pointer'
            />}
            </div>
            <div className="flex flex-col">
              <span className="text-lg">{book.title}</span>
              <div>
                <span className="text-gray-500">Edição {book.language} | </span>
                <span className="text-gray-500"> por {book.authors[0].name} | </span>
                <span className="text-gray-500">{dateFormater(book.publishedDate)}</span>
              </div>
              <div className="flex gap-1">
                <span><Stars averageRating={book.averageRating}/></span>
                <span className="text-base"> {book.reviewsCount}</span>
              </div>
              <span>R$ {book.price.toFixed(2)}</span>
            </div>
          </li>

        </ul>
      ))}
    </div>
  )
}
/*  const {data} = useQuery({
    queryKey: ['search-books'],
    queryFn: async () => {
      if (search && category === '') {
        return await getSearchBook(page, limit, search);
      }
      if (category && search === '') {
        return await getCategoryBook(page, limit, search);
      }
    }
  })*/