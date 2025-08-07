import React, { useState } from 'react';
import Icon from '../../../components/Icon';
import Button from '../../../components/elements/Button';

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1); 

  const isInStock = product.currentStock > 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const increaseQty = () => {
    if (quantity < product.currentStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-cta font-medium text-accent bg-warm-canvas px-3 py-1 rounded-full">
            {product.brand}
          </span>
          {product.hasNew && (
            <span className="text-xs font-cta font-medium text-confident-confirmation bg-confident-confirmation/10 px-2 py-1 rounded-full">
              NOUVEAU
            </span>
          )}
          {product.isLimited && (
            <span className="text-xs font-cta font-medium text-elegant-urgency bg-elegant-urgency/10 px-2 py-1 rounded-full">
              ÉDITION LIMITÉE
            </span>
          )}
        </div>

        <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-comfortable-reading">
          {product.name}
        </h1>

        <p className="text-lg font-accent text-clear-hierarchy">
          {product.collection}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-headline font-semibold text-comfortable-reading">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-clear-hierarchy line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.financing && (
          <div className="bg-warm-canvas rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CreditCard" size={18} className="text-accent" />
              <span className="font-cta font-medium text-comfortable-reading">
                Financement disponible
              </span>
            </div>
            <p className="text-sm text-clear-hierarchy">
              À partir de{" "}
              <span className="font-semibold text-comfortable-reading">
                {formatPrice(product.financing.monthlyPayment)}
              </span>{" "}
              par mois sur {product.financing.months} mois
            </p>
          </div>
        )}
      </div>

      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-cta font-medium text-comfortable-reading">
            Taille du boîtier
          </h3>
          <div className="flex space-x-3">
            {product.sizes.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 font-cta font-medium transition-all duration-micro ${
                  selectedSize === size
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-comfortable-reading hover:border-accent/50'
                }`}
              >
                {size}mm
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-cta font-medium text-comfortable-reading">
          Caractéristiques principales
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-confident-confirmation flex-shrink-0"/>
              <span className="text-sm text-clear-hierarchy">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-warm-canvas rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isInStock
                  ? 'bg-confident-confirmation'
                  : product.availability === 'limited'
                  ? 'bg-elegant-urgency'
                  : 'bg-warm-concern'
              }`}
            ></div>
            <div>
              <p className="font-cta font-medium text-comfortable-reading">
                {isInStock ? 'En stock' : 'Indisponible'}
              </p>
              <p className="text-sm text-clear-hierarchy">
                {isInStock
                  ? 'Expédition sous 24-48h'
                  : 'Produit actuellement indisponible'}
              </p>
            </div>
          </div>

          {isInStock && (
            <Icon name="Truck" size={20} className="text-confident-confirmation" />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-cta font-medium text-comfortable-reading">Quantité</span>
        <div className="flex items-center border border-border rounded-lg">
          <button onClick={decreaseQty}
            className="px-3 py-1 text-lg font-bold text-accent hover:bg-warm-canvas"
          >
            -
          </button>
          <span className="px-4 py-1 text-comfortable-reading font-medium">{quantity}</span>
          <button onClick={increaseQty}
            className="px-3 py-1 text-lg font-bold text-accent hover:bg-warm-canvas"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button variant="default" size="lg" iconName="ShoppingBag" iconPosition="left"
            className="flex-1 bg-accent text-accent-foreground hover:bg-elegant-urgency shadow-luxury"
          >
            Ajouter au panier
          </Button>

          <Button variant="outline" size="lg" iconName={isWishlisted ? "Heart" : "Heart"} iconPosition="left" onClick={toggleWishlist}
            className={`border-accent/20 ${
              isWishlisted
                ? 'bg-accent text-accent-foreground'
                : 'text-comfortable-reading hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {isWishlisted ? 'Ajouté' : 'Favoris'}
          </Button>
        </div>

        <Button variant="secondary" size="lg" iconName="CreditCard" iconPosition="left" fullWidth
          className="bg-secondary text-secondary-foreground hover:bg-sophisticated-depth"
        >
          Acheter Maintenant
        </Button>

        
      </div>
      
    </div>
  );
};

export default ProductInfo;
