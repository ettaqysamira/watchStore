import React from 'react';
import Icon from '../../../components/Icon';

const CartHeader = ({ itemCount = 0, isLoading = false }) => {
  return (
    <div className="bg-card border-b border-border/20 shadow-luxury-sm pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mt-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#005830] text-primary-foreground rounded-full flex items-center justify-center">
                <span className="font-mono font-medium text-sm">1</span>
              </div>
              <span className="font-body font-medium text-sm text-black">Panier</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-border/20">
              <div className="h-full bg-primary w-0 transition-all duration-300" />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                <span className="font-mono font-medium text-sm">2</span>
              </div>
              <span className="font-body font-medium text-sm text-muted-foreground">Livraison</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-border/20">
              <div className="h-full bg-border/20 w-0 transition-all duration-300" />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
                <span className="font-mono font-medium text-sm">3</span>
              </div>
              <span className="font-body font-medium text-sm text-muted-foreground">Confirmation</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          
        </div>

       
        
      </div>
    </div>
  );
};

export default CartHeader;