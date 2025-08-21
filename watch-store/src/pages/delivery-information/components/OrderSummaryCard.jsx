import React, { useState } from 'react';
import Icon from '../../../components/Icon';
import Button from '../../../components/elements/Button';
import { useCart } from '../../../components/elements/PanierSide';

const OrderSummaryCard = ({ 
  deliveryOption = 'standard',
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
  } = useCart();

  const deliveryOptions = {
    standard: { label: 'Livraison Standard', price: 0, duration: '5-7 jours' },
  };

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (Number(item?.price) * Number(item?.quantity)), 
    0
  );
  const deliveryPrice = deliveryOptions?.[deliveryOption]?.price || 0;
  const total = subtotal + deliveryPrice;
  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);


  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (onToggleCollapse) {
      onToggleCollapse(!newExpanded);
    }
  };

  return (
    <div className="bg-card border border-border/20 rounded-lg shadow-luxury sticky top-24">
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={handleToggle}
          className="w-full justify-between p-4 h-auto"
        >
          <div className="flex items-center space-x-3">
            <Icon name="ShoppingBag" size={20} />
            <span className="font-body font-medium">Résumé de commande</span>
            <span className="bg-primary/10 text-primary text-xs font-mono px-2 py-1 rounded-full">
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          </div>
        </Button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="hidden lg:block p-6 border-b border-border/20">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Résumé de commande
            </h3>
            <span className="bg-primary/10 text-primary text-sm font-mono px-3 py-1 rounded-full">
             {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-4 max-h-64 overflow-y-auto">
          {cartItems?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-body">Votre panier est vide</p>
            </div>
          ) : (
            cartItems?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-background rounded-md flex items-center justify-center flex-shrink-0 border border-border/20">
                   <img
              src={`http://localhost:5000/restoreImages/${item.image}`}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-sm text-foreground truncate">
                    {item?.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground font-caption">
                      Qté: {Number(item?.quantity)}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {Number(item?.price)?.toFixed(2)} MAD/pièce
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium text-sm text-foreground">
                    {(Number(item?.price) * Number(item?.quantity))?.toFixed(2)} MAD
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 lg:p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-muted-foreground">Sous-total</span>
            <span className="font-mono font-medium text-sm text-foreground">
              {subtotal?.toFixed(2)} MAD
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-muted-foreground">Livraison</span>
            <span className="font-mono font-medium text-sm text-foreground">
              {deliveryPrice === 0 ? 'Gratuite' : Number(deliveryPrice)?.toFixed(2) + ' MAD'}
            </span>
          </div>
          <div className="border-t border-border/20 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-body font-semibold text-base text-foreground">Total</span>
              <span className="font-mono font-bold text-xl text-primary">
                {total?.toFixed(2)} MAD
              </span>
            </div>
          </div>

          {deliveryPrice === 0 && subtotal > 0 && (
            <div className="bg-success/10 border border-success/20 rounded-md p-2 mt-3">
              <div className="flex items-center space-x-2">
                <Icon name="Gift" size={16} className="text-success" />
                <span className="text-xs text-success font-body">
                  Livraison gratuite incluse !
                </span>
              </div>
            </div>
          )}
        </div>

         <div className="p-4  pt-0">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground font-caption">
                Livraison partout au Maroc
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground font-caption">
                Paiement à la livraison
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircleReply" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground font-caption">
                Support 7j/7, réponse en 24h
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSummaryCard;
