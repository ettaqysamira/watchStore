import React, { useState, useEffect } from 'react';
import Icon from '../../../../../../watch-store/src/components/Icon';
import Button from '../../../../../../watch-store/src/components/elements/Button';
import Input from '../../../components/elements/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StockTableau = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/watches');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditValues({
      currentStock: product.currentStock,
      price: product.price
    });
  };

  const handleSaveEdit = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/api/watches/${productId}`, editValues);
      fetchProducts();
      setEditingProduct(null);
      setEditValues({});
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditValues({});
  };

  const handleSelectAll = (checked) => {
    setSelectedProducts(checked ? products.map(p => p._id) : []);
  };

  const handleSelectProduct = (productId, checked) => {
    setSelectedProducts(prev =>
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setProducts(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStockStatus = (current, reorder) => {
    if (current === 0) return { status: 'Rupture', color: 'text-error' };
    if (current <= reorder) return { status: 'Stock Faible', color: 'text-warning' };
    return { status: 'En Stock', color: 'text-success' };
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log("Action groupée :", action, selectedIds);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Liste des Montres</h3>
          <div className="flex items-center space-x-2">
            {selectedProducts.length > 0 && (
              <>
                <Button variant="outline" size="sm" iconName="Download" onClick={() => handleBulkAction('export', selectedProducts)}>
                  Exporter
                </Button>
                <Button variant="outline" size="sm" iconName="Edit" onClick={() => handleBulkAction('bulk-edit', selectedProducts)}>
                  Modifier
                </Button>
              </>
            )}
            <Link to="/watch-form"  className="inline-flex items-center gap-2 px-4 py-2 bg-[#005830] text-white rounded hover:bg-[#1E3932] text-sm">
              <Icon name="Plus" />
              Ajouter une Montre
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">
                <input type="checkbox" checked={selectedProducts.length === products.length} onChange={(e) => handleSelectAll(e.target.checked)} />
              </th>
              <th className="p-4 text-left">Image</th>
              {['Nom', 'SKU', 'Stock actuel', 'price (DH)'].map((key) => (
                <th key={key} className="p-4 text-left">
                  <button onClick={() => handleSort(key)} className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <span>{key}</span>
                    <Icon name={getSortIcon(key)} size={14} />
                  </button>
                </th>
              ))}
              <th className="p-4 text-left">Statut</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => {
              const isEditing = editingProduct === product._id;
              const stockStatus = getStockStatus(product.currentStock, product.reorderPoint);
              return (
                <tr key={product._id} className="hover:bg-muted hover:bg-opacity-50">
                  <td className="p-4">
                    <input type="checkbox" checked={selectedProducts.includes(product._id)} onChange={(e) => handleSelectProduct(product._id, e.target.checked)} />
                  </td>
                  <td className="p-4">
                    {product.image ? (
                      <img src={`http://localhost:5000/restoreImages/${product.image}`}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">Aucune</span>
                    )}
                  </td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    {isEditing ? (
                      <Input type="number" value={editValues.currentStock} onChange={(e) => setEditValues({...editValues, currentStock: parseInt(e.target.value)})} />
                    ) : (
                      <span>{product.currentStock}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {isEditing ? (
                      <Input type="number" value={editValues.price} onChange={(e) => setEditValues({...editValues, price: parseFloat(e.target.value)})} />
                    ) : (
                      <span>{product.price}</span>
                    )}
                  </td>
                 
                  <td className="p-4">
                    <span className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.status}</span>
                  </td>
                  <td className="p-4 text-center ">
                      <div className="flex justify-center gap-x-4">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="xs" iconName="Check" onClick={() => handleSaveEdit(product._id)}>
                          Sauvegarder
                        </Button>
                        <Button variant="ghost" size="xs" iconName="X" onClick={handleCancelEdit}>
                          Annuler
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="md" iconName="Edit" onClick={() => handleEdit(product)}>
                        </Button>
                        <Button variant="ghost" size="md" iconName="Trash" onClick={() => handleBulkAction('view-details', [product._id])}>
                        </Button>
                      </>
                    )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTableau;
