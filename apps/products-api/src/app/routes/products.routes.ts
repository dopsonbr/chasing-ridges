import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = Router();
const productsController = new ProductsController();

// Create a new product
router.post('/', productsController.create);

// Get all products with optional pagination
router.get('/', productsController.findAll);

// Get featured products
router.get('/featured', productsController.getFeatured);

// Get a single product by id
router.get('/:id', productsController.findOne);

// Update a product
router.put('/:id', productsController.update);

// Delete a product
router.delete('/:id', productsController.delete);

export default router; 