import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import Button from './Button';

const DivNavigation = ({ 
  showContinueShopping = true, 
  showBackToCart = false,
  showOrderHistory = false,
  customLinks = [],
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleBackToCart = () => {
    navigate('/shopping-cart');
  };

  const handleOrderHistory = () => {
    navigate('/orders');
  };

  const getContextualMessage = () => {
    switch (location.pathname) {
      case '/shopping-cart':
        return "Découvrez notre collection du montres exceptionnels";
      case '/delivery-information':
        return "Retournez au panier pour modifier vos articles";
      case '/order-confirmation':
        return "Explorez nos autres créations uniques";
      default:
        return "Continuez votre shopping";
    }
  };

  const getContextualIcon = () => {
    switch (location.pathname) {
      case '/shopping-cart':
        return 'ArrowLeft';
      case '/delivery-information':
        return 'ShoppingCart';
      case '/order-confirmation':
        return 'Sparkles';
      default:
        return 'ArrowLeft';
    }
  };

  return (
    <div className={`bg-card border border-border/20 rounded-lg p-6 shadow-luxury-sm ${className}`}>
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <Icon  name={getContextualIcon()} size={32} 
            className="mx-auto text-accent" 
          />
          <p className="text-muted-foreground font-body text-sm">
             {getContextualMessage()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showContinueShopping && (
            <Button variant="outline" onClick={handleContinueShopping} iconName="ArrowLeft" iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Continuer les Achats
            </Button>
          )}

          {showBackToCart && (
            <Button variant="secondary" onClick={handleBackToCart} iconName="ShoppingCart" iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Retour au Panier
            </Button>
          )}

          {showOrderHistory && (
            <Button variant="ghost" onClick={handleOrderHistory} iconName="History" iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Mes Commandes
            </Button>
          )}

          {customLinks?.map((link, index) => (
            <Button key={index} variant={link?.variant || "ghost"} onClick={() => navigate(link?.path)}
              iconName={link?.icon} iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              {link?.label}
            </Button>
          ))}
        </div>

        {location.pathname === '/order-confirmation' && (
          <div className="mt-6 pt-4 border-t border-border/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Icon name="Shield" size={24} className="mx-auto text-success" />
                <h4 className="font-body font-medium text-sm text-foreground">
                  Garantie Authentique
                </h4>
                <p className="text-xs text-muted-foreground font-caption">
                  Certificat d'authenticité inclus
                </p>
              </div>
              
              <div className="space-y-2">
                <Icon name="Truck" size={24} className="mx-auto text-primary" />
                <h4 className="font-body font-medium text-sm text-foreground">
                  Livraison Sécurisée
                </h4>
                <p className="text-xs text-muted-foreground font-caption">
                  Emballage premium inclus
                </p>
              </div>
              
              <div className="space-y-2">
                <Icon name="Heart" size={24} className="mx-auto text-accent" />
                <h4 className="font-body font-medium text-sm text-foreground">
                  Service Client
                </h4>
                <p className="text-xs text-muted-foreground font-caption">
                  Support dédié 24/7
                </p>
              </div>
            </div>
          </div>
        )}

        {location.pathname === '/shopping-cart' && (
          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/collections')}
                className="text-xs"
              >
                Collections
              </Button>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivNavigation;