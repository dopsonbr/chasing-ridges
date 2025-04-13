import { Request, Response } from 'express';
import { Product } from '@chasing-ridges/products';
import { ProductsService } from '../services/products.service';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductValidation, ValidationError } from '../validation/product.validation';

export class ProductsController {
  private readonly service: ProductsService;

  constructor() {
    // Initialize repository and service
    const repository = new ProductsRepository();
    this.service = new ProductsService(repository);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request data
      ProductValidation.validateCreate(req.body);
      
      // Delegate to service
      const product = await this.service.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // Parse and validate pagination parameters
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
      
      // Delegate to service
      const result = await this.service.findAll(page, limit);
      res.json(result);
    } catch (error) {
      console.error('Error finding products:', error);
      res.status(500).json({ message: 'Error retrieving products' });
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.service.findOne(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error finding product:', error);
      res.status(500).json({ message: 'Error retrieving product' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request data
      ProductValidation.validateUpdate(req.body);
      
      // Delegate to service
      const product = await this.service.update(req.params.id, req.body);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await this.service.delete(req.params.id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };

  getFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
      // Parse and validate limit parameter
      const limit = Math.max(1, parseInt(req.query.limit as string) || 3);
      
      const products = await this.service.getFeatured(limit);
      res.json(products);
    } catch (error) {
      console.error('Error getting featured products:', error);
      res.status(500).json({ message: 'Error retrieving featured products' });
    }
  };
} 