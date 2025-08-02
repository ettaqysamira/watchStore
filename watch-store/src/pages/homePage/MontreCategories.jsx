import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
const MontreCategories = () => {
  const [activeCollection, setActiveCollection] = useState('homme');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRefs = {
    homme: useRef(null),
    femme: useRef(null),
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const collections = {
    homme: {
      title: "COLLECTION HOMME",
      subtitle: "L'élégance masculine et l'art du détail",
      icon: "Watch",
      products: [
        {
          id: 1,
          brand: "Rolex",
          model: "Rolex Submariner Date Homme",
          price: "200",
          originalPrice: "195",
          image: "https://m.media-amazon.com/images/I/61el+rhavSL._AC_SL1120_.jpg",
          isNew: true,
        },
        {
          id: 2,
          brand: "Guess",
          model: "Guess Atlas Homme",
          price: "300",
          image: "https://images-cdn.ubuy.co.in/657083a8987ecb56901ad01d-watch-guess-men-39-s-legacy-watch.jpg",
          
        },
      
      ]
    },
    femme: {
      title: "COLLECTION FEMME",
      subtitle: "L'élégance féminine et l'art du détail",
      icon: "Gem",
      products: [
        {
          id: 7,
          brand: "Rolex",
          model: "Rolex Submariner Date Femme",
          price: "899",
          image: "https://cdn11.bigcommerce.com/s-bc02e/images/stencil/1280x1280/products/46023/124578/rolex-datejust-steel-yellow-gold-silver-diamond-dial-ladies-watch-69173-30009_330e8__34752__58979__76106.1718214657.jpg?c=2",
          isNew: true,
        },
        {
          id: 8,
          brand: "Guess",
          model: "Guess Doré Femme",
          price: "459,00",
          image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600,h_600/https://montrex.ma/wp-content/uploads/2024/02/montre-femme-gs-lxw0826l2.png",
        },
       
        
      ]
    },
  
  };

  const scroll = (collection, direction) => {
    const ref = scrollRefs[collection].current;
    if (ref) {
      const scroller = 320;
      ref.scrollBy({
        left: direction === 'left' ? -scroller : scroller,
        behavior: 'smooth'
      });
    }
  };

  const getNewProduct = (product) => {
    if (product.isNew) return { text: "Nouveauté", icon: "Sparkles", color: "accent" };
    return null;
  };

  const ProductCard = ({ product, isMobileView = false }) => {
    const badge = getNewProduct(product);
    
    return (
      <div className={`group ${isMobileView ? 'w-full' : 'flex-shrink-0 w-80'}`}>
        <div className="luxury-card p-4 md:p-6 h-full relative overflow-hidden">
          
          {badge && (
            <div className={`absolute ${isMobileView ? 'top-5 left-5' : 'top-4 md:top-8 left-4 md:left-8'} z-10 bg-${badge.color}/10 border border-${badge.color}/20 rounded-full ${isMobileView ? 'px-1.5 py-0.5' : 'px-2 md:px-3 py-1'}`}>
              <div className="flex items-center space-x-1">
                <Icon name={badge.icon} size={isMobileView ? 10 : 12} className={`text-${badge.color}`} />
                <span className={`${isMobileView ? 'text-[8px]' : 'text-xs'} font-cta font-medium text-${badge.color}`}>
                  {badge.text}
                </span>
              </div>
            </div>
          )}

          {product.originalPrice && (
  <div className={`absolute ${isMobileView ? 'top-5 right-5' : 'top-4 md:top-8 right-4 md:right-8'} 
    z-10 bg-warm-concern text-pure-clarity rounded-full ${isMobileView ? 'px-1.5 py-0.5' : 'px-2 py-1'} flex items-center justify-center`}>
    <span className={`${isMobileView ? 'text-[8px]' : 'text-xs'} font-cta font-medium`}>
      {Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)}%
    </span>
  </div>
)}


          <div className={`relative ${isMobileView ? 'mb-3' : 'mb-4 md:mb-6'} overflow-hidden rounded-lg bg-subtle-elevation`}>
            <div className="aspect-square">
              <img
                src={product.image}
                alt={`${product.brand} ${product.model}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-smooth"
              />
            </div>
            
            <div className="absolute inset-0 bg-sophisticated-depth/0 group-hover:bg-sophisticated-depth/20 transition-all duration-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <button className={`${isMobileView ? 'w-7 h-7' : 'w-8 h-8 md:w-10 md:h-10'} bg-pure-clarity rounded-full flex items-center justify-center text-comfortable-reading hover:bg-accent hover:text-accent-foreground transition-all duration-micro`}>
                  <Icon name="Eye" size={isMobileView ? 12 : 14} />
                </button>
                <button className={`${isMobileView ? 'w-7 h-7' : 'w-8 h-8 md:w-10 md:h-10'} bg-pure-clarity rounded-full flex items-center justify-center text-comfortable-reading hover:bg-accent hover:text-accent-foreground transition-all duration-micro`}>
                  <Icon name="Heart" size={isMobileView ? 12 : 14} />
                </button>
              </div>
            </div>
          </div>

          <div className={`${isMobileView ? 'mb-2' : 'mb-3 md:mb-4'}`}>
            <p className={`${isMobileView ? 'text-[10px]' : 'text-xs md:text-sm'} font-accent text-[#005830] mb-1`}>
              {product.brand}
            </p>
            <h3 className={`${isMobileView ? 'text-xs leading-tight' : 'text-sm md:text-lg'} font-head font-medium  text-[17px] text-comfortable-reading mb-2 line-clamp-2`}>
              {product.model}
            </h3>
            
           
          </div>

          <div className={`${isMobileView ? 'mb-2' : 'mb-3 md:mb-4'}`}>
            <div className="flex items-center space-x-1">
              <span className={`${isMobileView ? 'text-sm' : 'text-lg md:text-xl'} font-head1 font-semibold text-accent`}>
                {product.price} MAD
              </span>
              {product.originalPrice && (
                <span className={`${isMobileView ? 'text-[10px]' : 'text-xs md:text-sm'} text-clear-hierarchy line-through`}>
                  {product.originalPrice} MAD
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-1">
            <Link to="/product-detail" className="flex-1">
              <button className={`w-full btn-outline ${isMobileView ? 'text-[10px] py-1.5' : 'text-xs md:text-sm py-2'}`}>
                {isMobileView ? 'Détails' : 'Voir Détails'}
              </button>
            </Link>
            <button className={`${isMobileView ? 'px-2 py-1.5' : 'px-3 md:px-4 py-2'} bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-micro`}>
              <Icon name="ShoppingBag" size={isMobileView ? 12 : 15} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 mb-4 md:mb-6">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-cta font-medium text-accent">Collections</span>
          </div>
          
          <h2 className="text-2xl md:text-headline text-comfortable-reading font-head1  mb-4 ">
            CHAQUE DÉTAIL COMPTE
          </h2>
          
          <p className="text-sm md:text-body-large text-clear-hierarchy text-[17px] font-head font-medium  max-w-2xl mx-auto">
        Découvrez nos collections soigneusement conçues pour sublimer chaque instant avec élégance et distinction.
          </p>
        </div>

        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex bg-subtle-elevation rounded-lg p-1 w-full md:w-auto overflow-x-auto">
            {Object.entries(collections).map(([key, collection]) => (
              <button
                key={key}
                onClick={() => setActiveCollection(key)}
                className={`flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-cta font-medium transition-all duration-micro whitespace-nowrap ${
                  activeCollection === key
                    ? 'bg-accent text-accent-foreground shadow-luxury'
                    : 'text-comfortable-reading hover:text-accent'
                }`}
              >
                <Icon 
                  name={collection.icon} 
                  size={16} 
                  className={`md:w-[18px] md:h-[18px] ${activeCollection === key ? 'text-accent-foreground' : 'text-clear-hierarchy'}`}
                />
                <span className="text-sm md:text-base ">{collection.title}</span>
              </button>
            ))}
          </div>
        </div>

        {Object.entries(collections).map(([key, collection]) => (
          <div
            key={key}
            className={`transition-all duration-smooth ${
              activeCollection === key ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl tracking-widest font-head1 font-medium text-comfortable-reading mb-2">
                {collection.title}
              </h3>
              <p className="text-sm md:text-body text-clear-hierarchy">
                {collection.subtitle}
              </p>
            </div>

           
            {isMobile ? (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {collection.products.map((product) => (
                  <ProductCard key={product.id} product={product} isMobileView={true} />
                ))}
              </div>
            ) : (
              <div className="relative mb-8">
                <button
                  onClick={() => scroll(key, 'left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-pure-clarity shadow-luxury rounded-full flex items-center justify-center text-comfortable-reading hover:bg-accent hover:text-accent-foreground transition-all duration-micro"
                  aria-label="Previous products"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>

                <button
                  onClick={() => scroll(key, 'right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-pure-clarity shadow-luxury rounded-full flex items-center justify-center text-comfortable-reading hover:bg-accent hover:text-accent-foreground transition-all duration-micro"
                  aria-label="Next products"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>

                <div
                  ref={scrollRefs[key]}
                  className="flex space-x-2 overflow-x-auto scrollbar-luxury pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {collection.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-8 md:mt-12">
          <Link to="">
            <button className="btn-primary text-sm md:text-base uppercase ">
              Découvrir Toutes Nos Collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MontreCategories;
