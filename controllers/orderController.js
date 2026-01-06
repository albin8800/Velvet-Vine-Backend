import Order from '../models/Order.js';

// (User)

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || items.length === 0 || totalAmount === undefined) {
            return res.status(400).json({
                message: "Invalid order data."
            })
        }
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount
        });

        res.status(201).json({
            message: "Order created successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// (User)
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ 
            user: req.user._id
        })
        .populate('items.product', 'name price');

        res.json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// (admin)

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "email role")
        .populate("items.product", "name price");

        res.json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { createOrder, getMyOrders, getAllOrders };