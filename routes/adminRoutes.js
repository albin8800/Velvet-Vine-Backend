import express from 'express';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", protect, adminOnly, (req, res) => {
    res.json({
        success: true,
        message: "Admin route working"
    })
})
export default router;