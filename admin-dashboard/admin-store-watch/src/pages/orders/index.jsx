import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../components/elements/HeaderDashboard';
import OrderStatusTable from './components/OrderStatusTable';
import OrderControl from './components/OrderControl';
import SideBar from '../../components/elements/SideBar';
import OrderStatistic from './components/OrderStatistic';
import LiveOrder from './components/LiveOrder';

const OrderDashboard = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: '7days',
    fulfillmentCenter: 'all'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const formatLastUpdated = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  

  return (
    <div className="min-h-screen bg-background">
      <HeaderDashboard />
      <SideBar />
      <main className="lg:ml-60 pt-16 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Commandes Dashboard</h1>
               
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Dernière update: {formatLastUpdated(lastUpdated)}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <OrderControl onFiltersChange={handleFiltersChange} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-8">
              <OrderStatistic />
            </div>
             <div className="lg:col-span-4">
              <LiveOrder />
            </div>
            
          </div>

          <div className="mb-8">
            <OrderStatusTable />
          </div>

         

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Bijoux By Dox. Tous droits réservés.</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Data refresh: toutes les 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDashboard;