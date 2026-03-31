# StockSenseAI API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

Include token in header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "businessName": "My Business"
}

Response: 201
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "OWNER"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "token": "jwt-token",
  "user": { ... }
}
```

### Products

#### Get All Products
```http
GET /api/products
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "name": "Product Name",
    "sku": "SKU-001",
    "category": "Electronics",
    "currentStock": 50,
    "lowStockThreshold": 10,
    "unitPrice": 99.99,
    "costPrice": 50.00,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Product",
  "sku": "SKU-002",
  "category": "Electronics",
  "currentStock": 100,
  "lowStockThreshold": 20,
  "unitPrice": 149.99,
  "costPrice": 75.00
}

Response: 201
{ ... product object ... }
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentStock": 150,
  "unitPrice": 139.99
}

Response: 200
{ ... updated product ... }
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>

Response: 200
{ "message": "Product deleted" }
```

### Sales

#### Get All Sales
```http
GET /api/sales
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "totalAmount": 299.98,
    "createdAt": "2024-01-01T00:00:00Z",
    "user": { "name": "John Doe" },
    "items": [
      {
        "productId": "uuid",
        "quantity": 2,
        "unitPrice": 149.99,
        "product": { "name": "Product Name" }
      }
    ]
  }
]
```

#### Create Sale
```http
POST /api/sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "unitPrice": 149.99
    }
  ]
}

Response: 201
{ ... sale object with items ... }
```

### Alerts

#### Get All Alerts
```http
GET /api/alerts
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "type": "LOW_STOCK",
    "severity": "HIGH",
    "message": "Product X is low on stock",
    "productId": "uuid",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Mark Alert as Read
```http
PATCH /api/alerts/:id/read
Authorization: Bearer <token>

Response: 200
{ "message": "Alert marked as read" }
```

### Dashboard

#### Get Dashboard Stats
```http
GET /api/dashboard/stats
Authorization: Bearer <token>

Response: 200
{
  "totalProducts": 50,
  "lowStockCount": 5,
  "totalRevenue": 15000.00,
  "recentSalesData": [
    {
      "totalAmount": 299.98,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### AI

#### Ask AI Agent
```http
POST /api/ai/ask
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "Which products should I restock?"
}

Response: 200
{
  "answer": "Based on current inventory levels and sales trends..."
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to all `/api/*` endpoints

## Caching

The following endpoints use Redis caching:
- `GET /api/products` (5 minutes)
- `GET /api/alerts` (1 minute)
- `GET /api/dashboard/stats` (2 minutes)

Cache is automatically invalidated on data changes.
