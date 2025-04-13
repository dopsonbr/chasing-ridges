import productsData from '../../assets/products-json.json';
import { Product } from '@chasing-ridges/products';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export class ProductsRepository {
  private products: Product[];

  constructor() {
    // Initialize with seed data, converting string dates to Date objects
    this.products = productsData.products.map(p => ({
      ...p,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt)
    }));
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<Product>> {
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

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const now = new Date();
    const newProduct: Product = {
      ...product,
      id: `prod-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...this.products[index],
      ...product,
      id, // Ensure ID doesn't change
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

  async getFeatured(): Promise<Product[]> {
    // For demo purposes, return first 6 products as featured
    return this.products.slice(0, 6);
  }
} 