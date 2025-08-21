import React from 'react';

const CartHeader = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: "Panier" },
    { id: 2, label: "Livraison" },
    { id: 3, label: "Confirmation" },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="bg-card border-b border-border/20 shadow-luxury-sm pt-16 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Version Desktop */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center space-x-80">
            {steps.map((step) => {
              const status = getStepStatus(step.id);

              return (
                <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-medium text-sm transition-all duration-300 ${
                      status === "completed"
                        ? "bg-[#005830] text-white"
                        : status === "current"
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`font-body font-medium text-sm transition-colors ${
                      status === "current"
                        ? "text-primary"
                        : status === "completed"
                        ? "text-[#005830]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>


        {/* Version Mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-center mb-3">
            <span className="text-sm font-caption text-muted-foreground">
              Étape {currentStep} sur {steps.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                getStepStatus(currentStep) === "completed"
                  ? "bg-[#005830] text-white"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {currentStep}
            </div>
            <span className="text-base font-medium text-foreground">
              {steps[currentStep - 1]?.label}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartHeader;
