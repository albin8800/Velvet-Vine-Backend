import Product from '../models/Product.js';

//(Public)

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json({ success: true, products });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//(admin only)

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Name and price are required fields."
            });
        }

        const product = await Product.create({ name, price });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { getProducts, createProduct };