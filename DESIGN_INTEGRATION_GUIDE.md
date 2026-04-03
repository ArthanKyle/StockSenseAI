# Design Integration Guide - StockSenseAI

## Current Design Status

The dashboard currently uses a custom CSS design with:
- Purple/indigo primary color (#667eea)
- Clean, modern card-based layout
- Professional inventory system styling
- External CSS files (no inline styles)

---

## How to Integrate Figma Design

### Option 1: Export Design Tokens from Figma

1. **Export Color Palette**
   - Open Figma design
   - Go to Design > Local Styles
   - Export colors as CSS variables

2. **Export Typography**
   - Note font families, sizes, weights
   - Create typography scale

3. **Export Spacing System**
   - Document margins, padding, gaps
   - Create spacing variables

4. **Export Components**
   - Export icons as SVG
   - Screenshot complex components for reference

### Option 2: Share Design Assets

Please provide:
- [ ] Screenshots of each page (Dashboard, Products, Sales, Alerts, Login)
- [ ] Color palette (hex codes)
- [ ] Font specifications
- [ ] Icon set (if custom)
- [ ] Spacing/grid system
- [ ] Component specifications

### Option 3: Figma Dev Mode

If you have Figma Dev Mode:
1. Open design in Figma
2. Enable Dev Mode (top right)
3. Select elements to get CSS
4. Copy CSS properties
5. Share with me

---

## Design System Template

Here's a template for your design specifications:

### Colors
```css
:root {
  /* Primary Colors */
  --primary-50: #f5f7ff;
  --primary-100: #ebf0ff;
  --primary-500: #667eea;
  --primary-600: #5568d3;
  --primary-700: #4451b8;
  
  /* Secondary Colors */
  --secondary-500: #10b981;
  --secondary-600: #059669;
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #1f2937;
  
  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### Typography
```css
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, sans-serif;
  --font-mono: 'Courier New', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Spacing
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
}
```

### Border Radius
```css
:root {
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 10px;
  --radius-2xl: 12px;
  --radius-full: 9999px;
}
```

### Shadows
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

---

## Integration Steps

### Step 1: Create Design Tokens File
```typescript
// apps/dashboard/src/styles/tokens.css
:root {
  /* Add all design tokens here */
}
```

### Step 2: Update Component Styles
```typescript
// Use design tokens in component CSS
.button-primary {
  background: var(--primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
}
```

### Step 3: Create Component Library
```typescript
// apps/dashboard/src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Step 4: Update Pages
Replace hardcoded styles with design system components.

---

## Common Inventory Dashboard Patterns

### Dashboard Layout
```
┌─────────────────────────────────────────┐
│ Header (Logo, Search, Profile)          │
├──────┬──────────────────────────────────┤
│      │  Stats Cards (4 columns)         │
│ Side │  ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ bar  │  │ 📦 │ │ ⚠️ │ │ 💰 │ │ 📈 │   │
│      │  └────┘ └────┘ └────┘ └────┘   │
│ Nav  │                                  │
│      │  Charts Section                  │
│      │  ┌──────────────────────────┐   │
│      │  │  Sales Trend Chart       │   │
│      │  └──────────────────────────┘   │
│      │                                  │
│      │  Recent Activity Table           │
└──────┴──────────────────────────────────┘
```

### Products Page
```
┌─────────────────────────────────────────┐
│ Products                    [+ Add]      │
├─────────────────────────────────────────┤
│ [Search] [Filter] [Sort]                │
├─────────────────────────────────────────┤
│ Table:                                  │
│ ┌────────────────────────────────────┐ │
│ │ Name │ SKU │ Stock │ Price │ ...  │ │
│ ├────────────────────────────────────┤ │
│ │ ...  │ ... │ ...   │ ...   │ ...  │ │
│ └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Next Steps

1. **Share Figma Design Assets**
   - Export screens as images
   - Document color palette
   - List fonts and sizes
   - Note spacing patterns

2. **I'll Create Matching Components**
   - Design tokens file
   - Reusable UI components
   - Updated page layouts
   - Matching styles

3. **Review & Iterate**
   - Test on different screens
   - Adjust for accessibility
   - Optimize performance

---

## Alternative: Use Popular Design Systems

If you want a quick professional look, we can integrate:

### Option A: Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Option B: Material-UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Option C: Ant Design
```bash
npm install antd
```

### Option D: Chakra UI
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

---

## Contact

Please provide:
1. Screenshots of Figma design
2. Color palette
3. Typography specs
4. Any specific components you want

I'll integrate them into your dashboard immediately!
