# Products API

The Products API provides a RESTful interface for managing product data in the Chasing Ridges application. The API supports pagination, CRUD operations, and features a special endpoint for featured products.

## Base URL
```
http://localhost:3000/api/products
```

## Endpoints

### List Products
```http
GET /api/products?page=1&limit=10
```

**Curl Command:**
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10"
```

Retrieves a paginated list of products.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Response Example:**
```json
{
  "items": [
    {
      "id": "col-001",
      "name": "Classic Leather Dog Collar",
      "description": "Handcrafted genuine leather dog collar with brass hardware for durability and style.",
      "price": 29.99,
      "image": "classic-leather-collar.svg",
      "category": "Dog Accessories",
      "subCategory": "Collars",
      "tags": ["leather", "classic", "durable", "adjustable", "brown"],
      "createdAt": "2024-09-15T08:30:00Z",
      "updatedAt": "2025-01-10T14:45:22Z"
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 10
}
```

### Get Featured Products
```http
GET /api/products/featured?limit=3
```

**Curl Command:**
```bash
curl -X GET "http://localhost:3000/api/products/featured?limit=3"
```

Returns a list of featured products, sorted by creation date (newest first).

**Query Parameters:**
- `limit` (optional): Number of featured products to return (default: 3)

**Response Example:**
```json
[
  {
    "id": "col-001",
    "name": "Classic Leather Dog Collar",
    "description": "Handcrafted genuine leather dog collar with brass hardware for durability and style.",
    "price": 29.99,
    "image": "classic-leather-collar.svg",
    "category": "Dog Accessories",
    "subCategory": "Collars",
    "tags": ["leather", "classic", "durable", "adjustable", "brown"],
    "createdAt": "2024-09-15T08:30:00Z",
    "updatedAt": "2025-01-10T14:45:22Z"
  }
]
```

### Get Single Product
```http
GET /api/products/{id}
```

**Curl Command:**
```bash
curl -X GET "http://localhost:3000/api/products/col-001"
```

Retrieves a specific product by ID.

**Response:** Single product object or 404 if not found.

### Create Product
```http
POST /api/products
```

**Curl Command:**
```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Leather Dog Collar",
    "description": "Handcrafted genuine leather dog collar with brass hardware for durability and style.",
    "price": 29.99,
    "image": "classic-leather-collar.svg",
    "category": "Dog Accessories",
    "subCategory": "Collars",
    "tags": ["leather", "classic", "durable", "adjustable", "brown"]
  }'
```

Creates a new product.

**Request Body:**
```json
{
  "name": "Classic Leather Dog Collar",
  "description": "Handcrafted genuine leather dog collar with brass hardware for durability and style.",
  "price": 29.99,
  "image": "classic-leather-collar.svg",
  "category": "Dog Accessories",
  "subCategory": "Collars",
  "tags": ["leather", "classic", "durable", "adjustable", "brown"]
}
```

**Required Fields:**
- `name`: String
- `description`: String
- `price`: Number (positive)
- `image`: String
- `category`: String
- `subCategory`: String
- `tags`: Array of strings (non-empty)

**Response:** Created product object with generated ID and timestamps (Status: 201)

### Update Product
```http
PUT /api/products/{id}
```

**Curl Command:**
```bash
curl -X PUT "http://localhost:3000/api/products/col-001" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Leather Dog Collar",
    "price": 34.99,
    "tags": ["premium", "leather", "updated"]
  }'
```

Updates an existing product.

**Request Body:** Same as create product, all fields optional
**Response:** Updated product object or 404 if not found

### Delete Product
```http
DELETE /api/products/{id}
```

**Curl Command:**
```bash
curl -X DELETE "http://localhost:3000/api/products/col-001"
```

Deletes a product.

**Response:** Empty response (Status: 204) or 404 if not found

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error Response Format:
```json
{
  "message": "Error description"
}
```

## Testing with Curl

To pretty-print JSON responses, you can pipe the curl output through `jq`:

```bash
# Install jq if not already installed
# macOS: brew install jq
# Ubuntu/Debian: sudo apt-get install jq

# Example: Get products with formatted JSON output
curl -X GET "http://localhost:3000/api/products" | jq '.'
```