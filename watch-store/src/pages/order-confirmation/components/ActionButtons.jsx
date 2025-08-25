import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/elements/Button';

const ActionButtons = ({ orderNumber }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handlePrintOrder = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default" onClick={handleContinueShopping} iconName="ArrowLeftToLine" iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Continuer les Achats
        </Button>
          <Button
            variant="ghost" size="sm" onClick={handlePrintOrder} iconName="Printer" iconPosition="left"
          >
            Imprimer la commande
          </Button>
        
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-caption mb-3">
          Découvrez nos autres services
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="ghost" size="sm" onClick={() => navigate('/collections')}
            className="text-xs"
          >
            Collections
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/contact')}
            className="text-xs"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;