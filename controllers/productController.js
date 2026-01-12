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
        const { name, price, image } = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({
                message: "Name, price, and image are required fields."
            });
        }

        const product = await Product.create({ name, price, image });
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

//(public)

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product || !product.isActive) {
            return res.status(401).json({
                message: "Product not found or inactive."
            });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getProducts, createProduct, getProductById };