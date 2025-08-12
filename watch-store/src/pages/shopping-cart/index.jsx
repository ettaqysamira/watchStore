import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/elements/Header';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import ResumeCommande from './components/ResumeCommande';
import DivNavigation from '../../components/elements/DivNavigation';
import { useCart } from '../../components/elements/PanierSide';

const ShoppingCart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
  } = useCart();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    updateQuantity(productId, newQuantity);
    setIsUpdating(false);
  };

  const handleRemoveItem = async (productId) => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    removeFromCart(productId);
    setIsUpdating(false);
  };

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate('/delivery-information');
    setIsProcessing(false);
  };

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = getTotalItems();

  if (!cartItems) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItems} onCartClick={handleCartClick} />
      <div className="pt-4">
        <CartHeader itemCount={totalItems} isLoading={false} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cartItems.length === 0 ? (
            <div className="max-w-2xl mx-auto">
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <CartItem key={item._id} item={item} onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem} isUpdating={isUpdating}
                    />
                  ))}
                </div>

                <div className="lg:hidden mt-8">
                  <ResumeCommande cartItems={cartItems} isProcessing={isProcessing} onProceedToCheckout={handleProceedToCheckout}
                  />
                </div>

                <div className="mt-8">
                  <DivNavigation showContinueShopping={true} showBackToCart={false}
                    className="lg:max-w-md"
                  />
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-1">
                <ResumeCommande cartItems={cartItems} isProcessing={isProcessing} onProceedToCheckout={handleProceedToCheckout}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;