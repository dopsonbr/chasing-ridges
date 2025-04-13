import { Product } from '@chasing-ridges/products';
import { v4 as uuidv4 } from 'uuid';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export class ProductsService {
  private products: Product[] = [];

  private validateProduct(data: Partial<Product>): void {
    const requiredFields = ['name', 'description', 'price', 'image', 'category', 'subCategory'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (typeof data.price !== 'number' || data.price <= 0) {
      throw new ValidationError('Price must be a positive number');
    }
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    this.validateProduct(data);
    
    const now = new Date();
    const product: Product = {
      id: uuidv4(),
      ...data,
      createdAt: now,
      updatedAt: now
    };

    this.products.push(product);
    return product;
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Product>> {
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      items: this.products.slice(start, end),
      total: this.products.length,
      page,
      limit
    };
  }

  async findOne(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async update(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.validateProduct({ ...this.products[index], ...data });

    const updatedProduct: Product = {
      ...this.products[index],
      ...data,
      updatedAt: new Date()
    };

    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }

  async getFeatured(limit?: number): Promise<Product[]> {
    // For now, we'll consider the most recently added products as featured
    // In a real application, you might have a 'featured' flag or more complex logic
    console.log('Current products:', this.products);
    console.log('Products length:', this.products.length);
    
    const products = [...this.products].reverse(); // Most recent products are at the end
    console.log('Reversed products:', products);
    
    const result = limit ? products.slice(0, limit) : products;
    console.log('Result:', result);
    
    return result;
  }
} 