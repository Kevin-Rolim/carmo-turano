import { useState } from 'react';
import { Menu, X, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { NavigationMenu } from '@/components/layout/NavigationMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow hover:scale-105 transition-transform">
              <School className="w-6 h-6 text-primary-foreground" />
            </a>
            <div>
              <a href="/" className="block">
                <h1 className="text-lg font-bold text-foreground hover:text-primary transition-colors">E.E. Voluntário Carmo Turano</h1>
                <p className="text-sm text-muted-foreground">Cedral - SP</p>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu />
          </div>

          {/* Accessibility Controls */}
          <div className="flex items-center space-x-4">
            <AccessibilityControls />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <NavigationMenu mobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};