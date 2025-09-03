import React, { useState, useEffect } from 'react';
import Icon from '../../../../../../watch-store/src/components/Icon';
import Button from '../../../../../../watch-store/src/components/elements/Button';
import Select from '../../../components/elements/Select';

const OrderControl = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: '7days',
    fulfillmentCenter: 'all'
  });
  const [autoRefresh, setAutoRefresh] = useState('5min');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch orders depuis l’API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Erreur fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' }
  ];

  const dateRangeOptions = [
    { value: '1day', label: 'Dernières 24 heures' },
    { value: '7days', label: 'Derniers 7 jours' },
    { value: '30days', label: 'Derniers 30 jours' },
    { value: '90days', label: 'Derniers 90 jours' },
  ];


  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log('Exporting order data with filters:', filters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all').length;
  };

  const today = new Date();
  const isToday = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const todayOrders = orders.filter(o => isToday(o.createdAt || o.orderDate));

  const totalOrders = todayOrders.length;
  const inProgress = todayOrders.filter(o => o.status === 'processing' || o.status === 'processing').length;
  const shipped = todayOrders.filter(o => o.status === 'shipped').length;
  const delivered = todayOrders.filter(o => o.status === 'delivered').length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtres:</span>
            {getActiveFiltersCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>

          <Select
            options={statusOptions} value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Auto-refresh:</span>
            
          </div>

          <Button
            variant="outline" size="sm" onClick={handleRefresh} loading={isRefreshing} iconName="RefreshCw"
          >
            Refresh
          </Button>

          <Button
            variant="outline" size="sm" onClick={handleExport} iconName="Download"
          >
            Export
          </Button>

          <div className="relative">
            <Icon 
              name="Search" size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text" placeholder="Rechercher des commandes…"
              className="pl-10 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <Select
          options={dateRangeOptions} value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          className="w-40"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{totalOrders}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-yellow-600">{inProgress}</p>
            <p className="text-xs text-muted-foreground">Processing</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">{shipped}</p>
            <p className="text-xs text-muted-foreground">Shipped</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{delivered}</p>
            <p className="text-xs text-muted-foreground">Delivered aujourd’hui</p>
          </div>
        </div>
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Filtres actifs :</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value === 'all') return null;

                const getFilterLabel = (key, value) => {
                  const option = {
                    status: statusOptions,
                    dateRange: dateRangeOptions,
                  }[key]?.find(opt => opt.value === value);

                  return option ? `${key}: ${option.label}` : `${key}: ${value}`;
                };

                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {getFilterLabel(key, value)}
                    <button
                      onClick={() => handleFilterChange(key, 'all')}
                      className="ml-1 hover:text-blue-600"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
               
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderControl;
