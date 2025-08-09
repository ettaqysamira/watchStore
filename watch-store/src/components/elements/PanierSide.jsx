import React, { createContext, useContext, useState, useEffect } from 'react';
import Icon from '../Icon';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('luxuryWatchCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luxuryWatchCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems?.find(item => item?._id === product?._id);
      if (existingItem) {
        return prevItems?.map(item =>
          item?._id === product?._id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      const price = parseFloat(item?.price?.replace(/[^\d,]/g, '')?.replace(',', '.'));
      return total + (price * item?.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems?.reduce((total, item) => total + item?.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

const PanierSide = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      const numericPrice = parseFloat(price?.replace(/[^\d,]/g, '')?.replace(',', '.'));
      return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })?.format(numericPrice);
    }
    return price?.toFixed(2);
  };

  const handleCheckout = () => {
    alert('Redirection vers le paiement...');
  };

  if (!isCartOpen) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-medium text-gray-900">
              Panier
            </h2>
            {totalItems > 0 && (
              <span className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {totalItems > 0 && (
              <button onClick={clearCart}  className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Vider
              </button>
            )}
            <button onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full">
          {cartItems?.length === 0 ? (
            (<div className="flex-1 flex flex-col items-center mb-[10.75rem] justify-center p-6 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Icon name="ShoppingBag" size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Votre panier est vide
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Découvrez nos collections de montres
              </p>
              <button onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Continuer vos achats
              </button>
            </div>)
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {cartItems?.map((item) => (
                    <div key={item?._id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={`http://localhost:5000/restoreImages/${item?.image}`}
                            alt={`${item?.brand} ${item?.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 mb-1">
                              {item?.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                              {item?.brand}
                            </p>
                            <div className="text-base font-medium text-gray-900 mb-3">
                              {formatPrice(item?.price)} MAD
                            </div>

                            <div className="flex items-center space-x-3">
                              <button onClick={() => updateQuantity(item?._id, item?.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                <Icon name="Minus" size={14} />
                              </button>
                              <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                {item?.quantity}
                              </span>
                              <button onClick={() => updateQuantity(item?._id, item?.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                <Icon name="Plus" size={14} />
                              </button>
                            </div>
                          </div>
                          
                          <button  onClick={() => removeFromCart(item?._id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 ml-2"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(totalPrice?.toString())} MAD
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium text-gray-900">
                      Gratuite
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-green-600">
                    <Icon name="Check" size={12} />
                    <span>Livraison gratuite partout au maroc</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(totalPrice?.toString())} MAD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Finaliser la commande
                  </button>
                  
                  <button onClick={() => setIsCartOpen(false)}
                    className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors underline"
                  >
                    Continuer mes achats
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Icon name="Shield" size={12} />
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PanierSide;