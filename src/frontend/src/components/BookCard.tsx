import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Book } from '../backend';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const imageUrl = book.coverImage.getDirectURL();
  const price = Number(book.price);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-sage-light hover:border-leaf-green bg-white">
      <div className="aspect-[3/4] overflow-hidden bg-soft-beige">
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-forest-green mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sage text-sm mb-3">{book.author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge className="bg-leaf-green hover:bg-forest-green text-white text-base px-4 py-1">
          ${price.toFixed(2)}
        </Badge>
      </CardFooter>
    </Card>
  );
}
