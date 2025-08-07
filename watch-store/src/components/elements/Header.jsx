import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../Icon';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', path: '/homepage', icon: 'Home' },
    { name: 'Collections', path: '/product-detail', icon: 'Watch' },
    { name: 'À Propos', path: '/about', icon: 'Info' },
    { name: 'Contact', path: '/contact', icon: 'Mail' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-smooth ${
          isScrolled ? 'bg-background/95 backdrop-luxury shadow-luxury' : 'bg-background/80 backdrop-blur-sm'
      }`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-8">
             <Link to="/homepage"
  className="flex items-center space-x-3 group transition-transform duration-micro hover:scale-105"
>
  <div className="relative">
    <img  src="/images/bijoux-by-dox-logo.png" alt="Logo Bijoux By Doux" className="w-[6rem] h-[2.5rem] lg:w-[9.5rem] lg:h-[4rem]"/>
  </div>
</Link>


         
          <nav className="hidden lg:flex items-center space-x-2 ml-[9rem]">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path} className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium transition-all duration-smooth ${
                  isActivePath(item.path) ? 'bg-accent text-accent-foreground shadow-luxury': 'text-comfortable-reading hover:text-accent hover:bg-warm-canvas'}`}>
                <Icon  name={item.icon}  size={18}  className={`transition-transform duration-micro group-hover:scale-110 ${
                    isActivePath(item.path) ? 'text-accent-foreground' : 'text-clear-hierarchy' }`}/>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

      <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" iconName="Search" iconPosition="left" className="text-comfortable-reading ">
              Rechercher
            </Button>
            <Button  variant="outline" size="sm" iconName="Heart"  className=" text-comfortable-reading hover:bg-accent hover:text-accent-foreground "  > 
               </Button>

            <Button variant="outline" size="sm" iconName="CircleUserRound"  iconPosition="left" className=" text-comfortable-reading hover:bg-accent hover:text-accent-foreground" > 
            </Button>
            
            <div className="relative inline-block">
            <Button variant="default" size="sm" iconName="ShoppingBag" iconPosition="left"  className="bg-accent text-accent-foreground hover:bg-elegant-urgency shadow-luxury [&_svg]:w-5 [&_svg]:h-5"/>

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow">
                0
            </span>
</div>
          </div>

          <button onClick={toggleMenu}   className="lg:hidden p-2 rounded-lg text-comfortable-reading hover:bg-warm-canvas transition-colors duration-micro"      aria-label="Toggle menu">
            <Icon  name={isMenuOpen ? "X" : "Menu"}  size={24}  className="transition-transform duration-micro" />
          </button>
        </div>

        <div className={`lg:hidden transition-all duration-carousel overflow-hidden ${ isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'  }`}>
          <nav className="px-4 py-4 bg-background/95 backdrop-luxury border-t border-border">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.path} to={item.path}  onClick={() => setIsMenuOpen(false)}  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-smooth ${
                    isActivePath(item.path)? 'bg-accent text-accent-foreground shadow-luxury' : 'text-comfortable-reading hover:bg-warm-canvas hover:text-accent'}`} >
                  <Icon  name={item.icon}  size={20}   className={isActivePath(item.path) ? 'text-accent-foreground' : 'text-clear-hierarchy'}/>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>


              {/*pour les petites ecrans */}
           <div className="mt-4 pt-2 border-t border-border space-y-3">
              <Button
                variant="outline"size="sm" iconName="Search"  iconPosition="left" fullWidth  className="justify-start border-accent/20 text-comfortable-reading hover:bg-accent hover:text-accent-foreground">
                Rechercher
              </Button>
              
              <Button
                variant="outline" size="sm" iconName="Heart" iconPosition="left" fullWidth  className="justify-start border-accent/20 text-comfortable-reading hover:bg-accent hover:text-accent-foreground"
              >
                Favoris
              </Button>

              <Button variant="outline" size="sm" iconName="ShoppingBag" iconPosition="left" fullWidth
                className="justify-start border-accent/20 text-comfortable-reading hover:bg-accent hover:text-accent-foreground shadow-luxury"
              >
                Commander
              </Button>
            </div>
          </nav>
        </div>
      </div>

        <div className="hidden lg:block bg-warm-canvas/50 border-t border-accent/10">
        <div className="px-8 py-2">
          <div className="flex items-center justify-center space-x-8 text-xs font-accent text-clear-hierarchy">
            <div className="flex items-center space-x-2">
              <Icon name="BadgeCheck" size={14} className="text-[#005830]" />
              <span>Produits authentiques</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={14} className="text-accent" />
              <span>Authentification Garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={14} className="text-[#005830]" />
              <span>Livraison Partout Au Maroc</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-accent" />
              <span>Service Client Premium</span>
            </div>
          </div>
        </div>
      </div>
        <div className="block sm:hidden bg-warm-canvas/50 border-t border-accent/10">
        <div className="px-8 py-2">
          <div className="flex items-center justify-center space-x-8 text-xs font-accent text-clear-hierarchy">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={14} className="text-clear-hierarchy" />
              <span>Livraison Partout Au Maroc</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-clear-hierarchy" />
              <span>Service Client Premium</span>
            </div>
          </div>
        </div>
      </div>
     
    </header>
  );
};

export default Header;