import axios from 'axios';
import { Product } from '@chasing-ridges/products';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('Products API', () => {
  let createdProductId: string;
  
  const testProduct = {
    name: 'Classic Leather Dog Collar',
    description: 'Handcrafted genuine leather dog collar with brass hardware for durability and style.',
    price: 29.99,
    image: 'classic-leather-collar.svg',
    category: 'Dog Accessories',
    subCategory: 'Collars',
    tags: ['leather', 'classic', 'durable', 'adjustable', 'brown']
  };

  const updatedProduct = {
    name: 'Updated Leather Dog Collar',
    description: 'Premium leather dog collar with updated features and design.',
    price: 34.99,
    image: 'updated-leather-collar.svg',
    category: 'Dog Accessories',
    subCategory: 'Collars',
    tags: ['premium', 'leather', 'updated', 'luxury', 'brown']
  };

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const response = await axios.post(`${API_URL}/api/products`, testProduct);
      
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(testProduct);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeDefined();
      expect(response.data.updatedAt).toBeDefined();
      expect(Array.isArray(response.data.tags)).toBe(true);
      expect(response.data.tags).toEqual(expect.arrayContaining(testProduct.tags));
      
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
      expect(Array.isArray(response.data.tags)).toBe(true);
      expect(response.data.tags).toEqual(expect.arrayContaining(updatedProduct.tags));
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

  describe('GET /api/products/featured', () => {
    it('should return a list of featured products with default limit of 3', async () => {
      const response = await axios.get(`${API_URL}/api/products/featured`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBe(3);
      
      // Verify each product has required fields
      response.data.forEach((product: Product) => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.image).toBeDefined();
        expect(product.category).toBeDefined();
        expect(product.subCategory).toBeDefined();
        expect(Array.isArray(product.tags)).toBe(true);
        expect(product.createdAt).toBeDefined();
        expect(product.updatedAt).toBeDefined();
      });
    });

    it('should return 4 products when limit is set to 4', async () => {
      const response = await axios.get(`${API_URL}/api/products/featured?limit=4`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBe(4);
    });
  });
});
