import React, { useState } from 'react';
import Icon from '../../../components/Icon';
import Button from '../../../components/elements/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, isUpdating = false }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    onUpdateQuantity(item?._id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(item?._id);
    setIsRemoving(false);
  };

  const hasDiscount = item?._id === 1 || item?._id === 2; 
  const oldPrice = hasDiscount ? item?.price * 1.24 : null;

  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm transition-all duration-300 overflow-hidden ${
      isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    }`}>
      <div className="p-6">
        <div className="flex items-start space-x-6">
          <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={`http://localhost:5000/restoreImages/${item.image}`}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-lg text-foreground">
                    {item?.name}
                  </h3>
                  {hasDiscount && (
                    <span className="badge-nouveau">
                      NOUVEAU
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {item?.category}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-150"
                >
                  <Icon name="Heart" size={20} />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleRemove} disabled={isRemoving}
                  className="text-muted-foreground hover:text-error hover:bg-error/10 transition-colors duration-150"
                >
                  <Icon name="Trash2" size={20} />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <span className="price-main">
                  {(item?.price * item?.quantity)?.toFixed(0)} MAD
                </span>
                {oldPrice && (
                  <span className="price-old">
                    {(oldPrice * item?.quantity)?.toFixed(0)} MAD
                  </span>
                )}
              </div>
              {item?.quantity > 1 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {Number(item?.price || 0).toFixed(0)} MAD chacune
                </p>
              )}
            </div>

            <div className="mb-4">
                <h4 className="font-medium text-sm text-foreground mb-2">
                  Caractéristiques principales
                </h4>
                <div className="space-y-1">
                  {Array.isArray(item?.features) &&
                    item.features.map((feat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span className="text-sm text-muted-foreground">
                          {feat}
                        </span>
                      </div>
                    ))}
                </div>
                </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                    className={`stock-indicator ${
                       item?.currentStock > 0
                        ? "text-[#005830]"
                        : "text-[#b00020]"
                    }`}
                  >
                  { item?.currentStock > 0
                    ? "En stock"
                    : "Rupture de stock"}
                  </div>

                <span className="text-sm text-muted-foreground">
                  Expédition sous 24-48h
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">
                  Quantité
                </span>
                <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item?.quantity - 1)}
                    disabled={isUpdating || item?.quantity <= 1}
                    className="w-8 h-8 hover:bg-background transition-colors duration-150"
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  
                  <span className="font-mono font-medium text-sm text-foreground min-w-[2rem] text-center">
                    {item?.quantity}
                  </span>
                  
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item?.quantity + 1)} disabled={isUpdating}
                    className="w-8 h-8 hover:bg-background transition-colors duration-150"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              </div>
            </div>

            {item?.stock && item?.stock < 5 && (
              <div className="mt-3 flex items-center space-x-2 p-2 bg-warning/10 border border-warning/20 rounded-lg">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-warning">
                  Plus que {item?.stock} en stock
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default  CartItem;