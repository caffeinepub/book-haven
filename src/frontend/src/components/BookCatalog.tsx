import { useGetBookCatalog } from '../hooks/useQueries';
import BookCard from './BookCard';
import { Loader2 } from 'lucide-react';
import { useMemo, useEffect } from 'react';
import type { Book } from '../backend';

interface BookCatalogProps {
  searchTerm: string;
}

const BOOK_IMAGES: Record<string, string> = {
  // Thriller books
  'Never Lie': '/assets/generated/thriller-never-lie.dim_400x600.png',
  'The Girl on the Train': '/assets/generated/thriller-girl-on-train.dim_400x600.png',
  'The Boyfriend': '/assets/generated/thriller-boyfriend.dim_400x600.png',
  'The Silent Patient': '/assets/generated/thriller-silent-patient.dim_400x600.png',
  // Romantic books
  'Twisted Love': '/assets/generated/romantic-twisted-love.dim_400x600.png',
  'Never Never': '/assets/generated/romantic-never-never.dim_400x600.png',
  'The Love Hypothesis': '/assets/generated/romantic-love-hypothesis.dim_400x600.png',
  'When I Am with You': '/assets/generated/romantic-when-i-am-with-you.dim_400x600.png',
  // Ghost books
  'That Night': '/assets/generated/ghost-that-night.dim_400x600.png',
  'The Haunting of Hill House': '/assets/generated/ghost-haunting-hill-house.dim_400x600.png',
  'Ghosts of the Silent Hills': '/assets/generated/ghost-silent-hills.dim_400x600.png',
  'Ghost Stories': '/assets/generated/ghost-stories-mr-james.dim_400x600.png',
};

export default function BookCatalog({ searchTerm }: BookCatalogProps) {
  const { data: catalogBooks, isLoading, error } = useGetBookCatalog();

  // Debug logging
  useEffect(() => {
    console.log('=== BookCatalog Debug Info ===');
    console.log('1. Raw catalog data from backend:', catalogBooks);
    console.log('2. Is loading:', isLoading);
    console.log('3. Error:', error);
    console.log('4. Number of books received:', catalogBooks?.length || 0);
    
    if (catalogBooks && catalogBooks.length > 0) {
      console.log('5. Book titles from backend:', catalogBooks.map(([id, book]) => book.title));
      console.log('6. Cover images mapping keys:', Object.keys(BOOK_IMAGES));
      
      // Check for mismatches
      catalogBooks.forEach(([id, book]) => {
        const hasImage = BOOK_IMAGES[book.title];
        console.log(`   - "${book.title}": ${hasImage ? '✓ Has image' : '✗ Missing image'}`);
      });
    } else {
      console.log('5. ⚠️ No books returned from backend!');
      console.log('6. Expected 12 books with titles matching BOOK_IMAGES keys');
    }
    console.log('==============================');
  }, [catalogBooks, isLoading, error]);

  const allBooks = useMemo(() => {
    if (!catalogBooks) {
      console.log('BookCatalog: catalogBooks is null/undefined');
      return [];
    }
    
    console.log('BookCatalog: Processing books, count:', catalogBooks.length);
    
    // Remove duplicates based on book ID
    const uniqueBooks = new Map<string, [string, Book]>();
    catalogBooks.forEach(([id, book]) => {
      uniqueBooks.set(id, [id, book]);
    });
    
    const result = Array.from(uniqueBooks.values());
    console.log('BookCatalog: After deduplication, count:', result.length);
    return result;
  }, [catalogBooks]);

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
    console.error('BookCatalog error:', error);
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-2xl mx-auto bg-destructive/10 border-2 border-destructive rounded-lg p-6">
          <h3 className="text-xl font-bold text-destructive mb-3">Failed to Load Books</h3>
          <p className="text-destructive mb-4">{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
          <div className="text-left bg-white/50 rounded p-4 text-sm">
            <p className="font-semibold mb-2">Troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1 text-sage">
              <li>Check browser console for detailed error messages</li>
              <li>Verify backend canister is running</li>
              <li>Check network connectivity</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!catalogBooks) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-2xl mx-auto bg-warning/10 border-2 border-warning rounded-lg p-6">
          <h3 className="text-xl font-bold text-forest-green mb-3">No Catalog Data</h3>
          <p className="text-sage mb-4">The book catalog data is not available.</p>
          <div className="text-left bg-white/50 rounded p-4 text-sm">
            <p className="font-semibold mb-2">Possible causes:</p>
            <ul className="list-disc list-inside space-y-1 text-sage">
              <li>Backend actor not initialized</li>
              <li>Network request failed</li>
              <li>Check browser console for details</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (allBooks.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-2xl mx-auto bg-warning/10 border-2 border-warning rounded-lg p-6">
          <h3 className="text-xl font-bold text-forest-green mb-3">No Books in Catalog</h3>
          <p className="text-sage mb-4">The backend returned an empty book catalog.</p>
          <div className="text-left bg-white/50 rounded p-4 text-sm">
            <p className="font-semibold mb-2">Expected behavior:</p>
            <ul className="list-disc list-inside space-y-1 text-sage">
              <li>Backend should return 12 books (4 Thriller, 4 Romantic, 4 Ghost)</li>
              <li>Books should be pre-populated in the backend</li>
              <li>Check backend logs and initialization code</li>
            </ul>
            <p className="mt-3 font-semibold">Action needed:</p>
            <p className="text-sage">The backend needs to be updated to include the 12 sample books in the catalog.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredBooks = allBooks.filter(([_, book]) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  });

  console.log('BookCatalog: Filtered books count:', filteredBooks.length, 'Search term:', searchTerm);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-sage text-lg">
          {searchTerm ? `No books found matching "${searchTerm}".` : 'No books available yet. Check back soon!'}
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
        {filteredBooks.map(([id, book]) => {
          const coverImage = BOOK_IMAGES[book.title];
          if (!coverImage) {
            console.warn(`⚠️ Missing cover image mapping for book: "${book.title}"`);
            console.warn('   Available keys:', Object.keys(BOOK_IMAGES));
          } else {
            console.log(`✓ Rendering book: "${book.title}" with image: ${coverImage}`);
          }
          return (
            <BookCard key={id} book={book} coverImageOverride={coverImage} />
          );
        })}
      </div>
    </div>
  );
}
