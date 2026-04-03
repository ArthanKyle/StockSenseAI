import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Package, ShoppingCart, Bell, LayoutDashboard, LogOut } from 'lucide-react';
import '../styles/Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales' },
    { path: '/alerts', icon: Bell, label: 'Alerts' }
  ];

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-logo">
            <span className="sidebar-logo-icon">🚀</span>
            StockSenseAI
          </h1>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : ''}`}
            >
              <item.icon size={20} className="nav-item-icon" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
          <button onClick={logout} className="logout-button">
            <LogOut size={16} className="logout-button-icon" />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
