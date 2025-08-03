import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../../../../watch-store/src/components/elements/Button';
import Icon from '../../../../../watch-store/src/components/Icon'
import logo from '../../../../../watch-store/public/images/bijoux-by-dox-logo.png'

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState) {
      setSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleOpenSideBar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      setConnectionStatus(Math.random() > 0.95 ? 'disconnected' : 'connected');
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    {
      path: '/stock-management',
      label: 'Gestion du Stock',
      icon: 'Package',
      tooltip: 'Suivi des stocks, ruptures et réapprovisionnement',
      badge: 3
    },
    {
      path: '/orders',
      label: 'Commandes',
      icon: 'ShoppingBag',
      tooltip: 'Gestion et suivi des commandes clients',
      badge: null
    },
    {
      path: '/avis-client',
      label: 'Avis Clients',
      icon: 'Star',
      tooltip: 'Consultation et modération des avis clients',
      badge: 1
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    return `${Math.floor(diff / 3600)}h`;
  };

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-100 transition-all duration-300 ease-smooth ${
        sidebarOpen ? 'w-16' : 'w-60'} hidden lg:flex flex-col`}>    
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {!sidebarOpen && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-[6.5rem] h-8 ">
                 <img  src={logo} alt="Logo Bijoux By Doux" className="w-[6rem] h-[2.5rem] lg:w-[9rem] lg:h-[3.5rem]"/>
              </div>
             
            </Link>
          )}
          
          {sidebarOpen && (
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg mx-auto">
              <Icon name="Watch" size={20} color="white" />
            </div>
          )}
        </div>

        <div className={`px-6 py-4 border-b border-border ${sidebarOpen ? 'px-4' : ''}`}>
          {!sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-success animate-pulse-subtle' : 'bg-error'
                }`} />
                <span className="text-xs text-muted-foreground">
                  {connectionStatus === 'connected' ? 'En ligne' : 'Hors ligne'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatLastUpdate(lastUpdate)}
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-success animate-pulse-subtle' : 'bg-error'
              }`} />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth hover-lift ${
                  isActivePath(item.path)? 'bg-primary text-primary-foreground shadow-card': 'text-muted-foreground hover:text-foreground hover:bg-muted' } ${sidebarOpen ? 'justify-center' : ''}`}>
                <div className="relative">
                  <Icon name={item.icon} size={20} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!sidebarOpen && <span>{item.label}</span>}
              </Link>
              
              {sidebarOpen && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-modal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-150">
                  {item.tooltip}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          {!sidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Admin</p>
                  <p className="text-xs text-muted-foreground truncate">Gestionnaire</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}  onClick={() => {}}/>
                <Button variant="ghost" size="sm" iconName={sidebarOpen ? 'ChevronRight' : 'ChevronLeft'} iconSize={16} onClick={toggleOpenSideBar}/>
                <Button variant="ghost" size="sm" iconName="LogOut" iconSize={16} onClick={() => {}}/>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="ghost" size="sm"  iconName="ChevronRight" iconSize={16} onClick={toggleOpenSideBar}/>
              </div>
            </div>
          )}
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100 h-16">
        <div className="flex items-center justify-around h-full px-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                isActivePath(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={20} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideBar;