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
  <div className="p-4 sm:p-6">
    <div className="flex items-start space-x-6">
      <div className="w-28 h-28 sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={`http://localhost:5000/restoreImages/${item.image}`}
          alt={item?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-base sm:text-lg text-foreground break-words">
              {item?.name}
            </h3>
            {hasDiscount && (
              <span className="badge-nouveau">NOUVEAU</span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            {item?.category}
          </p>
          <div className="mb-3">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="price-main text-base sm:text-lg">
                {(item?.price * item?.quantity)?.toFixed(0)} MAD
              </span>
              {oldPrice && (
                <span className="price-old text-sm sm:text-base">
                  {(oldPrice * item?.quantity)?.toFixed(0)} MAD
                </span>
              )}
            </div>
            {item?.quantity > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                {Number(item?.price || 0).toFixed(0)} MAD chacune
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`stock-indicator text-xs sm:text-sm ${
                item?.currentStock > 0 ? "text-[#005830]" : "text-[#b00020]"
              }`}
            >
              { item?.currentStock > 0 ? "En stock" : "Rupture de stock"}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Expédition sous 24-48h
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <Icon name="Heart" size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRemove} disabled={isRemoving}
              className="text-muted-foreground hover:text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={18} />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-medium text-foreground">Qté</span>
            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item?.quantity - 1)}
                disabled={isUpdating || item?.quantity <= 1}
                className="w-7 h-7 sm:w-8 sm:h-8 hover:bg-background"
              >
                <Icon name="Minus" size={12} />
              </Button>
              <span className="font-mono font-medium text-sm text-foreground min-w-[2rem] text-center">
                {item?.quantity}
              </span>
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item?.quantity + 1)} disabled={isUpdating}
                className="w-7 h-7 sm:w-8 sm:h-8 hover:bg-background"
              >
                <Icon name="Plus" size={12} />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


  );
};

export default  CartItem;