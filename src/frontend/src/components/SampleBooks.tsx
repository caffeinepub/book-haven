import { useGetBookCatalog } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';

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

export default function SampleBooks() {
  const { data: allBooks, isLoading, error } = useGetBookCatalog();

  // Debug logging
  useEffect(() => {
    console.log('=== SampleBooks Debug Info ===');
    console.log('1. Raw catalog data:', allBooks);
    console.log('2. Is loading:', isLoading);
    console.log('3. Error:', error);
    console.log('4. Number of books:', allBooks?.length || 0);
    
    if (allBooks && allBooks.length > 0) {
      console.log('5. Book titles:', allBooks.map(([id, book]) => book.title));
      console.log('6. Cover images available:', Object.keys(BOOK_IMAGES));
      
      // Check each book for image mapping
      allBooks.forEach(([id, book]) => {
        const hasImage = BOOK_IMAGES[book.title];
        console.log(`   - "${book.title}": ${hasImage ? '✓ Has image' : '✗ Missing image'}`);
      });
    } else {
      console.log('5. ⚠️ No books returned from backend!');
      console.log('6. This component expects 12 books to display');
    }
    console.log('=============================');
  }, [allBooks, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-leaf-green" />
      </div>
    );
  }

  if (error) {
    console.error('SampleBooks error:', error);
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-xl mx-auto bg-destructive/10 border-2 border-destructive rounded-lg p-6">
          <h3 className="text-lg font-bold text-destructive mb-2">Failed to Load Sample Books</h3>
          <p className="text-sm text-destructive mb-3">{error instanceof Error ? error.message : 'Unknown error'}</p>
          <p className="text-xs text-sage">Check browser console for details</p>
        </div>
      </div>
    );
  }

  if (!allBooks || allBooks.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-xl mx-auto bg-warning/10 border-2 border-warning rounded-lg p-6">
          <h3 className="text-lg font-bold text-forest-green mb-2">No Sample Books Available</h3>
          <p className="text-sm text-sage mb-3">The backend catalog is empty.</p>
          <div className="text-left bg-white/50 rounded p-3 text-xs">
            <p className="font-semibold mb-1">Expected:</p>
            <ul className="list-disc list-inside space-y-1 text-sage">
              <li>12 books should be pre-loaded in the backend</li>
              <li>4 Thriller, 4 Romantic, 4 Ghost books</li>
            </ul>
            <p className="mt-2 font-semibold">Action needed:</p>
            <p className="text-sage">Backend needs to populate the book catalog with sample data.</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('SampleBooks: Rendering', allBooks.length, 'books');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {allBooks.map(([id, book]) => {
        const coverImage = BOOK_IMAGES[book.title] || '/assets/generated/book-placeholder.dim_300x400.png';
        
        if (!BOOK_IMAGES[book.title]) {
          console.warn(`⚠️ Missing cover image for book: "${book.title}"`);
        } else {
          console.log(`✓ Rendering sample book: "${book.title}"`);
        }
        
        return (
          <Card
            key={id}
            className="group hover:shadow-lg transition-all duration-300 border-2 border-sage-light hover:border-leaf-green bg-cream/80 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="aspect-[2/3] bg-sage-light/30 flex items-center justify-center overflow-hidden">
                <img
                  src={coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error(`Failed to load image for "${book.title}":`, coverImage);
                    e.currentTarget.src = '/assets/generated/book-placeholder.dim_300x400.png';
                  }}
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
        );
      })}
    </div>
  );
}
