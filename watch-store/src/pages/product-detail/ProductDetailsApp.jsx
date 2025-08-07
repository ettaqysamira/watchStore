import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/elements/Header';
import Icon from '../../components/Icon';
import Button from '../../components/elements/Button';
import Similar from './components/Similar';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailsApp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProductImageGallery product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        );
      
    }
  };

 useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/watches/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!product) return <div className="text-center py-20">Produit non trouvé</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 lg:pt-28">
        <div className="bg-warm-canvas/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/homepage" className="text-clear-hierarchy hover:text-accent transition-colors duration-micro">
                Accueil
              </a>
              <Icon name="ChevronRight" size={16} className="text-border" />
              <a href="/product-detail" className="text-clear-hierarchy hover:text-accent transition-colors duration-micro">
                Collections
              </a>
              <Icon name="ChevronRight" size={16} className="text-border" />
              <span className="text-clear-hierarchy">{product.brand}</span>
              <Icon name="ChevronRight" size={16} className="text-border" />
              <span className="text-comfortable-reading font-cta font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className={`sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-smooth ${
          isSticky ? 'shadow-luxury' : ''
        }`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
              {isSticky && (
                <div className="flex items-center space-x-3">
                  <div className="hidden lg:flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-headline font-semibold text-comfortable-reading">
                        {new Intl.NumberFormat('fr-MA', {style: 'currency', currency: 'MAD',minimumFractionDigits: 0}).format(product.price)}
                      </p>
                      <p className="text-sm text-clear-hierarchy">{product.brand} {product.name}</p>
                    </div>
                  </div>
                  
                  <Button variant="default" size="sm" iconName="ShoppingBag" iconPosition="left"
                    className="bg-accent text-accent-foreground hover:bg-elegant-urgency shadow-luxury"
                  >
                    <span className="hidden sm:inline">Ajouter au panier</span>
                    <span className="sm:hidden">Ajouter</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
       

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          {renderTabContent()}
        </div>
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-luxury flex items-center justify-center transition-all duration-smooth hover:bg-elegant-urgency hover:scale-110 z-40 ${
            isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Retour en haut"
        >
          <Icon name="ArrowUp" size={20} />
        </button>

        <div className="fixed bottom-6 left-6 z-40">
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            className="bg-confident-confirmation text-white hover:bg-confident-confirmation/90 shadow-luxury animate-pulse"
          >
            <span className="hidden sm:inline">Expert WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </Button>
        </div>
      </main>

      <div className="bg-warm-canvas/50 border-t border-accent/10">
  <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center text-center">
      
      <div className="flex flex-col items-center space-y-2">
        <Icon name="Truck" size={32} className="text-clear-hierarchy" />
        <h3 className="font-cta font-medium text-comfortable-reading">
          Livraison assurée
        </h3>
        <p className="text-sm text-clear-hierarchy">
          Livraison partout au Maroc
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Icon name="MessageCircleReply" size={32} className="text-clear-hierarchy" />
        <h3 className="font-cta font-medium text-comfortable-reading">
          Support 7j/7, réponse en 24h
        </h3>
        <p className="text-sm text-clear-hierarchy">
          Assistance dédiée, réponse sous 24h
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Icon name="CreditCard" size={32} className="text-confident-confirmation" />
        <h3 className="font-cta font-medium text-comfortable-reading">
          Paiement sécurisé
        </h3>
        <p className="text-sm text-clear-hierarchy">
          Paiement à la livraison
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Icon name="ShieldCheck" size={32} className="text-confident-confirmation" />
        <h3 className="font-cta font-medium text-comfortable-reading">
          Garantie nationale
        </h3>
        <p className="text-sm text-clear-hierarchy">
          Service après-vente assuré
        </p>
      </div>

    </div>
  </div>
</div>

        <div className='max-w-7xl mx-auto lg:px-8 py-8'>
           <Similar brand={product.brand} price={product.price} excludeId={product._id}/>
        </div>
      <footer className="bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <img src="/images/bijoux-by-dox-logo.png" alt="logo-bijoux-by-dox" />
            </div>
            
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
              Exprimez votre personnalité à travers des modèles uniques, où chaque détail reflète l'élégance
              et l'authenticité, Chaque pièce incarne une alliance parfaite entre l'élégance horlogère et la modernité, pour celles et ceux qui considèrent le temps comme un symbole de distinction.
            </p>
            
            <div className="flex items-center justify-center space-x-6 pt-6">
              <a href="/homepage" className="text-secondary-foreground/60 hover:text-accent transition-colors duration-micro">
                Accueil
              </a>
              <a href="/product-detail" className="text-secondary-foreground/60 hover:text-accent transition-colors duration-micro">
                Collections
              </a>
              <a href="/about" className="text-secondary-foreground/60 hover:text-accent transition-colors duration-micro">
                À Propos
              </a>
              <a href="/contact" className="text-secondary-foreground/60 hover:text-accent transition-colors duration-micro">
                Contact
              </a>
            </div>
            
            <div className="border-t border-secondary-foreground/20 pt-6">
              <p className="text-sm text-secondary-foreground/60">
                © {new Date().getFullYear()} Bijoux By Dox. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailsApp;