import {useState, useEffect, useMemo} from "react";
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


export default function BookCarousel() {
  const {data} = useQuery({
    queryKey: ['books'],
    queryFn: getBooks
  });
  const books: BookType[] = useMemo(() => data?.data || [], [data?.data]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      const urls: Record<string, string> = {};
      for (const book of books) {
        try {
          setIsFetching(true);
          urls[book._id] = await convertImg(book._id);
          setIsFetching(false);
        } catch (error) {
          console.error(`Failed to load image for book ${book._id}:`, error);
          urls[book._id] = '/placeholder-image.png';
        }
      }
      setImageUrls(urls);
    };

    if (books.length > 0) {
      fetchImages();
    }
  }, [books]);

  return (
    <div className="flex flex-col p-12">
      <Carousel
        opts={{
          loop: true,
          watchDrag: false,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {books.map((book, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div>
                <div>
                  {isFetching ? (<div>
                    <Skeleton className="h-[100px] w-[100px] rounded-full"/>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-[250px]"/>
                      <Skeleton className="h-5 w-[250px]"/>
                    </div>
                  </div>) : <img
                    src={imageUrls[book._id] || `${book.coverImage}`}
                    alt={book.title}
                    className='max-w-[250px] max-h-[300px]'
                  />}
                  <span className="text-xl">{book.title}</span>
                  <div className="flex ">
                    <span className="text-xl">{book.averageRating}</span>
                    <span className="text-xl"><Stars averageRating={book.averageRating}/></span>
                    <span className="text-base"> {book.reviewsCount}</span>
                  </div>
                  <span>R$ {(book.price.toFixed(2))}</span>

                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
}
