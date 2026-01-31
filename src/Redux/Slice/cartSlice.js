import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem("userCart");
        if (cartData) {
            return JSON.parse(cartData);
        }
    } catch (error) {
        console.error("Error loading cart from storage:", error);
    }
    return [];
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem("userCart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to storage:", error);
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === product._id || item.id === product.id
            );

            if (existingItem) {
                // If item exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // Add new item to cart
                state.items.push({
                    id: product._id || product.id,
                    title: product.name || product.title,
                    price: product.price,
                    image: product.image || "",
                    quantity: 1,
                });
            }

            // Save to localStorage
            saveCartToStorage(state.items);
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find(
                (item) => item.id === productId
            );

            if (item) {
                item.quantity += 1;
                saveCartToStorage(state.items);
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find(
                (item) => item.id === productId
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToStorage(state.items);
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(
                (item) => item.id !== productId
            );
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("userCart");
        },
    },
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

