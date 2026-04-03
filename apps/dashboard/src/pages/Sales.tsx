import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import '../styles/Sales.css';

export default function Sales() {
  const { token } = useAuthStore();
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/sales', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSales(res.data));
  }, [token]);

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h1 className="sales-title">Sales History</h1>
        <button className="record-sale-button">
          + Record Sale
        </button>
      </div>

      <div className="sales-table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Items Sold</th>
              <th>Total Amount</th>
              <th>Staff Member</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="empty-state">
                    <div className="empty-state-icon">🛒</div>
                    <p className="empty-state-text">No sales recorded yet</p>
                  </div>
                </td>
              </tr>
            ) : (
              sales.map(sale => (
                <tr key={sale.id}>
                  <td className="sale-date">
                    {new Date(sale.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td>
                    <span className="sale-items">{sale.items.length} items</span>
                  </td>
                  <td className="sale-total">${sale.totalAmount.toFixed(2)}</td>
                  <td className="sale-staff">{sale.user.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
