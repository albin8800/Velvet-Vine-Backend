import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is Runnning",
    })

});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});