import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon';
import Button from '../../../components/elements/Button';

const ResumeCommande = ({cartItems = [], isProcessing = false, onProceedToCheckout}) => {

  const navigate = useNavigate();
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const total = subtotal;
  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  const handleProceedToCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      navigate('/delivery-information');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-luxury sticky top-28">
      <div className="p-6 border-b border-border/10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl text-foreground">
            Résumé de commande
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingBag" size={20} className="text-accent" />
            <span className="font-medium text-sm text-muted-foreground">
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})
            </span>
            <span className="font-medium text-foreground">
              {subtotal?.toFixed(0)} MAD
            </span>
          </div>
          
          <div className="border-t border-border/10 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-foreground">
                Total
              </span>
              <span className="font-bold text-2xl text-foreground">
                {total?.toFixed(0)} MAD
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="default" size="lg" onClick={handleProceedToCheckout} disabled={isProcessing || cartItems?.length === 0}
            loading={isProcessing} iconName="ArrowRight" iconPosition="right" fullWidth
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base py-4"
          >
            Acheter Maintenant
          </Button>
          
          <Button variant="outline" size="lg" fullWidth
            className="border-2 border-border hover:bg-muted/50 py-4"
          >
            <Icon name="Heart" size={20} className="mr-2" />
            Favoris
          </Button>
        </div>

        <div className="pt-6 border-t border-border/10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Produits authentiques
                </p>
                <p className="text-xs text-muted-foreground">
                  garantie un an
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Truck" size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Livraison partout
                </p>
                <p className="text-xs text-muted-foreground">
                  Au Maroc sous 24-48h
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="MessageCircleReply" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Service client
                </p>
                <p className="text-xs text-muted-foreground">
                  Support 7j/7, réponse sous 24h
                </p>
              </div>
            </div>
          </div>
        </div>

        {subtotal > 1000 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Gift" size={20} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">
                  Livraison gratuite incluse !
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeCommande;