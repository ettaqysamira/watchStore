import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryInfosHeader from './components/DeliveryInfosHeader';
import DeliveryForm from './components/DeliveryForm';
import OrderSummaryCard from './components/OrderSummaryCard';
import Header from '../../components/elements/Header';
import Icon from '../../components/Icon';
import Button from '../../components/elements/Button';
import { useCart } from '../../components/elements/PanierSide';

const DeliveryInformationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');

 const {
     cartItems,
     updateQuantity,
     removeFromCart,
     getTotalItems,
   } = useCart();

  const cartCount = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
     if (cartItems?.length === 0) {
      navigate('/shopping-cart');
    }
  }, [cartItems?.length, navigate]);

const handleFormSubmit = async (formData) => {
  setIsLoading(true);

  try {
    const totalAmount =
      cartItems?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) +
      (formData?.deliveryOption === "express" ? 50 : formData?.deliveryOption === "premium" ? 100 : 0);

    const items = cartItems.map(item => ({
      product: item._id,        
      name: item.name,         
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      id: `CMD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: formData,
      items,
      deliveryOption: formData.deliveryOption,
      totalAmount,             
      status: "confirmed",
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Erreur API lors de la création de commande");
    }

    const savedOrder = await response.json();

    localStorage.setItem("currentOrder", JSON.stringify(savedOrder));
    localStorage.removeItem("cartItems");
    navigate("/order-confirmation");
  } catch (error) {
    console.error("Order submission failed:", error);
  } finally {
    setIsLoading(false);
  }
};



  const handleBackToCart = () => {
    navigate('/shopping-cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      <DeliveryInfosHeader currentStep={2} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost" onClick={handleBackToCart} iconName="ArrowLeft" iconPosition="left" size="sm"
          >
            Retour au Panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DeliveryForm 
              onSubmit={handleFormSubmit} isLoading={isLoading}
            />
            
            <div className="lg:hidden mt-6">
              <OrderSummaryCard
                cartItems={cartItems} deliveryOption={deliveryOption}
                isCollapsed={isSummaryCollapsed} onToggleCollapse={setIsSummaryCollapsed}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="space-y-6">
              <OrderSummaryCard
                cartItems={cartItems} deliveryOption={deliveryOption}
              />
              
              <Button
                variant="outline" onClick={handleBackToCart} iconName="ArrowLeft" iconPosition="left" fullWidth
              >
                Retour au Panier
              </Button>

              <div className="bg-card border border-border/20 rounded-lg p-6 shadow-luxury-sm">
                <h3 className="font-body font-medium text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span>Garanties & Sécurité</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Lock" size={16} className="text-success mt-1" />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">
                        Paiement Sécurisé SSL
                      </p>
                      <p className="text-xs text-muted-foreground font-caption">
                        Vos données sont protégées par cryptage 256-bit
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Award" size={16} className="text-primary mt-1" />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">
                        Certificat d'Authenticité
                      </p>
                      <p className="text-xs text-muted-foreground font-caption">
                        Chaque bijou est accompagné de son certificat
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="RotateCcw" size={16} className="text-accent mt-1" />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">
                        Retour Gratuit 30 Jours
                      </p>
                      <p className="text-xs text-muted-foreground font-caption">
                        Satisfait ou remboursé sans condition
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Headphones" size={16} className="text-warning mt-1" />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">
                        Support Client 24/7
                      </p>
                      <p className="text-xs text-muted-foreground font-caption">
                        Une équipe dédiée à votre service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card border border-border/20 rounded-lg p-8 shadow-luxury text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Traitement de votre commande
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                Veuillez patienter pendant que nous finalisons votre commande...
              </p>
            </div>
          </div>
        )}
      </main>

    <footer className="bg-card border-t border-border/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/public/images/bijoux-by-dox.png" alt="bijoux-by-dox" className="w-52 h-auto"/>
          </div>
          <p className="text-muted-foreground font-caption text-sm">
            © {new Date()?.getFullYear()} Bijoux by Dox. Tous droits réservés. | 
            Montres authentiques et service premium.
          </p>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default DeliveryInformationForm;