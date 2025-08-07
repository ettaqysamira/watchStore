import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Icon';

const ProductImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const baseUrl = "http://localhost:5000/restoreImages/";

  if (!product) return null; 

  const images = [
    product.image ? baseUrl + product.image : null,
    ...(product.imageGallery ? product.imageGallery.map(img => baseUrl + img) : [])
  ].filter(Boolean); 

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setIsZoomed(false);
    };

    if (isZoomed) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isZoomed, selectedImageIndex]);

  return (
    <div className="space-y-4">
      <div className="relative bg-warm-canvas rounded-lg overflow-hidden group">
        <div className="aspect-square relative cursor-zoom-in" onClick={() => setIsZoomed(true)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <img src={images[selectedImageIndex]} alt={`${product.name} - Vue ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-smooth group-hover:scale-105"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-smooth hover:bg-background shadow-luxury"
            aria-label="Image précédente"
          >
            <Icon name="ChevronLeft" size={20} className="text-comfortable-reading" />
          </button>

          <button onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-smooth hover:bg-background shadow-luxury"
            aria-label="Image suivante"
          >
            <Icon name="ChevronRight" size={20} className="text-comfortable-reading" />
          </button>

          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-smooth">
            <div className="flex items-center space-x-2 text-sm font-cta text-comfortable-reading">
              <Icon name="ZoomIn" size={16} />
              <span>Cliquer pour agrandir</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-sm font-cta text-comfortable-reading">
              {selectedImageIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 overflow-x-auto scrollbar-luxury pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-micro ${
              selectedImageIndex === index
                ? 'border-accent shadow-luxury'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <img src={image} alt={`${product.name} - Miniature ${index + 1}`} className="w-full h-full object-cover"/>
          </button>
        ))}
      </div>

    
      {isZoomed && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-micro"
              aria-label="Fermer le zoom"
            >
              <Icon name="X" size={20} />
            </button>

            <img src={images[selectedImageIndex]} alt={`${product.name} - Vue agrandie`} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-modal"/>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
              <button onClick={prevImage}
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-elegant-urgency transition-colors duration-micro"
                aria-label="Image précédente"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>

              <span className="text-sm font-cta text-comfortable-reading px-2">
                {selectedImageIndex + 1} / {images.length}
              </span>

              <button onClick={nextImage}
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-elegant-urgency transition-colors duration-micro"
                aria-label="Image suivante"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
