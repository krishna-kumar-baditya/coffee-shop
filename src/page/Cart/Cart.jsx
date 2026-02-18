import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from "../../Redux/Slice/cartSlice";
import toast from "react-hot-toast";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartKey?.items || []);
    const { isLogin } = useSelector((state) => state.authKey);
    const { isUserLoggedIn } = useSelector((state) => state.userAuthKey);

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleIncrement = (productId) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementQuantity(productId));
    };

    const handleRemove = (productId, title) => {
        dispatch(removeFromCart(productId));
        toast.success(`${title} removed from cart`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
    };
    console.log("isLogin ",isLogin);
    console.log("isUserLoggedIn ",isUserLoggedIn);
    
    // Redirect to sign in if not logged in
    if(!isLogin){

        if (!isUserLoggedIn ) {
            return (
                <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
                    <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-amber-100 max-w-md">
                        <h2 className="text-2xl font-bold text-amber-900 mb-4">
                            Please Sign In
                        </h2>
                        <p className="text-amber-700 mb-6">
                            You need to be signed in to view your cart.
                        </p>
                        <Link
                            to="/user/signin"
                            className="inline-block bg-amber-900 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-amber-800 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-amber-900 mb-8">
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-amber-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-amber-300 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-amber-800 mb-2">
                            Your cart is empty
                        </h3>
                        <p className="text-amber-600 mb-6">
                            Start adding some delicious coffee to your cart!
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-amber-900 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-amber-800 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex gap-6"
                                >
                                    {/* Product Image */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-amber-400 text-3xl">☕</span>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-amber-900 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-2xl font-extrabold text-amber-900 mb-4">
                                            ₹{item.price.toFixed(2)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-2">
                                                <button
                                                    onClick={() => handleDecrement(item.id)}
                                                    className="p-1 text-amber-700 hover:text-amber-900 hover:bg-amber-200 rounded-lg transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M20 12H4"
                                                        />
                                                    </svg>
                                                </button>
                                                <span className="text-amber-900 font-semibold min-w-[30px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrement(item.id)}
                                                    className="p-1 text-amber-700 hover:text-amber-900 hover:bg-amber-200 rounded-lg transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.id, item.title)}
                                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-amber-900">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart Button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sticky top-4">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-amber-700">
                                        <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                        <span className="font-semibold">₹{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-amber-700">
                                        <span>Shipping</span>
                                        <span className="font-semibold">Free</span>
                                    </div>
                                    <div className="border-t border-amber-200 pt-4">
                                        <div className="flex justify-between text-amber-900">
                                            <span className="text-xl font-bold">Total</span>
                                            <span className="text-2xl font-extrabold">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-amber-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-amber-800 transition-colors mb-4"
                                >
                                    Proceed to Checkout
                                </button>

                                <Link
                                    to="/products"
                                    className="block text-center text-amber-700 hover:text-amber-900 font-medium"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;

