import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import Button from '../../components/elements/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroWatches = [
    {
      id: 1,
      collection: "COLLECTION FEMME",
      model: "Signature Féminine",
      background: "/public/images/hero1.jpg",
      description: `Affirmez votre style avec raffinement. Une pièce d’exception pour la femme moderne, entre douceur et caractère`,
      features: ["Livraison gratuite", "Paiement à la livraison", "Support 7j/7, réponse en 24h"],
    },
    {
      id: 2,
      collection: "COLLECTION HOMME",
      model: "Signature Masculine",
      background: "/public/images/hero2.jpg",
      description: `Élégance discrète et précision, Pour l’homme exigeant et qui soigne chaque détail de son apparence.`,
      features: ["Livraison gratuite", "Paiement à la livraison", "Support 7j/7, réponse en 24h"],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroWatches.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroWatches.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentWatch = heroWatches[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-sophisticated-depth">
      <div className="absolute inset-0">
        {heroWatches.map((watch, index) => (
          <div key={watch.id}
            className={`absolute inset-0 transition-all duration-carousel ${
              index === currentSlide ? 'opacity-100 scale-100' :'opacity-0 scale-105'
            }`}>
            <img src={watch.background} alt={`${watch.collection} background`}  className="w-full h-full object-cover parallax-slow"/>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left animate-reveal">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#ffff] font-head1	font-medium  tracking-widest  mb-2">
                  {currentWatch.collection}
                </h1>
                <p className="text-xl text-[#B8860B] font-head">{currentWatch.model}</p>
              </div>

              <div className="mb-8">
                <p className="text-[17px] font-head font-medium text-pure-clarity leading-relaxed whitespace-pre-line">
                  {currentWatch.description}
                </p>
              </div>

              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="flex gap-3">
                  <Link to="/collection">
                    <Button variant="default" size="lg" iconName="Eye" iconPosition="left"
                className="bg-accent text-accent-foreground hover:bg-elegant-urgency shadow-luxury">
                      Découvrir
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" iconName="ShoppingBag" iconPosition="left"
                    className="border-pure-clarity/20 text-pure-clarity hover:bg-pure-clarity hover:text-sophisticated-depth">
                    Commander
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {heroWatches.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-micro ${ index === currentSlide
                    ? 'bg-accent scale-125' :'bg-pure-clarity/30 hover:bg-pure-clarity/50'
                }`} aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
