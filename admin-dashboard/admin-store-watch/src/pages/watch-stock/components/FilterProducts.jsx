import React from 'react';
import { CheckBox } from '../../../components/elements/CheckBox';
import Button from '../../../../../../watch-store/src/components/elements/Button';
import Input from '../../../components/elements/Input';
import Select from '../../../components/elements/Select';

const FilterProducts = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onReset, 
  onExport,
  categoryOptions,
  brandOptions 
}) => {
  const stockStatusOptions = [
    { value: 'all', label: 'Tous les Statuts de Stock' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const handleMultiSelectChange = (field, value) => {
    const currentValues = filters[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(field, newValues);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtrer le Stock</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="RotateCcw" onClick={onReset}>
             Réinitialiser les filtres
          </Button>
          <Button variant="outline" size="sm" iconName="Download"  onClick={onExport}>
             Exporter le rapport
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input label="Chercher un article" type="search" placeholder="Rechercher par nom, SKU ou marque..."
          value={filters.search || ''} onChange={(e) => onFilterChange('search', e.target.value)}  className="col-span-1 md:col-span-2"/>

        <Select label="Stock Status" options={stockStatusOptions}  value={filters.stockStatus || 'all'}
          onChange={(value) => onFilterChange('stockStatus', value)} />
        <Select label="Trier par"
          options={[
            { value: 'name', label: 'Nom du Montre' },
            { value: 'price', label: 'Prix' },
          ]}
          value={filters.sortBy || 'name'} onChange={(value) => onFilterChange('sortBy', value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Catégories d'Article</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {categoryOptions.map((category) => (
              <CheckBox key={category.value} label={category.label}
                checked={(filters.categories || []).includes(category.value)}
                onChange={(e) => handleMultiSelectChange('categories', category.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Marque</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {brandOptions.map((brand) => (
              <CheckBox key={brand.value} label={brand.label} checked={(filters.brands || []).includes(brand.value)}
                onChange={(e) => handleMultiSelectChange('brands', brand.value)} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Affichage {filters.resultCount || 0} Articles
        </div>
        <div className="flex items-center space-x-2">
          <CheckBox label="Voir les articles presque en rupture" checked={filters.lowStockOnly || false}
            onChange={(e) => onFilterChange('lowStockOnly', e.target.checked)}/>
          <CheckBox label="Inclure les articles Out of Stock" checked={filters.includeOutOfStock || false}
            onChange={(e) => onFilterChange('includeOutOfStock', e.target.checked)} />
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;