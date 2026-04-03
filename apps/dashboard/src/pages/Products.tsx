import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import '../styles/Products.css';

export default function Products() {
  const { token } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data));
  }, [token]);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Products</h1>
        <button className="add-product-button">
          + Add Product
        </button>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock Level</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <p className="empty-state-text">No products found</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-sku">{product.sku}</td>
                  <td>
                    <span className="product-category">{product.category}</span>
                  </td>
                  <td>
                    <span className={
                      product.currentStock <= product.lowStockThreshold 
                        ? 'stock-badge stock-badge-low' 
                        : 'stock-badge stock-badge-normal'
                    }>
                      {product.currentStock} units
                    </span>
                  </td>
                  <td className="product-price">${product.unitPrice.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
