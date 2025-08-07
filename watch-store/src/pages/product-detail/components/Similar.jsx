import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';

const Similar = ({ brand, price, excludeId }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/watches/similar`, {
          params: { brand, price, excludeId }
        });
        setSimilar(res.data.slice(0, 3));
      } catch (err) {
        console.error('Erreur lors de la récupération des produits similaires:', err);
      }
    };

    if (brand && price && excludeId) fetchSimilar();
  }, [brand, price, excludeId]);

  if (similar.length === 0) return null;

  return (
    <div className="mt-16 px-4 max-w-6xl mx-auto bg-white">
       <div className="text-center mb-12">
        <h4 className="text-2xl md:text-3xl font-head1 font-bold text-gray-900 mb-3 uppercase tracking-wider">
          Produits Similaires
        </h4>
        <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/60 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 text-sm">Découvrez d'autres montres qui pourraient vous plaire</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {similar.map(product => (
          <div key={product._id} className="group text-center bg-white">
            <div className="relative mb-6 bg-white overflow-hidden">
              {product.hasNew && (
                <div className="absolute top-4 left-4 z-10 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Sparkles" size={12} className="text-accent" />
                    <span className="text-xs font-medium text-gray-700">Nouveau</span>
                  </div>
                </div>
              )}

              {product.originalPrice && (
                <div className="absolute top-4 right-4 z-10 bg-[#005830] text-white rounded-full px-2 py-1 text-xs font-semibold shadow-sm">
                  -{Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)}%
                </div>
              )}

              <div className="aspect-square p-8 flex items-center justify-center bg-white">
                <img
                  src={`http://localhost:5000/restoreImages/${product.image}`}
                  alt={`${product.brand} ${product.model}`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-3 bg-white">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide leading-tight px-2">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 px-2 leading-relaxed">
                {product.brand} - {product.model || 'Montre de luxe'}
              </p>

              <div className="flex justify-center items-center gap-2 pt-2">
                <span className="text-lg font-bold text-gray-900">
                  {product.price} MAD
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice} MAD
                  </span>
                )}
              </div>
              <div className="pt-4">
                <Link 
                  to={`/product-detail/${product._id}`}
                  className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group/link border-b border-transparent hover:border-gray-300"
                >
                  <span>Voir les détails</span>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1" 
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16"></div>
    </div>
  );
};

export default Similar;
