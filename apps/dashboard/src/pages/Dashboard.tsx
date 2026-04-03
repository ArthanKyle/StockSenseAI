import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { TrendingUp, Package, AlertTriangle, DollarSign } from 'lucide-react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { token } = useAuthStore();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, [token]);

  if (!stats) return <div className="loading-container">Loading dashboard...</div>;

  const cards = [
    { icon: Package, label: 'Total Products', value: stats.totalProducts, color: '#3b82f6' },
    { icon: AlertTriangle, label: 'Low Stock Items', value: stats.lowStockCount, color: '#ef4444' },
    { icon: DollarSign, label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, color: '#10b981' },
    { icon: TrendingUp, label: 'Recent Sales', value: stats.recentSalesData.length, color: '#8b5cf6' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your business overview</p>
      </div>

      <div className="stats-grid">
        {cards.map(card => (
          <div key={card.label} className="stat-card">
            <div className="stat-card-content">
              <div className="stat-info">
                <p className="stat-label">{card.label}</p>
                <p className="stat-value">{card.value}</p>
              </div>
              <div className="stat-icon" style={{ background: `${card.color}20` }}>
                <card.icon size={28} color={card.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="actions-card">
        <h2 className="actions-title">Quick Actions</h2>
        <div className="actions-buttons">
          <button className="action-button action-button-primary">
            Add Product
          </button>
          <button className="action-button action-button-success">
            Record Sale
          </button>
          <button className="action-button action-button-purple">
            View Forecasts
          </button>
        </div>
      </div>
    </div>
  );
}
