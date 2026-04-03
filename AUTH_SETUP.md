# Authentication Setup Guide

## ✅ Login and Register Pages Connected

The login and register pages are now fully connected to the backend API.

---

## How It Works

### Login Flow
1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials
4. Returns JWT token and user data
5. Token stored in localStorage via Zustand
6. User redirected to `/dashboard`

### Register Flow
1. User fills registration form
2. Frontend validates passwords match
3. Sends POST request to `/api/auth/register`
4. Backend creates business and user account
5. Returns JWT token and user data
6. Token stored in localStorage
7. User redirected to `/dashboard`

---

## API Endpoints

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "OWNER"
  }
}
```

### Register
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "businessName": "Acme Inc"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "OWNER"
  }
}
```

---

## Environment Variables

### Dashboard (.env)
```
VITE_API_URL=http://localhost:5000
```

### API (.env)
```
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/inventory?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=5000
NODE_ENV=development
```

---

## Testing the Authentication

### 1. Start the API Server
```bash
cd apps/api
npm run dev
```

### 2. Start the Dashboard
```bash
cd apps/dashboard
npm run dev
```

### 3. Test Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in the form:
   - Full Name: John Doe
   - Company: Acme Inc (optional)
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
   - Check "I agree to terms"
3. Click "Create Account"
4. Should redirect to dashboard

### 4. Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to dashboard

### 5. Test Logout
1. In dashboard, click "Logout" button in sidebar
2. Should redirect to login page
3. Token cleared from localStorage

---

## Security Features

### Current Implementation
✅ Password hashing with bcrypt (10 rounds)  
✅ JWT token authentication  
✅ Token stored in localStorage  
✅ Protected routes (redirect to login if not authenticated)  
✅ Form validation (password match, minimum length)  
✅ Error handling and user feedback  

### Recommended Improvements
⚠️ Change JWT_SECRET to strong random value  
⚠️ Implement HTTPS in production  
⚠️ Add CORS restrictions  
⚠️ Implement rate limiting on auth endpoints  
⚠️ Add password strength requirements  
⚠️ Implement account lockout after failed attempts  
⚠️ Add email verification  
⚠️ Move tokens to httpOnly cookies  
⚠️ Implement refresh tokens  

---

## File Structure

```
apps/dashboard/src/
├── pages/
│   ├── Login.tsx           # Login page with API integration
│   ├── Register.tsx        # Registration page with API integration
│   └── Landing.tsx         # Public landing page
├── store/
│   └── authStore.ts        # Zustand auth state management
├── styles/
│   └── Login.css           # Shared auth page styles
├── .env                    # Environment variables
└── vite-env.d.ts          # TypeScript env definitions

apps/api/src/
├── routes/
│   └── auth.ts            # Login & register endpoints
├── middleware/
│   └── auth.ts            # JWT authentication middleware
└── .env                   # API environment variables
```

---

## Auth Store (Zustand)

Located at `apps/dashboard/src/store/authStore.ts`:

```typescript
interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}
```

**Usage:**
```typescript
// Get auth state
const { token, user } = useAuthStore();

// Set auth (after login/register)
const setAuth = useAuthStore(state => state.setAuth);
setAuth(token, user);

// Logout
const logout = useAuthStore(state => state.logout);
logout();
```

---

## Troubleshooting

### "Cannot connect to API"
- Ensure API server is running on port 5000
- Check `VITE_API_URL` in dashboard `.env`
- Verify CORS is enabled in API

### "Invalid credentials"
- Check database has user record
- Verify password is hashed correctly
- Check JWT_SECRET is set in API `.env`

### "Token expired"
- Current token expires in 7 days
- User needs to login again
- Consider implementing refresh tokens

### "Registration fails"
- Check database connection
- Verify Prisma schema is migrated
- Check for duplicate email

---

## Next Steps

1. ✅ Test login and registration flows
2. ✅ Verify token persistence across page refreshes
3. ⚠️ Implement password reset functionality
4. ⚠️ Add email verification
5. ⚠️ Implement social login (Google, GitHub)
6. ⚠️ Add multi-factor authentication
7. ⚠️ Implement session management
8. ⚠️ Add audit logging for auth events

---

**Last Updated:** March 31, 2026  
**Status:** ✅ Fully Connected and Working
