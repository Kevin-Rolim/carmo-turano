import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accessibility, Plus, Minus, RotateCcw, Moon, Sun } from 'lucide-react';
import accessibilityIcon from '@/assets/accessibility-icon.jpg';

interface FontSize {
  name: string;
  scale: number;
  class: string;
}

const fontSizes: FontSize[] = [
  { name: 'Muito Pequeno', scale: 0.75, class: 'text-xs' },
  { name: 'Pequeno', scale: 0.875, class: 'text-sm' },
  { name: 'Normal', scale: 1, class: 'text-base' },
  { name: 'Grande', scale: 1.125, class: 'text-lg' },
  { name: 'Muito Grande', scale: 1.25, class: 'text-xl' },
  { name: 'Extra Grande', scale: 1.5, class: 'text-2xl' }
];

export const AccessibilityControls = () => {
  const [currentFontSize, setCurrentFontSize] = useState(2); // Normal por padrão
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem('accessibility-font-size');
    if (savedSize) {
      setCurrentFontSize(parseInt(savedSize));
    }
    
    const savedDarkMode = localStorage.getItem('accessibility-dark-mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedDarkMode ? savedDarkMode === 'true' : systemPrefersDark;
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizes[currentFontSize].scale}rem`;
    localStorage.setItem('accessibility-font-size', currentFontSize.toString());
  }, [currentFontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('accessibility-dark-mode', isDarkMode.toString());
  }, [isDarkMode]);

  const increaseFontSize = () => {
    if (currentFontSize < fontSizes.length - 1) {
      setCurrentFontSize(currentFontSize + 1);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > 0) {
      setCurrentFontSize(currentFontSize - 1);
    }
  };

  const resetFontSize = () => {
    setCurrentFontSize(2);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 border-primary/30"
          aria-label="Controles de Acessibilidade"
        >
          <img 
            src={accessibilityIcon} 
            alt="Acessibilidade" 
            className="w-4 h-4"
          />
          <span className="hidden sm:inline text-sm">Acessibilidade</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Accessibility className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Controles de Acessibilidade</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tamanho da Fonte: {fontSizes[currentFontSize].name}
              </label>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={currentFontSize === 0}
                  className="flex-1 text-xs px-2"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFontSize}
                  className="flex-1 text-xs px-2"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={currentFontSize === fontSizes.length - 1}
                  className="flex-1 text-xs px-2"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Diminuir</span>
                <span>Normal</span>
                <span>Aumentar</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Contraste da Página
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center space-x-2"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Modo Noturno</span>
                  </>
                )}
              </Button>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Use estes controles para ajustar o tamanho do texto e o contraste da página para melhorar a legibilidade e acessibilidade do site.
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};