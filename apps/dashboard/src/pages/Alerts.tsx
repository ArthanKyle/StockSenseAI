import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { AlertTriangle, TrendingDown, TrendingUp, Package } from 'lucide-react';
import '../styles/Alerts.css';

export default function Alerts() {
  const { token } = useAuthStore();
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/alerts', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAlerts(res.data));
  }, [token]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'LOW_STOCK': return AlertTriangle;
      case 'SLOW_MOVING': return TrendingDown;
      case 'DEMAND_SPIKE': return TrendingUp;
      default: return Package;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'MEDIUM': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h1 className="alerts-title">Alerts & Notifications</h1>
        <p className="alerts-subtitle">Stay informed about your inventory status</p>
      </div>

      {alerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <p className="empty-state-text">No alerts at the moment</p>
          <p className="empty-state-subtext">You'll be notified when something needs your attention</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => {
            const Icon = getIcon(alert.type);
            const color = getSeverityColor(alert.severity);

            return (
              <div
                key={alert.id}
                className={`alert-card ${alert.isRead ? 'alert-card-read' : ''}`}
                style={{ borderLeftColor: color }}
              >
                <div className="alert-content">
                  <div className="alert-icon-wrapper" style={{ background: `${color}20` }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div className="alert-body">
                    <div className="alert-header">
                      <div className="alert-info">
                        <p className="alert-type">{alert.type.replace(/_/g, ' ')}</p>
                        <p className="alert-message">{alert.message}</p>
                      </div>
                      <span 
                        className="alert-severity-badge" 
                        style={{ background: `${color}20`, color }}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="alert-timestamp">
                      🕒 {new Date(alert.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
