import React from 'react';

const OrderInfo = ({ orderItems, subtotal, deliveryPrice, total }) => {
  return (
    <div className="bg-card border border-border/20 rounded-lg shadow-luxury">
      <div className="p-6 border-b border-border/20">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Résumé de votre commande
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {orderItems?.map((item, index) => (
          <div key={item?._id || index} className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`http://localhost:5000/restoreImages/${item.image}`}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-foreground truncate">
                {item?.name || 'Produit'}
              </h4>
              <p className="text-sm text-muted-foreground font-caption">
                {item?.category || 'Catégorie'}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-muted-foreground font-caption">
                  Quantité: {item?.quantity || 1}
                </span>
                <span className="font-mono font-medium text-sm text-foreground">
                  {item?.price?.toFixed(2) || '0.00'} MAD
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-foreground">
                {(item?.price * item?.quantity)?.toFixed(2) || '0.00'} MAD
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border/20 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-body text-muted-foreground">Sous-total</span>
          <span className="font-mono font-medium text-foreground">
            {subtotal?.toFixed(2) || '0.00'} MAD
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-body text-muted-foreground">Livraison</span>
          <span className="font-mono font-medium text-foreground">
            {deliveryPrice === 0 ? 'Gratuit' : `${deliveryPrice?.toFixed(2) || '0.00'} MAD`}
          </span>
        </div>

        <div className="border-t border-border/20 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-body font-bold text-lg text-foreground">Total</span>
            <span className="font-mono font-bold text-xl text-primary">
              {total?.toFixed(2) || '0.00'} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
