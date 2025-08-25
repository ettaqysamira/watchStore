import React from 'react';
import Icon from '../../../components/Icon';

const DeliveryInfo = ({ deliveryDetails, customerInfo, orderDate }) => {
  const getDeliveryIcon = (type) => {
    switch (type) {
      case 'express':
        return 'Zap';
      case 'premium':
        return 'Crown';
      default:
        return 'Truck';
    }
  };


  const formatOrderDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border/20 rounded-lg shadow-luxury">
        <div className="p-6 border-b border-border/20">
          <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
            <Icon name={getDeliveryIcon(deliveryDetails?.type)} size={24} className="text-primary" />
            <span>Informations de livraison</span>
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          

          <div className="space-y-3">
            <div>
              <p className="font-body font-medium text-foreground mb-1">
                Adresse de livraison
              </p>
              <div className="text-sm text-muted-foreground font-caption space-y-1">
                <p>{customerInfo?.fullName}</p>
                <p>{customerInfo?.address}</p>
                <p>{customerInfo?.city}, {customerInfo?.postalCode}</p>
                <p>{customerInfo?.country}</p>
              </div>
            </div>

            <div>
              <p className="font-body font-medium text-foreground mb-1">
                Contact
              </p>
              <div className="text-sm text-muted-foreground font-caption space-y-1">
                <p>{customerInfo?.email}</p>
                <p>{customerInfo?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/20 rounded-lg shadow-luxury">
        <div className="p-6 border-b border-border/20">
          <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
            <Icon name="Package" size={24} className="text-accent" />
            <span>Suivi de commande</span>
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} className="text-white" />
              </div>
              <div>
                <p className="font-body font-medium text-foreground">
                  Commande confirmée
                </p>
                <p className="text-sm text-muted-foreground font-caption">
                  {formatOrderDate(orderDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted border-2 border-primary rounded-full flex items-center justify-center">
                <Icon name="Package" size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-body font-medium text-foreground">
                  Préparation en cours
                </p>
                <p className="text-sm text-muted-foreground font-caption">
                  En attente
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted border-2 border-muted-foreground rounded-full flex items-center justify-center">
                <Icon name="Truck" size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-body font-medium text-muted-foreground">
                  Expédition
                </p>
                <p className="text-sm text-muted-foreground font-caption">
                  En attente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
