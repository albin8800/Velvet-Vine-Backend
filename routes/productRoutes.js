import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/', getProducts);

router.post('/', protect, adminOnly, createProduct);

export default router;