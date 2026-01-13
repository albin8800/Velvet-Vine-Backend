



import Order from "../models/Order.js";
import User from "../models/User.js";

// (User)
const createOrder = async (req, res) => {
    try {
        // Fetch user with cart
        const user = await User.findById(req.user._id)
            .populate("cart.product");

        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty."
            });
        }

        // Build order items from cart
        const items = user.cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        // Calculate total on backend
        const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount
        });

        // Clear cart after order
        user.cart = [];
        await user.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


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