import express from 'express';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import { createOrder, getAllOrders, getMyOrders } from '../controllers/orderController.js';


const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);

router.get('/', protect, adminOnly, getAllOrders)

export default router;