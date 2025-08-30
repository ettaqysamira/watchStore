import React from 'react';
import Icon from '../../../../../../watch-store/src/components/Icon';

const OrderCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-[#1a365d] text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'shipp':
        return 'bg-[#7C3AED] text-primary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
       
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default OrderCard;