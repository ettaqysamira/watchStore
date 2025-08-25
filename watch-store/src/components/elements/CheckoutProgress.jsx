import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const CheckoutProgress = ({ currentStep, onStepClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      label: 'Panier',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      description: 'Vérifiez vos articles'
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
      description: 'Commande confirmée'
    }
  ];

  const getCurrentStepFromPath = () => {
    const step = steps?.find(s => s?.path === location.pathname);
    return step ? step?.id : currentStep || 1;
  };

  const activeStep = getCurrentStepFromPath();

  const handleStepClick = (step) => {
    if (step?.id <= activeStep && onStepClick) {
      onStepClick(step?.id);
    } else if (step?.id <= activeStep) {
      navigate(step?.path);
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < activeStep) return 'completed';
    if (stepId === activeStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full bg-card border-b border-border/20 shadow-luxury-sm mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        {/* Desktop Progress */}
<div className="hidden md:block">
  <nav aria-label="Progress">
    <ol className="flex items-center justify-between gap-10">
      {steps?.map((step) => {
        const status = getStepStatus(step?.id);
        const isClickable = step?.id <= activeStep;

        return (
          <li key={step?.id} className="relative">
            <button
              onClick={() => handleStepClick(step)}
              disabled={!isClickable}
              className={`relative flex flex-col items-center p-3 h-auto ${
                isClickable
                  ? "cursor-pointer hover:bg-accent/5"
                  : "cursor-default"
              }`}
            >
              {/* Cercle étape */}
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  status === "completed"
                    ? "bg-success text-success-foreground shadow"
                    : status === "current"
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/20 shadow"
                    : "bg-muted text-muted-foreground"
                } ${isClickable ? "hover:scale-105" : ""}`}
              >
                {status === "completed" ? (
                  <Icon name="Check" size={14} />
                ) : (
                  <Icon name={step?.icon} size={14} />
                )}
              </span>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-body font-medium transition-colors duration-150 ${
                  status === "current"
                    ? "text-primary"
                    : status === "completed"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              >
                {step?.label}
              </span>

              {/* Description */}
              <span className="mt-1 text-[11px] text-muted-foreground font-caption text-center">
                {step?.description}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
</div>


        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-caption text-muted-foreground">
              Étape {activeStep} sur {steps?.length}
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              {Math.round((activeStep / steps?.length) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(activeStep / steps?.length) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                getStepStatus(activeStep) === 'completed'
                  ? 'bg-success text-success-foreground' :'bg-primary text-primary-foreground'
              }`}
            >
              <Icon name={steps?.[activeStep - 1]?.icon} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {steps?.[activeStep - 1]?.label}
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                {steps?.[activeStep - 1]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;