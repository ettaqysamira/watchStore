import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../components/elements/HeaderDashboard';
import StatistiqueStockCard from './components/StatistiqueStockCard';
import StockTableau from './components/StockTableau';
import FilterProducts from './components/FilterProducts';
import Icon from '../../../../../watch-store/src/components/Icon';
import SideBar from '../../components/elements/SideBar';

const GestionStockApp = () => {
  const [filters, setFilters] = useState({
    search: '',
    stockStatus: 'all',
    categories: [],
    brands: [],
    sortBy: 'name',
    lowStockOnly: false,
    includeOutOfStock: false,
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const statisticCard = [
     {
    title: "Montres en Stock",
    value: "2,800",
    subtitle: "Produits disponibles",
    icon: "CheckCircle",
    trend: "up",
    trendValue: "+8%",
    colorClass: "text-success"
  },
    {
      title: "Montres en Rupture",
      value: "120",
      subtitle: "Produits hors stock",
      icon: "AlertTriangle",
      trend: "up",
      trendValue: "-10%",
      colorClass: "text-accent"
    },
    {
  title: "Montres en Promotion",
  value: "60",
  subtitle: "Offres en cours",
  icon: "Tag",
  trend: "down",
  trendValue: "-3%",
  colorClass: "text-warning"
},

    {
      title: "Nouveaux Montres",
      value: "12",
      subtitle: "Ajoutés ce mois-ci",
      icon: "PlusCircle",
      trend: "up",
      trendValue: "+15%",
      colorClass: "text-success"
    }
  ];

  const categoryOptions = [
    { value: "Homme", label: "Homme" },
    { value: "Femme", label: "Femme" },
  ];

  const brandOptions = [
    { value: "rolex", label: "Rolex" },
    { value: "guess", label: "Guess" },
    { value: "casio", label: "Casio" },
    { value: "chanel", label: "Chanel" },
    { value: "apple", label: "Apple" },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      stockStatus: 'all',
      categories: [],
      brands: [],
      sortBy: 'name',
      lowStockOnly: false,
      includeOutOfStock: false,
    });
  };

  const handleExportReport = () => {
    console.log('Exporting inventory report...');
  };

  const handleEditProduct = (productId, values) => {
    console.log('Editing product:', productId, values);
  };

  const handleBulkAction = (action, productIds) => {
    console.log('Bulk action:', action, productIds);
  };

  const handleSort = (key, direction) => {
    console.log('Sorting by:', key, direction);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderDashboard />
      <SideBar />
      <main className="lg:ml-60 pt-16 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestion de Stock</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Dernière mise à jour : {lastUpdated.toLocaleTimeString()}</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statisticCard.map((metric, index) => (
              <StatistiqueStockCard key={index} {...metric} />
            ))}
          </div>

          <FilterProducts filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} onReset={handleResetFilters}
            onExport={handleExportReport} categoryOptions={categoryOptions} brandOptions={brandOptions}
          />

          <StockTableau onEdit={handleEditProduct} onBulkAction={handleBulkAction} onSort={handleSort}/>
        </div>
      </main>
    </div>
  );
};

export default GestionStockApp;
