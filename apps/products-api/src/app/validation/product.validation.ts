import { Product } from '@chasing-ridges/products';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ProductValidation {
  static validateCreate(data: any): void {
    const requiredFields = ['name', 'description', 'price', 'image', 'category', 'subCategory', 'tags'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new ValidationError(`Missing required field: ${field}`);
      }
    }

    if (typeof data.price !== 'number' || data.price <= 0) {
      throw new ValidationError('Price must be a positive number');
    }

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      throw new ValidationError('Tags must be a non-empty array');
    }

    // Validate string fields have content
    const stringFields = ['name', 'description', 'image', 'category', 'subCategory'];
    for (const field of stringFields) {
      if (typeof data[field] !== 'string' || data[field].trim().length === 0) {
        throw new ValidationError(`${field} must be a non-empty string`);
      }
    }
  }

  static validateUpdate(data: Partial<Product>): void {
    // For updates, only validate fields that are present
    if (data.price !== undefined && (typeof data.price !== 'number' || data.price <= 0)) {
      throw new ValidationError('Price must be a positive number');
    }

    if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.length === 0)) {
      throw new ValidationError('Tags must be a non-empty array');
    }

    // Validate string fields if present
    const stringFields = ['name', 'description', 'image', 'category', 'subCategory'] as const;
    for (const field of stringFields) {
      if (data[field] !== undefined && (typeof data[field] !== 'string' || data[field]!.trim().length === 0)) {
        throw new ValidationError(`${field} must be a non-empty string`);
      }
    }
  }
} 