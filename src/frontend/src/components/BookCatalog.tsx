import { useGetBookCatalog } from '../hooks/useQueries';
import BookCard from './BookCard';
import { Loader2 } from 'lucide-react';

interface BookCatalogProps {
  searchTerm: string;
}

export default function BookCatalog({ searchTerm }: BookCatalogProps) {
  const { data: books, isLoading, error } = useGetBookCatalog();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-leaf-green mx-auto mb-4" />
          <p className="text-sage">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">Failed to load books. Please try again later.</p>
      </div>
    );
  }

  const filteredBooks = books?.filter(([_, book]) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  }) || [];

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-sage text-lg">
          {searchTerm ? 'No books found matching your search.' : 'No books available yet. Check back soon!'}
        </p>
      </div>
    );
  }

  return (
    <div id="catalog">
      {/* Leaf Divider Above Catalog */}
      <div className="flex justify-center mb-8">
        <img 
          src="/assets/generated/leaf-divider.dim_800x100.png" 
          alt="" 
          className="h-16 opacity-40"
        />
      </div>
      
      <h2 className="text-3xl font-bold text-forest-green mb-8 text-center">Our Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(([id, book]) => (
          <BookCard key={id} book={book} />
        ))}
      </div>
    </div>
  );
}
