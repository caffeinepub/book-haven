import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import Layout from './components/Layout';
import ProfileSetupModal from './components/ProfileSetupModal';
import SearchBar from './components/SearchBar';
import BookCatalog from './components/BookCatalog';
import AddBookForm from './components/AddBookForm';
import BookPreferences from './components/BookPreferences';
import SampleBooks from './components/SampleBooks';
import SellBookModal from './components/SellBookModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookPlus } from 'lucide-react';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [sellModalOpen, setSellModalOpen] = useState(false);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing || (isAuthenticated && !isFetched)) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-leaf-green border-r-transparent"></div>
            <p className="mt-4 text-sage">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileSetupModal open={showProfileSetup} />
      <SellBookModal open={sellModalOpen} onOpenChange={setSellModalOpen} />
      
      {/* Hero Section with Leafy Background */}
      <section className="relative bg-gradient-to-br from-pistachio-mist via-soft-beige to-sage-light py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/leafy-background.dim_1920x1080.png)' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-forest-green mb-6 tracking-tight">
              Kitabi Keeda
            </h1>
            <p className="text-xl md:text-2xl text-sage mb-8">
              Discover treasured stories, one page at a time
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Your destination for quality second-hand books. Every book has a story, and we're here to help you find yours.
            </p>
            
            {/* Sell Your Book Button */}
            {isAuthenticated && (
              <Button
                onClick={() => setSellModalOpen(true)}
                size="lg"
                className="bg-forest-green hover:bg-forest-green/90 text-white shadow-lg"
              >
                <BookPlus className="mr-2 h-5 w-5" />
                Sell Your Book
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Leaf Divider */}
      <div className="flex justify-center -mt-8 mb-8">
        <img 
          src="/assets/generated/leaf-divider.dim_800x100.png" 
          alt="" 
          className="h-20 opacity-50"
        />
      </div>

      {/* Search Section */}
      <section className="container mx-auto px-4 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </section>

      {/* Book Preferences Section */}
      {isAuthenticated && (
        <section className="container mx-auto px-4 mb-12">
          <BookPreferences />
        </section>
      )}

      {/* Sample Books Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-forest-green mb-2">Featured Books</h2>
          <p className="text-sage">Explore our curated collection</p>
        </div>
        <SampleBooks />
      </section>

      {/* Leaf Divider */}
      <div className="flex justify-center mb-12">
        <img 
          src="/assets/generated/leaf-divider.dim_800x100.png" 
          alt="" 
          className="h-16 opacity-40"
        />
      </div>

      {/* Admin Add Book Form */}
      {isAuthenticated && (
        <section className="container mx-auto px-4 mb-12">
          <AddBookForm />
        </section>
      )}

      {/* Book Catalog */}
      <section className="container mx-auto px-4 pb-16">
        <BookCatalog searchTerm={searchTerm} />
      </section>
    </Layout>
  );
}
