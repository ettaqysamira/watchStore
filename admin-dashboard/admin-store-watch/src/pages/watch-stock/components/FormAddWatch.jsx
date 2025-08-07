import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../../components/elements/Input';
import HeaderDashboard from '../../../components/elements/HeaderDashboard';
import SideBar from '../../../components/elements/SideBar';
import { Link } from 'react-router-dom';
import Icon from '../../../../../../watch-store/src/components/Icon';
import Button from '../../../../../../watch-store/src/components/elements/Button';


const AddWatchForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    currentStock: '',
    originalPrice: '',
    image: null,
    imageGallery: [],
    features: ['', '', '', '']
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const categories = ['Homme', 'Femme'];
  const featureLabels = ['Mouvement', 'Bracelet', 'Fonctions', 'Dimensions'];


  const generateSKU = (name) => {
    const prefix = name.trim().substring(0, 3).toUpperCase();
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom du produit est requis';
    if (!formData.brand.trim()) newErrors.brand = 'La marque est requise';
    if (!formData.description.trim()) {
  newErrors.description = 'La description est requise';
}
    if (!formData.category) newErrors.category = 'La catégorie est requise';
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = 'Le prix doit être supérieur à 0';
    if (!formData.currentStock || parseInt(formData.currentStock) < 0)
      newErrors.currentStock = 'Le stock doit être un nombre positif';
    if (!formData.originalPrice || parseInt(formData.originalPrice) < 0)
      newErrors.originalPrice = 'Le point de réapprovisionnement doit être un nombre positif';
    if (!formData.image) newErrors.image = 'L’image est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const imageForm = new FormData();
      imageForm.append('image', formData.image);

      const uploadRes = await axios.post('http://localhost:5000/api/watchImage', imageForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

       let uploadedGalleryFilenames = [];
            if (formData.imageGallery.length > 0) {
              const galleryForm = new FormData();
              formData.imageGallery.forEach((img) => galleryForm.append('image', img));
              const galleryUploadRes = await axios.post('http://localhost:5000/api/galleryImages', galleryForm, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              uploadedGalleryFilenames = galleryUploadRes.data.filenames;
            }

      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        description: formData.description,
        price: parseFloat(formData.price),
        currentStock: parseInt(formData.currentStock),
        originalPrice: parseInt(formData.originalPrice),
        sku: generateSKU(formData.name),
        id: Date.now(),
        daysOfSupply: Math.floor(parseInt(formData.currentStock) / 2),
        lastMovement: new Date().toLocaleDateString(),
        image: uploadRes.data.filename ,
        imageGallery: uploadedGalleryFilenames,
        features: formData.features.filter(f => f.trim() !== ''),

      };

      await axios.post('http://localhost:5000/api/watches', productData);

      alert('Produit ajouté avec succès');
      if (onSubmit) onSubmit(productData);

    } catch (error) {
      console.error('Erreur lors de l’envoi du produit :', error);
      alert('Erreur lors de l’ajout du produit.');
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imageGallery: [...(prev.imageGallery || []), ...files],
    }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = null;

  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
  setFormData((prev) => ({
    ...prev,
    imageGallery: prev.imageGallery.filter((_, index) => index !== indexToRemove),
  }));

  setGalleryPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
};



  return (
    <div className="max-w-4xl mx-auto p-6 pt-[5.5rem]">
      <HeaderDashboard />
      <SideBar />
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/stock-management">
                <Button variant="ghost" size="sm" iconName="ArrowLeft">
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ajouter une Montre</h1>
                <p className="text-sm text-muted-foreground">
                  Remplissez les informations du nouveau montre
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Image du montre
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview"  className="w-full h-48 object-cover rounded-lg"/>
                    <Button type="button" variant="ghost" size="xs" iconName="X" onClick={() => {setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 bg-background"
                    />
                  </div>
                ) : (
                  <label htmlFor="product-image" className="space-y-2 block cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour télécharger une image
                    </p>
                  </label>
                )}
                <input id="product-image" type="file" accept="image/*" onChange={handleImageChange}  className="hidden" />
                {errors.image && (
                  <p className="text-sm text-error mt-2">{errors.image}</p>
                )}
              </div>
              
             <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-2">Galerie d’images</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white"
                />

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                 {galleryPreviews.map((src, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={src}
                        alt={`gallery-${index}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    <button type="button" onClick={() => handleRemoveImage(index)}  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" title="Supprimer">
                     ×
                    </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informations de Base</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Nom du Montre *
                    </label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: Rolex Submariner" error={errors.name}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Marque *
                    </label>
                    <Input name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Ex: Rolex" error={errors.brand} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      SKU (généré automatiquement)
                    </label>
                    <Input name="sku" value={formData.name ? generateSKU(formData.name) : ''} placeholder="SKU généré automatiquement" disabled/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Catégorie *
                    </label>
                    <select name="category" value={formData.category} onChange={handleInputChange}  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-sm text-error mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description *
              </label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Description détaillée du montre..."  className={`w-full px-3 py-2 border ${errors.description ? 'border-error' : 'border-border'} rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none`} />
              {errors.description && (
                <p className="text-sm text-error mt-1">{errors.description}</p>
              )}
            </div>

              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Prix et Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Prix (MAD) *
                    </label>
                    <Input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" step="0.01" min="0"
                      error={errors.price}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Prix avant promotion *
                    </label>
                    <Input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange}
                      placeholder="0" min="0" error={errors.originalPrice}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Stock actuel *
                    </label>
                    <Input type="number" name="currentStock" value={formData.currentStock} onChange={handleInputChange}
                      placeholder="0" min="0" error={errors.currentStock}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold text-foreground">Caractéristiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.features.map((feature, index) => (
              <div key={index}>
                 <label className="block text-sm font-medium text-foreground mb-1">
          {featureLabels[index] || `Caractéristique ${index + 1}`}
        </label>
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                   placeholder={
                    index === 0
                      ? 'EX: Mouvement Automatique/Mécanique...'
                      : index === 1
                      ? 'EX: Bracelet en Acier inoxydable/Cuir...'
                      : index === 2
                      ? 'EX: Heures, Minutes, Secondes'
                      : index === 3
                      ? 'EX: Taille 40mm x 10mm'
                      : 'Autre caractéristique'
                            }
                  />
              </div>
            ))}
          </div>
        </div>


          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" variant="default" iconName="Plus">
              Ajouter la Montre
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWatchForm;
