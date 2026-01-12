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
   
        export { addToCart, getCart };
