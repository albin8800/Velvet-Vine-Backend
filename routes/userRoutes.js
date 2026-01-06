import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", protect, (req, res) => {
    res.json({
        success: true,
        message: "User route working"
    })
})
export default router;