import express from 'express';
import { createProduct, getProductById, getProducts } from '../controllers/productController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/', getProducts);

router.post('/', protect, adminOnly, createProduct);

router.get('/:id', getProductById);

export default router;