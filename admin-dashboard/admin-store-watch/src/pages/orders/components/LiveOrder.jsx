import React, { useState, useEffect } from 'react';
import Icon from '../../../../../../watch-store/src/components/Icon';

const LiveOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();

        const latestOrders = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setOrders(latestOrders);
      } catch (err) {
        console.error("Erreur fetch orders:", err);
      }
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'received': return 'Package';
      case 'processing': return 'Clock';
      case 'shipped': return 'Truck';
      case 'delivered': return 'CheckCircle';
      default: return 'Package';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Commandes en direct</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {orders.map((order) => (
          <div key={order._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(order.status)}`}>
              <Icon name={getStatusIcon(order.status)} size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {order.customer?.firstName} {order.customer?.lastName}
                </p>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name="Flag" 
                    size={12} 
                    className={getPriorityColor(order.priority || "normal")}
                  />
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(order.createdAt)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-1">
                {order.orderNumber}
              </p>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {order.totalAmount  || "--"} DH
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {orders.length} Dernières Commandes
          </span>
          <button className="text-primary hover:text-primary/80 font-medium" 
           onClick={() => {
            const table = document.getElementById("tableCommande");
            if (table) {
              table.scrollIntoView({ behavior: "smooth" });
            }
          }}
          >
            Voir Toutes les Commandes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveOrder;
