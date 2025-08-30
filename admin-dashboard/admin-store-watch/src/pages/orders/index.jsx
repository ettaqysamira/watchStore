import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../components/elements/HeaderDashboard';
import OrderStatusTable from './components/OrderStatusTable';
import OrderControl from './components/OrderControl';
import SideBar from '../../components/elements/SideBar';
import OrderStatistic from './components/OrderStatistic';
import LiveOrder from './components/LiveOrder';
import OrderCard from './components/OrderCard';

const OrderDashboard = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: '7days',
    fulfillmentCenter: 'all'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Erreur récupération commandes:", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 60000); 
    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const formatLastUpdated = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length
  };

  
  const metricsData = [
    {
      title: 'Total Orders',
      value: stats.total,
      subtitle: 'Toutes les commandes',
      icon: 'ShoppingCart',
      color: 'warning'
    },
    {
      title: 'Processing',
      value: stats.processing,
      subtitle: 'En cours de traitement',
      icon: 'Clock',
      color: 'primary'
    },
    {
      title: 'Shipped',
      value: stats.shipped,
      subtitle: 'Expédiées',
      icon: 'Truck',
      color: 'shipp'
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      subtitle: 'Commandes livrées',
      icon: 'CheckCircle',
      color: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderDashboard />
      <SideBar />
      <main className="lg:ml-60 pt-16 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-foreground">Commandes Dashboard</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Dernière update: {formatLastUpdated(lastUpdated)}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <OrderControl onFiltersChange={handleFiltersChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <OrderCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-8">
              <OrderStatistic filters={filters} />
            </div>
            <div className="lg:col-span-4">
              <LiveOrder />
            </div>
          </div>

          <OrderStatusTable />

          <div className="mt-12 pt-8 border-t border-border flex justify-between text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Bijoux By Dox. Tous droits réservés.</p>
            <span>Data refresh: toutes les 1 minute</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDashboard;
