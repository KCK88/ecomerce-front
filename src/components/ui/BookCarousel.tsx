import {useMemo} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {useQuery} from "@tanstack/react-query";
import {convertImg, getBooks} from "@/services/apiBooks.ts";
import type {BookType} from "@/types/BookType.ts";
import {Skeleton} from "@/components/ui/skeleton"
import Stars from "@/components/ui/Stars.tsx";
import {useNavigate} from "react-router";
import {Card} from "@/components/ui/card.tsx";

export default function BookCarousel() {
  const navigate = useNavigate();

  const {data} = useQuery({
    queryKey: ['books'],
    queryFn: getBooks
  });
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
    <div className="flex flex-col p-12">
      <Carousel
        opts={{
          loop: true,
          watchDrag: false,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {books.map((book, index) => (
            <Card className="mx-2 hover:shadow-lg transition-shadow" key={index}>
              <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div >
                  <div className="p-4">
                    {isImagesLoading ? (<div className="flex flex-col items-center space-y-4">
                      <div className="flex flex-col items-center space-y-4">
                        <Skeleton className="h-48 w-32 rounded-lg mx-auto" />
                        <div className="space-y-2 w-full">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-6 w-1/2" />
                        </div>
                      </div>
                    </div>) : <img
                      src={imageUrls?.[book._id] || `${book.coverImage}`}
                      alt={book.title}
                      onClick={() => navigate(`/product/${book._id}`)}
                      className='max-w-[250px] max-h-[300px] cursor-pointer hover:scale-105 transition-transform'
                    />}
                    <div className="mt-4 space-y-2">
                      <h3
                        className="truncate font-semibold text-gray-900 line-clamp-2 group-hover:text-stone-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/product/${book._id}`)}
                      >
                        {book.title.length > 30 ? book.title.slice(0, 30 - 3) + "..." : book.title}
                      </h3>

                      <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-stone-600">
                              {book.averageRating}
                            </span>
                        <Stars averageRating={book.averageRating} />
                        <span className="text-sm text-gray-600">
                              ({book.reviewsCount})
                            </span>
                      </div>

                      <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-stone-900">
                              R$ {book.price.toFixed(2)}
                            </span>
                      </div>
                    </div>

                  </div>
                </div>
              </CarouselItem>
            </Card>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
}
