import { BookOpen, Mail, MapPin, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'kitabi-keeda');

  return (
    <footer className="bg-caramel/30 border-t border-caramel mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-warm-brown" />
              <span className="text-2xl font-bold text-warm-brown">Kitabi Keeda</span>
            </div>
            <p className="text-caramel-dark">
              Your trusted destination for quality second-hand books in Kolkata.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-warm-brown mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-caramel-dark">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Kolkata, India</span>
              </div>
              <div className="flex items-center gap-2 text-caramel-dark">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:contact@kitabikeeda.com" className="hover:text-warm-brown transition-colors">
                  contact@kitabikeeda.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-warm-brown mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-caramel-dark hover:text-warm-brown transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-caramel-dark hover:text-warm-brown transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-caramel-dark hover:text-warm-brown transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-caramel text-center text-sm text-caramel-dark">
          <p>
            © {currentYear} Kitabi Keeda. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
