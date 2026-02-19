import { BookOpen, Mail, MapPin, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'kitabi-keeda');

  return (
    <footer className="bg-gradient-to-br from-sage-light to-soft-beige border-t border-sage-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-leaf-green" />
              <h3 className="text-xl font-bold text-forest-green">Kitabi Keeda</h3>
            </div>
            <p className="text-sage mb-4">
              Your trusted source for quality second-hand books. Bringing stories to life, one book at a time.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-forest-green mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sage">
                <Mail className="h-5 w-5 mt-0.5 text-leaf-green" />
                <span>hello@kitabikeeda.com</span>
              </div>
              <div className="flex items-start gap-2 text-sage">
                <MapPin className="h-5 w-5 mt-0.5 text-leaf-green" />
                <div>
                  <p>Kolkata, India</p>
                  <p className="text-sm">West Bengal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold text-forest-green mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-sage hover:text-leaf-green transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-sage hover:text-leaf-green transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-sage hover:text-leaf-green transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-light pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sage text-sm">
            © {currentYear} Kitabi Keeda. All rights reserved.
          </p>
          <p className="text-sage text-sm flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-leaf-green fill-leaf-green" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-leaf-green hover:text-forest-green font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
