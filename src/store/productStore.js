import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produce } from 'immer';

// Import data
import DrinkData from '../data/DrinkData';
import FoodData from '../data/FoodData';

export const useProductStore = create(
    persist(
        (set, get) => ({
            // State
            drinkList: DrinkData,
            foodList: FoodData,
            favoritesList: [],
            cartList: [],
            cartPrice: 0,
            orderHistoryList: [],

            // Actions - Add to Cart
            addToCart: (cartItem) =>
                set(
                    produce((state) => {
                        let found = false;
                        for (let i = 0; i < state.cartList.length; i++) {
                            if (state.cartList[i].id === cartItem.id) {
                                found = true;
                                let sizeFound = false;
                                for (
                                    let j = 0;
                                    j < state.cartList[i].prices.length;
                                    j++
                                ) {
                                    if (
                                        state.cartList[i].prices[j].size ===
                                        cartItem.prices[0].size
                                    ) {
                                        sizeFound = true;
                                        state.cartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                                if (!sizeFound) {
                                    state.cartList[i].prices.push(
                                        cartItem.prices[0],
                                    );
                                }
                                state.cartList[i].prices.sort((a, b) => {
                                    if (a.size > b.size) return -1;
                                    if (a.size < b.size) return 1;
                                    return 0;
                                });
                                break;
                            }
                        }
                        if (!found) {
                            state.cartList.push(cartItem);
                        }
                    }),
                ),

            // Calculate Cart Price
            calculateCartPrice: () =>
                set(
                    produce((state) => {
                        let totalPrice = 0;
                        for (let i = 0; i < state.cartList.length; i++) {
                            let tempPrice = 0;
                            for (
                                let j = 0;
                                j < state.cartList[i].prices.length;
                                j++
                            ) {
                                tempPrice +=
                                    parseFloat(
                                        state.cartList[i].prices[j].price,
                                    ) * state.cartList[i].prices[j].quantity;
                            }
                            state.cartList[i].itemPrice = tempPrice
                                .toFixed(0)
                                .toString();
                            totalPrice += tempPrice;
                        }
                        state.cartPrice = totalPrice.toFixed(0).toString();
                    }),
                ),

            // Add to Favorites
            addToFavoriteList: (type, id) =>
                set(
                    produce((state) => {
                        const list =
                            type === 'Drink' ? state.drinkList : state.foodList;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].id === id) {
                                if (!list[i].favourite) {
                                    list[i].favourite = true;
                                    state.favoritesList.unshift(list[i]);
                                }
                                break;
                            }
                        }
                    }),
                ),

            // Delete from Favorites
            deleteFromFavoriteList: (type, id) =>
                set(
                    produce((state) => {
                        const list =
                            type === 'Drink' ? state.drinkList : state.foodList;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].id === id) {
                                if (list[i].favourite) {
                                    list[i].favourite = false;
                                }
                                break;
                            }
                        }
                        const favIndex = state.favoritesList.findIndex(
                            (item) => item.id === id,
                        );
                        if (favIndex !== -1) {
                            state.favoritesList.splice(favIndex, 1);
                        }
                    }),
                ),

            // Increment Cart Item Quantity
            incrementCartItemQuantity: (id, size) =>
                set(
                    produce((state) => {
                        for (let i = 0; i < state.cartList.length; i++) {
                            if (state.cartList[i].id === id) {
                                for (
                                    let j = 0;
                                    j < state.cartList[i].prices.length;
                                    j++
                                ) {
                                    if (
                                        state.cartList[i].prices[j].size ===
                                        size
                                    ) {
                                        state.cartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                            }
                        }
                    }),
                ),

            // Decrement Cart Item Quantity
            decrementCartItemQuantity: (id, size) =>
                set(
                    produce((state) => {
                        for (let i = 0; i < state.cartList.length; i++) {
                            if (state.cartList[i].id === id) {
                                for (
                                    let j = 0;
                                    j < state.cartList[i].prices.length;
                                    j++
                                ) {
                                    if (
                                        state.cartList[i].prices[j].size ===
                                        size
                                    ) {
                                        if (
                                            state.cartList[i].prices[j]
                                                .quantity > 1
                                        ) {
                                            state.cartList[i].prices[j]
                                                .quantity--;
                                        } else {
                                            state.cartList[i].prices.splice(
                                                j,
                                                1,
                                            );
                                        }
                                        break;
                                    }
                                }
                                if (state.cartList[i].prices.length === 0) {
                                    state.cartList.splice(i, 1);
                                }
                            }
                        }
                    }),
                ),

            // Add to Order History from Cart
            addToOrderHistoryFromCart: () =>
                set(
                    produce((state) => {
                        const orderDate = new Date().toDateString();
                        const orderTime = new Date()
                            .toTimeString()
                            .split(' ')[0];

                        const temp = state.cartList.reduce((acc, item) => {
                            acc.push({ ...item });
                            return acc;
                        }, []);

                        if (state.orderHistoryList.length > 0) {
                            state.orderHistoryList.unshift({
                                orderDate,
                                orderTime,
                                cartList: temp,
                                cartListPrice: state.cartPrice,
                            });
                        } else {
                            state.orderHistoryList = [
                                {
                                    orderDate,
                                    orderTime,
                                    cartList: temp,
                                    cartListPrice: state.cartPrice,
                                },
                            ];
                        }
                        state.cartList = [];
                        state.cartPrice = 0;
                    }),
                ),

            // Clear Cart
            clearCart: () =>
                set(
                    produce((state) => {
                        state.cartList = [];
                        state.cartPrice = 0;
                    }),
                ),

            // Add Product (for sellers)
            addProduct: (product) =>
                set(
                    produce((state) => {
                        if (
                            product.type === 'Coffee' ||
                            product.type === 'Bean'
                        ) {
                            state.drinkList.push(product);
                        } else {
                            state.foodList.push(product);
                        }
                    }),
                ),

            // Delete Product (for sellers)
            deleteProduct: (productId, productType) =>
                set(
                    produce((state) => {
                        if (
                            productType === 'Coffee' ||
                            productType === 'Bean'
                        ) {
                            state.drinkList = state.drinkList.filter(
                                (item) => item.id !== productId,
                            );
                        } else {
                            state.foodList = state.foodList.filter(
                                (item) => item.id !== productId,
                            );
                        }
                    }),
                ),
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
