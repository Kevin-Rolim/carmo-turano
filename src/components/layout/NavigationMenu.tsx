import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, History, Contact, FolderOpen, Bell, Trophy } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'História', href: '/historia', icon: History },
  { name: 'Repositório', href: '/repositorio', icon: FolderOpen },
  { name: 'Notificações', href: '/notificacoes', icon: Bell },
  { name: 'Premiações', href: '/premiacoes', icon: Trophy },
  { name: 'Contato', href: '/contato', icon: Contact },
];

interface NavigationMenuProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export const NavigationMenu = ({ mobile = false, onItemClick }: NavigationMenuProps) => {
  const baseClasses = mobile 
    ? "flex flex-col space-y-1 p-4" 
    : "flex items-center space-x-1";

  const linkClasses = mobile
    ? "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
    : "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors";

  return (
    <nav className={baseClasses}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onItemClick}
            className={({ isActive }) =>
              cn(
                linkClasses,
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              )
            }
          >
            <Icon className="w-4 h-4" />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};