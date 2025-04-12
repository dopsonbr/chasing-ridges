import { Request, Response } from 'express';
import { Product } from '@chasing-ridges/products';
import { ProductsService, ValidationError } from '../services/products.service';

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productsService.create(req.body);
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.productsService.findAll(page, limit);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error finding products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productsService.findOne(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error finding product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productsService.update(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
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
      const success = await this.productsService.delete(req.params.id);
      if (!success) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
} 