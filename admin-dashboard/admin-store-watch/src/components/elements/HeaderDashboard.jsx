import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../../../../watch-store/src/components/elements/Button';
import Icon from '../../../../../watch-store/src/components/Icon';

const HeaderDashboard = () => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { path: '/stock-management', label: 'Stock', icon: 'Package' },
    { path: '/orders', label: 'Commandes', icon: 'ShoppingBag' },
    { path: '/avis-client', label: 'Avis', icon: 'Star' },
  ];

  const secondaryNavItems = [
    { path: '/settings', label: 'Paramètres', icon: 'Settings' },
    { path: '/help', label: 'Aide', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Watch" size={20} color="white" />
          </div>
          
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover-lift ${
                isActivePath(item.path) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}>
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={16}
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`${moreMenuOpen ? 'bg-muted' : ''}`}
            >
              Plus
            </Button>
            
            {moreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-200">
                <div className="py-2">
                  {secondaryNavItems.map((item) => (
                    <Link key={item.path} to={item.path}  className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => setMoreMenuOpen(false)}>
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="sm" iconName="Menu" iconSize={20} onClick={() => setMoreMenuOpen(!moreMenuOpen)}/>
        </div>
        <div className="hidden md:flex items-center space-x-3">
  <Button variant="ghost" size="sm" iconName="User" iconSize={16} />
</div>


      </div>
    {moreMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-3 space-y-1">
            {primaryNavItems.map((item) => (
              <Link key={item.path} to={item.path}  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item.path)? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setMoreMenuOpen(false)}>
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="border-t border-border my-2"></div>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                onClick={() => setMoreMenuOpen(false)}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {moreMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-60 md:hidden"
          onClick={() => setMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default HeaderDashboard;