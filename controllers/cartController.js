import User from "../models/User.js";


        const addToCart = async ( req, res ) => {
            const user = await User.findById(req.user.id);
            const { productId } = req.body;

            const itemIndex = user.cart.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                user.cart[itemIndex].quantity += 1;
            } else {
                user.cart.push({ product: productId });
            }
            await user.save();
            res.status(200).json({ success: true, cart: user.cart } );
        }

        const getCart = async (req, res) => {
            const user = await User.findById(req.user.id).populate("cart.product");
            res.status(200).json({ success: true, cart: user.cart });
        }

        const updateCartItem = async (req, res) => {
            const { productId, quantity } = req.body;
            if (!productId || !quantity || quantity < 1) {
                return res.status(400).json({ success: false, message: "Invalid input" });
            }

            const user = await User.findById(req.user.id);
            const item = user.cart.find(
                (i) => i.product.toString() === productId
            );

            if (!item) {
                return res.status(404).json({ success: false, message: "Item not found in cart" });
            }
            item.quantity = quantity;
            await user.save();
            res.status(200).json({ success: true, cart: user.cart });
        }

        const removeFromCart = async (req, res) => {
            const { productId } = req.params;

            const user = await User.findById(req.user.id);
            user.cart = user.cart.filter(
                (i) => i.product.toString() !== productId
            );
            await user.save();
            res.status(200).json({ success: true, cart: user.cart });
        }
        export { addToCart, getCart, updateCartItem, removeFromCart };