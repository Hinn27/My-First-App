// Context quản lý giỏ hàng
/* Vai trò:
 * Quản lý state và logic của giỏ hàng
 * Cung cấp các hàm: addToCart, removeFromCart, updateQuantity, clearCart
 */

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);

            if (existingItem) {
                // Nếu sản phẩm đã có, tăng số lượng
                return prevItems.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                // Thêm sản phẩm mới với quantity = 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCartItems([]);
    };

    // Tính tổng tiền
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price || 0) * item.quantity;
        }, 0);
    };

    // Tổng số lượng sản phẩm
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart phải được sử dụng trong CartProvider');
    }
    return context;
}
