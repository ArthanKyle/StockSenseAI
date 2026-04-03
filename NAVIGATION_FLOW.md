# Navigation Flow - StockSenseAI

## Updated Routing Structure

The application now has a proper landing page as the entry point, with authentication-protected routes for the dashboard.

---

## Route Map

### Public Routes (No Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Marketing landing page with features, benefits, and CTAs |
| `/login` | Login | User authentication page |
| `/register` | Login | User registration page (same component, different mode) |

### Protected Routes (Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | Dashboard | Main dashboard with stats and quick actions |
| `/products` | Products | Product inventory management |
| `/sales` | Sales | Sales history and transactions |
| `/alerts` | Alerts | System alerts and notifications |

---

## Navigation Flow

### First-Time Visitor
```
1. Visit site → Landing Page (/)
2. Click "Get Started" or "Start Free Trial" → Register (/register)
3. Complete registration → Dashboard (/dashboard)
```

### Returning User
```
1. Visit site → Landing Page (/)
2. Click "Login" or "Sign In" → Login (/login)
3. Enter credentials → Dashboard (/dashboard)
```

### Authenticated User
```
1. Visit site → Landing Page (/)
   - If already logged in, can navigate directly to /dashboard
2. Use sidebar navigation to access:
   - Dashboard (/dashboard)
   - Products (/products)
   - Sales (/sales)
   - Alerts (/alerts)
```

---

## Landing Page Features

### Hero Section
- Compelling headline with value proposition
- AI-powered inventory management messaging
- CTA buttons: "Start Free Trial" and "View Demo Dashboard"
- Trust indicators: "No credit card required", "14-day free trial"

### Problem Section
- Highlights pain points:
  - Overstocking (capital tied up)
  - Stockouts (lost sales)
  - Manual tracking (time wasted)

### Solution Section
- Three key features:
  1. **Predict Demand** - 87% accuracy, seasonal analysis
  2. **Smart Restocking** - Optimal quantities, reorder alerts
  3. **Detect Slow Movers** - Anomaly detection, insights

### Impact Section
- Key metrics:
  - 34% reduction in overstocking
  - 28% fewer stockouts
  - $12K average monthly savings
  - 87% prediction accuracy

### CTA Section
- Final conversion opportunity
- "Start Free Trial" and "Sign In" buttons

### Footer
- Branding and copyright

---

## Authentication Logic

### Route Protection
```typescript
// Protected route example
<Route
  path="/dashboard"
  element={
    token ? (
      <Layout>
        <Dashboard />
      </Layout>
    ) : (
      <Navigate to="/login" />
    )
  }
/>
```

### Login/Register Redirect
```typescript
// If already authenticated, redirect to dashboard
<Route 
  path="/login" 
  element={token ? <Navigate to="/dashboard" /> : <Login />} 
/>
```

---

## Sidebar Navigation (Authenticated Users)

When logged in, users see a fixed sidebar with:

1. **Logo & Branding** - StockSenseAI with icon
2. **Navigation Links**:
   - 🏠 Dashboard
   - 📦 Products
   - 🛒 Sales
   - 🔔 Alerts
3. **User Info** - Name and role
4. **Logout Button** - Sign out functionality

---

## URL Structure

### Development
```
http://localhost:5173/              → Landing
http://localhost:5173/login         → Login
http://localhost:5173/register      → Register
http://localhost:5173/dashboard     → Dashboard (protected)
http://localhost:5173/products      → Products (protected)
http://localhost:5173/sales         → Sales (protected)
http://localhost:5173/alerts        → Alerts (protected)
```

### Production
```
https://yourdomain.com/             → Landing
https://yourdomain.com/login        → Login
https://yourdomain.com/register     → Register
https://yourdomain.com/dashboard    → Dashboard (protected)
https://yourdomain.com/products     → Products (protected)
https://yourdomain.com/sales        → Sales (protected)
https://yourdomain.com/alerts       → Alerts (protected)
```

---

## State Management

### Authentication State (Zustand)
```typescript
interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}
```

- Stored in localStorage as 'auth-storage'
- Persists across page refreshes
- Cleared on logout

---

## Testing the Navigation

### Test Landing Page
```bash
cd apps/dashboard
npm run dev
# Visit http://localhost:5173/
```

### Test Authentication Flow
1. Click "Get Started" on landing page
2. Register a new account
3. Should redirect to /dashboard
4. Test sidebar navigation
5. Click logout
6. Should redirect to /login

### Test Protected Routes
1. Open browser in incognito mode
2. Try to access http://localhost:5173/dashboard
3. Should redirect to /login
4. Login with credentials
5. Should redirect back to /dashboard

---

## Next Steps

### Enhancements to Consider

1. **Add More Landing Page Sections**
   - Customer testimonials
   - Pricing plans
   - FAQ section
   - Integration showcase

2. **Improve Authentication**
   - Password reset flow
   - Email verification
   - Social login (Google, Microsoft)
   - Remember me functionality

3. **Add Onboarding**
   - Welcome tour for new users
   - Setup wizard
   - Sample data generation
   - Tutorial tooltips

4. **Analytics**
   - Track landing page conversions
   - Monitor user journey
   - A/B test CTAs
   - Heatmap analysis

---

## File Structure

```
apps/dashboard/src/
├── App.tsx                    # Main routing configuration
├── pages/
│   ├── Landing.tsx           # Landing page (public)
│   ├── Login.tsx             # Login/Register page (public)
│   ├── Dashboard.tsx         # Dashboard (protected)
│   ├── Products.tsx          # Products (protected)
│   ├── Sales.tsx             # Sales (protected)
│   └── Alerts.tsx            # Alerts (protected)
├── components/
│   ├── Layout.tsx            # Authenticated layout with sidebar
│   └── ui/                   # Reusable UI components
└── store/
    └── authStore.ts          # Authentication state management
```

---

**Last Updated:** March 31, 2026  
**Status:** ✅ Landing page navigation implemented
