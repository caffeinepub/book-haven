import { useGetSampleBooks } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SampleBooks() {
  const { data: books, isLoading, error } = useGetSampleBooks();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-leaf-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load sample books</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sage">No sample books available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {books.map((book, index) => (
        <Card
          key={index}
          className="group hover:shadow-lg transition-all duration-300 border-2 border-sage-light hover:border-leaf-green bg-cream/80 overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="aspect-[3/4] bg-sage-light/30 flex items-center justify-center overflow-hidden">
              <img
                src="/assets/generated/book-placeholder.dim_300x400.png"
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-forest-green mb-1 line-clamp-2 text-sm">
                {book.title}
              </h3>
              <p className="text-xs text-sage mb-2 line-clamp-1">{book.author}</p>
              <p className="text-lg font-bold text-leaf-green">
                ₹{Number(book.price)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
