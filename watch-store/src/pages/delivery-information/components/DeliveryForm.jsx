import React, { useState } from 'react';
import Button from '../../../components/elements/Button';
import Input from '../../../../../admin-dashboard/admin-store-watch/src/components/elements/Input';
import Select from '../../../../../admin-dashboard/admin-store-watch/src/components/elements/Select';
import { CheckBox } from '../../../../../admin-dashboard/admin-store-watch/src/components/elements/CheckBox';
import Icon from '../../../components/Icon';
const DeliveryForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryOption: 'standard',
    saveInfo: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const deliveryOptions = [
    {
      id: 'standard',
      label: 'Paiement à la livraison',
      description: 'Livraison partout au Maroc',
      price: 0,
      icon: 'Truck'
    },

  ];

  const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value?.trim()?.length < 2 ? 'Le prénom doit contenir au moins 2 caractères' : '';
      case 'lastName':
        return value?.trim()?.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'phone':
  return !phoneRegex.test(value?.replace(/\s/g, ''))
    ? 'Numéro de téléphone invalide (ex: 0612345678)'
    : '';

case 'email':
  return !emailRegex.test(value)
    ? 'Adresse email invalide'
    : '';
      case 'address':
        return value?.trim()?.length < 10 ? 'L\'adresse doit contenir au moins 10 caractères' : '';
      case 'city':
        return !value ? 'Veuillez sélectionner votre ville' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched?.[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData?.[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
  const newErrors = {};
  const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'address', 'city', 'postalCode'];
    
    requiredFields?.forEach(field => {
      const error = validateField(field, formData?.[field]);
      if (error) newErrors[field] = error;
    });

    if (formData?.deliveryOption === 'premium' && 
        !['casablanca', 'rabat']?.includes(formData?.city)) {
      newErrors.deliveryOption = 'La livraison premium n\'est disponible qu\'à Casablanca et Rabat';
    }

    setErrors(newErrors);
    setTouched(Object.fromEntries(requiredFields?.map(field => [field, true])));

    if (Object.keys(newErrors)?.length === 0) {
      onSubmit(formData);
    }
  };

  const isPremiumAvailable = ['casablanca', 'rabat']?.includes(formData?.city);

  return (
    <div className="bg-card border border-border/20 rounded-lg shadow-luxury">
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={24} className="text-primary" />
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Informations de Livraison
          </h2>
        </div>
        <p className="text-muted-foreground font-body text-sm mt-2">
          Veuillez remplir vos informations pour finaliser votre commande
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
            <Icon name="UserCircle" size={20} />
            <span>Informations Personnelles</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom" type="text" placeholder="Votre prénom" value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              onBlur={() => handleBlur('firstName')} error={errors?.firstName} required className="w-full"
            />
            
            <Input 
              label="Nom" type="text" placeholder="Votre nom"
              value={formData?.lastName} onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              onBlur={() => handleBlur('lastName')} error={errors?.lastName} required  className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Téléphone" type="tel" placeholder="+212XXXXXXXXX"
              value={formData?.phone} onChange={(e) => handleInputChange('phone', e?.target?.value)}
              onBlur={() => handleBlur('phone')} error={errors?.phone} required  className="w-full"
            />
            
            <Input
              label="Email" type="email" placeholder="votre@gmail.com"
              value={formData?.email} onChange={(e) => handleInputChange('email', e?.target?.value)}
              onBlur={() => handleBlur('email')} error={errors?.email} required className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={20} />
            <span>Adresse de Livraison</span>
          </h3>
          
          <Input 
            label="Adresse Complète" type="text" placeholder="Numéro, rue, quartier..."
            value={formData?.address} onChange={(e) => handleInputChange('address', e?.target?.value)}
            onBlur={() => handleBlur('address')} error={errors?.address}
            description="Incluez le numéro, nom de rue et quartier" required  className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="city" className="font-body text-sm text-foreground mb-1">
              Ville <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              id="city" type="text" value={formData?.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Entrez votre ville"
              className="w-full"
              required
            />
            {errors?.city && (
              <span className="text-red-500 text-xs mt-1">{errors.city}</span>
            )}
          </div>
        </div>

        </div>
        <div className="space-y-4">
          <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
            <Icon name="Truck" size={20} />
            <span>Options de Livraison</span>
          </h3>
          
          {errors?.deliveryOption && (
            <div className="bg-error/10 border border-error/20 rounded-md p-3">
              <p className="text-error text-sm font-body">{errors?.deliveryOption}</p>
            </div>
          )}
          
          <div className="space-y-3">
            {deliveryOptions?.map((option) => {
              const isDisabled = option?.id === 'premium' && !isPremiumAvailable;
              
              return (
                <label
                  key={option?.id}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                    formData?.deliveryOption === option?.id
                      ? 'border-primary bg-primary/5'
                      : isDisabled
                      ? 'border-border/20 bg-muted/50 cursor-not-allowed opacity-60' :'border-border/20 hover:border-border/40 hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"name="deliveryOption" value={option?.id} checked={formData?.deliveryOption === option?.id}
                      onChange={(e) => handleInputChange('deliveryOption', e?.target?.value)}
                      disabled={isDisabled}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData?.deliveryOption === option?.id
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {formData?.deliveryOption === option?.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <Icon name={option?.icon} size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {option?.label}
                      </p>
                      <p className="text-sm text-muted-foreground font-caption">
                        {option?.description}
                      </p>
                      {isDisabled && option?.id === 'premium' && (
                        <p className="text-xs text-warning font-caption mt-1">
                          Non disponible pour cette ville
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

          <div className="space-y-4">
          <div className="space-y-3">
            <CheckBox
              label="Sauvegarder mes informations pour les prochaines commandes"
              checked={formData?.saveInfo}
              onChange={(e) => handleInputChange('saveInfo', e?.target?.checked)}
            />
            
          </div>
        </div>

        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-success mb-1">
                Commande Sécurisée
              </h4>
              <p className="text-sm text-muted-foreground font-caption">
                Vos informations sont protégées.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit" variant="default" size="lg" loading={isLoading}
            iconName="CreditCard" iconPosition="left" fullWidth  className="h-12"
          >
            {isLoading ? 'Traitement en cours...' : 'Confirmer la Commande'}
          </Button>
          
          <p className="text-xs text-muted-foreground font-caption text-center mt-3">
            En confirmant, vous acceptez nos conditions de vente et notre politique de confidentialité
          </p>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;