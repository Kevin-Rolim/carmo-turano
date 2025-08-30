import { School, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* School Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <School className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">E.E. Voluntário Carmo Turano</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Educação pública de qualidade em Cedral-SP. 
              Formando cidadãos conscientes e preparados para o futuro.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Contato</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Rua da Educação, 123 - Cedral, SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(17) 3263-1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@carmoturano.edu.sp.gov.br</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Links Úteis</h3>
            <div className="space-y-1 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Secretaria da Educação SP
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Prefeitura de Cedral
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Portal do Aluno
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Escola Estadual Voluntário Carmo Turano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};