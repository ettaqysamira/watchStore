import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon';
import Button from '../../../components/elements/Button';
const DeliveryInfosHeader = ({ currentStep = 2 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      label: 'Panier',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      description: 'Vérification des articles'
    },
    {
      id: 2,
      label: 'Livraison',
      path: '/delivery-information',
      icon: 'Truck',
      description: 'Informations de livraison'
    },
    {
      id: 3,
      label: 'Confirmation',
      path: '/order-confirmation',
      icon: 'CheckCircle',
      description: 'Commande finalisée'
    }
  ];

  const handleStepClick = (step) => {
    if (step?.id < currentStep) {
      navigate(step?.path);
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full bg-card border-b border-border/20 shadow-luxury-sm mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="hidden md:block">
        <nav aria-label="Progression de commande">
          <ol className="flex items-center justify-between gap-10">
            {steps?.map((step, stepIdx) => {
              const status = getStepStatus(step?.id);
              const isClickable = step?.id < currentStep;

              return (
                <li key={step?.id} className="relative ">
                  <Button
                    variant="ghost"
                    onClick={() => handleStepClick(step)}
                    disabled={!isClickable}
                    className={`relative flex flex-col items-center p-3 h-auto ${
                      isClickable ? 'cursor-pointer hover:bg-accent/5' : 'cursor-default'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                        status === 'completed'
                          ? 'bg-success text-success-foreground shadow'
                          : status === 'current'
                            ? 'bg-primary text-primary-foreground ring-2 ring-primary/20 shadow'
                            : 'bg-muted text-muted-foreground'
                      } ${isClickable ? 'hover:scale-105' : ''}`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={14} />
                      ) : (
                        <Icon name={step?.icon} size={14} />
                      )}
                    </span>

                    <span
                      className={`mt-2 text-xs font-body font-medium transition-colors duration-150 ${
                        status === 'current'
                          ? 'text-primary'
                          : status === 'completed'
                            ? 'text-success'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step?.label}
                    </span>

                    <span className="mt-1 text-[11px] text-muted-foreground font-caption text-center">
                      {step?.description}
                    </span>
                  </Button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

        <div className="md:hidden">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm font-caption text-muted-foreground">
              Étape {currentStep} sur {steps?.length}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps?.length) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                getStepStatus(currentStep) === 'completed'
                  ? 'bg-success text-success-foreground' :'bg-primary text-primary-foreground'
              } shadow-lg`}
            >
              <Icon name={steps?.[currentStep - 1]?.icon} size={24} />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {steps?.[currentStep - 1]?.label}
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                {steps?.[currentStep - 1]?.description}
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfosHeader;