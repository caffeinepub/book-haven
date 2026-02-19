import { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import LoginButton from './LoginButton';
import MenuDropdown from './MenuDropdown';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pistachio-mist/95 backdrop-blur-sm border-b border-sage-light shadow-sm overflow-hidden">
      {/* Leafy header pattern background */}
      <div 
        className="absolute inset-0 opacity-20 bg-repeat-x bg-center pointer-events-none"
        style={{ 
          backgroundImage: 'url(/assets/generated/leaf-header-pattern.dim_1200x200.png)',
          backgroundSize: 'auto 100%'
        }}
      />
      
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left side: Menu + Logo */}
          <div className="flex items-center gap-3">
            <MenuDropdown />
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-leaf-green" />
              <span className="text-2xl font-bold text-forest-green">Kitabi Keeda</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-sage hover:text-forest-green transition-colors font-medium">
              Browse Books
            </a>
            <a href="#about" className="text-sage hover:text-forest-green transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-sage hover:text-forest-green transition-colors font-medium">
              Contact
            </a>
            <LoginButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sage hover:text-forest-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-sage-light pt-4">
            <div className="flex flex-col gap-4">
              <a 
                href="#catalog" 
                className="text-sage hover:text-forest-green transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Books
              </a>
              <a 
                href="#about" 
                className="text-sage hover:text-forest-green transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-sage hover:text-forest-green transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <LoginButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
