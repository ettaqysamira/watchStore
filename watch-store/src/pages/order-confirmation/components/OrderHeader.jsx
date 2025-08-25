import React from 'react';
import Icon from '../../../components/Icon';

const OrderHeader = ({ orderNumber, orderDate }) => {
  return (
    <div className="text-center space-y-6 mb-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={48} className="text-success" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
          Commande Confirmée !
        </h1>
        <p className="text-muted-foreground font-body text-lg">
          Merci pour votre achat. Votre commande a été traitée avec succès.
        </p>
      </div>

      <div className="bg-success/5 border border-success/20 rounded-lg p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="font-body font-medium text-foreground">
              Numéro de commande
            </p>
            <p className="font-mono font-bold text-lg text-primary">
              #{orderNumber}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-body font-medium text-foreground">
              Date de commande
            </p>
            <p className="font-mono text-muted-foreground">
              {orderDate}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="font-body font-medium text-foreground text-sm">
              Confirmation par email envoyée
            </p>
            <p className="text-muted-foreground font-caption text-xs mt-1">
              Vérifiez votre boîte de réception pour les détails de suivi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;