import { Product } from '@chasing-ridges/products';
import { ProductsRepository, PaginatedResult } from '../repositories/products.repository';

export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.repository.create(productData);
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Product>> {
    // Ensure valid pagination parameters
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit)); // Cap at 100 items per page
    return this.repository.findAll(validPage, validLimit);
  }

  async findOne(id: string): Promise<Product | null> {
    return this.repository.findOne(id);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const existingProduct = await this.repository.findOne(id);
    if (!existingProduct) {
      return null;
    }
    return this.repository.update(id, productData);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getFeatured(limit = 3): Promise<Product[]> {
    // Business logic for featured products:
    // Get all products and select the top N most recently created
    const { items } = await this.repository.findAll(1, 100);
    return items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
} 