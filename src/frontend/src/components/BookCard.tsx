import { Card, CardContent } from '@/components/ui/card';
import type { Book } from '../backend';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  coverImageOverride?: string;
}

export default function BookCard({ book, coverImageOverride }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const coverImage = coverImageOverride || book.coverImage?.getDirectURL() || '/assets/generated/book-placeholder.dim_300x400.png';

  const handleImageError = () => {
    console.error(`Failed to load cover image for "${book.title}":`, coverImage);
    setImageError(true);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-sage-light hover:border-leaf-green bg-cream/90 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[2/3] bg-sage-light/30 flex items-center justify-center overflow-hidden">
          <img
            src={imageError ? '/assets/generated/book-placeholder.dim_300x400.png' : coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-forest-green mb-2 line-clamp-2 text-base">
            {book.title}
          </h3>
          <p className="text-sm text-sage mb-3 line-clamp-1">{book.author}</p>
          <p className="text-xl font-bold text-leaf-green">
            ₹{Number(book.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
