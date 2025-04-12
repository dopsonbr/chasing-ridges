import axios from 'axios';
import { Product } from '@chasing-ridges/products';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('Products API', () => {
  let createdProductId: string;
  
  const testProduct = {
    name: 'Test Product',
    description: 'A test product description',
    price: 99.99,
    image: 'https://example.com/test.jpg',
    category: 'Electronics',
    subCategory: 'Gadgets'
  };

  const updatedProduct = {
    name: 'Updated Product',
    description: 'An updated product description',
    price: 149.99,
    image: 'https://example.com/updated.jpg',
    category: 'Electronics',
    subCategory: 'Accessories'
  };

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const response = await axios.post(`${API_URL}/api/products`, testProduct);
      
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(testProduct);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeDefined();
      expect(response.data.updatedAt).toBeDefined();
      
      createdProductId = response.data.id;
    });

    it('should validate required fields', async () => {
      try {
        await axios.post(`${API_URL}/api/products`, { name: 'Invalid Product' });
        fail('Should have thrown validation error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBeDefined();
      }
    });
  });

  describe('GET /api/products', () => {
    it('should return a list of products with pagination', async () => {
      const response = await axios.get(`${API_URL}/api/products`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.items)).toBe(true);
      expect(response.data.items.length).toBeGreaterThan(0);
      expect(response.data.items[0]).toMatchObject(expect.objectContaining(testProduct));
      expect(response.data.total).toBeDefined();
      expect(response.data.page).toBe(1);
      expect(response.data.limit).toBe(10);
    });

    it('should support custom pagination parameters', async () => {
      const response = await axios.get(`${API_URL}/api/products?page=2&limit=5`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.items)).toBe(true);
      expect(response.data.total).toBeDefined();
      expect(response.data.page).toBe(2);
      expect(response.data.limit).toBe(5);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a single product', async () => {
      const response = await axios.get(`${API_URL}/api/products/${createdProductId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject(testProduct);
      expect(response.data.id).toBe(createdProductId);
    });

    it('should return 404 for non-existent product', async () => {
      try {
        await axios.get(`${API_URL}/api/products/nonexistent-id`);
        fail('Should have thrown not found error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update an existing product', async () => {
      const response = await axios.put(
        `${API_URL}/api/products/${createdProductId}`,
        updatedProduct
      );
      
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject(updatedProduct);
      expect(response.data.id).toBe(createdProductId);
      expect(new Date(response.data.updatedAt)).toBeInstanceOf(Date);
    });

    it('should return 404 for updating non-existent product', async () => {
      try {
        await axios.put(`${API_URL}/api/products/nonexistent-id`, updatedProduct);
        fail('Should have thrown not found error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete an existing product', async () => {
      const response = await axios.delete(`${API_URL}/api/products/${createdProductId}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 for deleting non-existent product', async () => {
      try {
        await axios.delete(`${API_URL}/api/products/nonexistent-id`);
        fail('Should have thrown not found error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});
