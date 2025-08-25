import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/elements/Header';
import CheckoutProgress from '../../components/elements/CheckoutProgress';
import OrderHeader from './components/OrderHeader';
import OrderInfo from './components/OrderInfo';
import DeliveryInfo from './components/DeliveryInfo';
import ActionButtons from './components/ActionButtons';

const OrderConfirmation = () => {
  const location = useLocation();
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = id || location.state?.orderId;
        if (!orderId) {
          console.error("Aucun ID de commande fourni");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);

        if (!res.ok) throw new Error("Erreur API lors de la récupération de la commande");

        const data = await res.json();
        setOrderData(data);

        localStorage.removeItem('bijoux_cart');
      } catch (err) {
        console.error("Erreur fetch:", err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchOrder();
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <CheckoutProgress currentStep={3} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground font-body">
                Chargement des détails de commande...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 text-center">
          <CheckoutProgress currentStep={3} />
          <p className="text-red-500 font-body mt-6">
            Impossible de récupérer les détails de la commande.
          </p>
        </div>
      </div>
    );
  }

  const subtotal = orderData?.items?.reduce(
    (sum, item) => sum + (item?.price * item?.quantity),
    0
  ) || 0;

  const deliveryPrice = orderData?.deliveryDetails?.price || 0;
  const total = subtotal + deliveryPrice;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <CheckoutProgress currentStep={3} />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
                        
             <OrderHeader  orderNumber={orderData?.orderNumber} 
              orderDate={new Date(orderData?.createdAt).toLocaleDateString("fr-FR")}
            />

            <OrderInfo 
              orderItems={orderData?.items}
              subtotal={subtotal}
              deliveryPrice={deliveryPrice}
              total={total}
            />

           <DeliveryInfo 
            deliveryDetails={orderData?.deliveryDetails || { label: "Standard", price: 0 }}
            customerInfo={orderData?.customer}
            orderDate={orderData?.createdAt}
          />
            <ActionButtons orderNumber={orderData?._id} />
          </div>
        </main>
      </div>
      <footer className="bg-card border-t border-border/20 mt-8">
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

export default OrderConfirmation;
