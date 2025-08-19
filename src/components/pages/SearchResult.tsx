import {useSearchParams} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {convertImg, getSearchBook} from "@/services/apiBooks.ts";
import type {BookType} from "@/types/BookType.ts";
import {useMemo} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {dateFormater} from "@/utils/dateFormater.ts";
import Stars from "@/components/ui/Stars.tsx";
import {useNavigate} from "react-router";
import NoBooks from "@/components/ui/NoBooks.tsx";
import ErrorBooks from "@/components/ui/ErrorBooks.tsx";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton.tsx";
import {Card, CardContent,} from "@/components/ui/card"

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''

  const {data, isLoading, isError} = useQuery({
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
    retry: 1
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
    enabled: books.length > 0
  });

  if (!isLoading && !isError && books.length === 0 && (category || search)) return <NoBooks category={category}
                                                                                            search={search}/>

  if (isError) return <ErrorBooks/>


  if (isLoading) return <LoadingSkeleton/>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {books.map((book: BookType) => (
        <Card key={book._id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <li className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex justify-center">
                  {isImagesLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-[150px] w-[100px]"/>
                      <Skeleton className="h-4 w-[150px]"/>
                      <Skeleton className="h-4 w-[100px]"/>
                    </div>
                  ) : (
                    <img
                      src={imageUrls?.[book._id] || `${book.coverImage}`}
                      alt={book.title}
                      onClick={() => navigate(`/product/${book._id}`)}
                      className="max-w-[120px] max-h-[180px] cursor-pointer hover:scale-105 transition-transform"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-medium line-clamp-2">{book.title}</span>
                  <div className="text-sm text-gray-500">
                    <span>Edição {book.language} | </span>
                    <span>por {book.authors[0].name} | </span>
                    <span>{dateFormater(book.publishedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Stars averageRating={book.averageRating}/>
                    <span className="text-sm">{book.reviewsCount}</span>
                  </div>
                  <span className="font-bold">R$ {book.price.toFixed(2)}</span>
                </div>
              </div>
            </li>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
