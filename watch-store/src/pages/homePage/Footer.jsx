import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    collections: {
      title: "Collections",
      links: [
        { name: "Collection Homme", path: "/collection-homme" },
        { name: "Collection Femme", path: "/collection-femme" },
        { name: "Accessoires", path: "/collections" },
        { name: "Nouveauté", path: "/nouveauté" }
      ]
    },
    brands: {
      title: "Nos Marques",
      links: [
        { name: "Rolex" },
        { name: "Guess" },
        { name: "Chanel"},
        { name: "Casio" },
      ]
    },
   
    company: {
      title: "Bijoux by Dox",
      links: [
        { name: "Accueil", path: "/homepage" },
        { name: "Collection", path: "/collections" },
        { name: "À Propos", path: "/about" },
        { name: "Contact", path: "/contact" },
      
      ]
    }
  };

  

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    
  ];

  const livraison = [
    {
      name: "Livraison Partout au Maroc",
      icon: "Truck",
      description: "Nous livrons vos montres avec soin partout au Maroc"
    },
    {
      name: "Garantie 1 An",
      icon: "ShieldCheck",
      description: "Pour une élégance en toute sérénité, Garantie d’un an assurée"
    },
    {
      name: "Service Premium",
      icon: "Gem",
      description: "Excellence reconnue dans le service client"
    }
  ];

  return (
    <footer className="bg-sophisticated-depth text-pure-clarity">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          <div className="lg:col-span-1">
           <Link to="/homepage"
             className="flex items-center space-x-3 group transition-transform duration-micro hover:scale-105"
           >
             <div className="relative">
               <img  src="/images/bijoux-by-dox-logo.png" alt="Logo Bijoux By Doux" className="w-[6rem] h-[2.5rem] lg:w-[9.5rem] lg:h-[4.5rem] mb-4"/>
             </div>
           </Link>
           
            
            <p className="text-pure-clarity/80 leading-relaxed mb-6">
              Bijoux by Dox représente l’élégance et le raffinement.
              Chaque pièce reflète un savoir-faire soigné, une attention aux détails et une vision du luxe moderne. 
            </p>

            <div className="space-y-3">
              {livraison.map((cert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={cert.icon} size={15} className="text-[#005830]" />
                  </div>
                  <div>
                    <p className="text-sm font-cta font-medium text-pure-clarity">
                      {cert.name}
                    </p>
                    <p className="text-xs text-pure-clarity/60">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:ml-[6.5rem]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-[2.5rem]">
              {Object.entries(footerSections).map(([key, section]) => (
                <div key={key}>
                  <h3 className="text-lg font-headline font-medium text-pure-clarity mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className="text-pure-clarity/70 hover:text-accent transition-colors duration-micro text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      

        <div className="border-t border-pure-clarity/10 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={24} className="text-accent" />
            </div>
            
            <h3 className="text-xl font-headline font-medium text-pure-clarity mb-4">
             Restez connectés
            </h3>
            
            <p className="text-pure-clarity/70 mb-6">
              Restez informé de nos dernières nouveautés et offres exclusives de Bijoux by Dox. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-pure-clarity/10 border border-pure-clarity/20 rounded-lg text-pure-clarity placeholder-pure-clarity/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-cta font-medium hover:bg-elegant-urgency transition-colors duration-micro">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-pure-clarity/10 pt-8  ">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-pure-clarity/10 rounded-full flex items-center justify-center text-pure-clarity hover:bg-accent hover:text-accent-foreground transition-all duration-micro"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-sm text-pure-clarity/70">
              <span>Suivez-nous</span>
              <span>•</span>
              <span>Restez connecté</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-pure-clarity/10 bg-sophisticated-depth/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <p className="text-sm text-pure-clarity/60">
                © {currentYear} Bijoux By Dox Timepieces. Tous droits réservés.
              </p>
              
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-pure-clarity/60">
              
              <Link to="/homepage" className="hover:text-accent transition-colors duration-micro">
                Politique de Confidentialité
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;