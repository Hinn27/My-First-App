import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import FoodData from "../data/FoodData";

export const useProductStore = create(
    persist(
        (set, _get) => {
            return {
                foodList: FoodData,
                drinkList: [],
                favoritesList: [],
                cartList: [],
                cartPrice: 0,
                orderHistoryList: [],
                viewedProducts: [], // Thêm state cho sản phẩm đã xem

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
                                            state.cartList[i].prices[j]
                                                .quantity++;
                                            break;
                                        }
                                    }
                                    if (!sizeFound) {
                                        state.cartList[i].prices.push(
                                            cartItem.prices[0]
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
                        })
                    ),

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
                                            state.cartList[i].prices[j].price
                                        ) *
                                        state.cartList[i].prices[j].quantity;
                                }
                                state.cartList[i].itemPrice = tempPrice
                                    .toFixed(0)
                                    .toString();
                                totalPrice += tempPrice;
                            }
                            state.cartPrice = totalPrice.toFixed(0).toString();
                        })
                    ),

                addToFavoriteList: (_type, id) =>
                    set(
                        produce((state) => {
                            const list = state.foodList;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].id === id) {
                                    if (!list[i].favourite) {
                                        list[i].favourite = true;
                                        state.favoritesList.unshift(list[i]);
                                    }
                                    break;
                                }
                            }
                        })
                    ),

                deleteFromFavoriteList: (_type, id) =>
                    set(
                        produce((state) => {
                            const list = state.foodList;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].id === id) {
                                    if (list[i].favourite) {
                                        list[i].favourite = false;
                                    }
                                    break;
                                }
                            }
                            const favIndex = state.favoritesList.findIndex(
                                (item) => item.id === id
                            );
                            if (favIndex !== -1) {
                                state.favoritesList.splice(favIndex, 1);
                            }
                        })
                    ),

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
                                            state.cartList[i].prices[j]
                                                .quantity++;
                                            break;
                                        }
                                    }
                                }
                            }
                        })
                    ),

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
                                                    1
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
                        })
                    ),

                addToOrderHistoryFromCart: () =>
                    set(
                        produce((state) => {
                            const orderDate = new Date().toDateString();
                            const orderTime = new Date()
                                .toTimeString()
                                .split(" ")[0];

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
                        })
                    ),

                clearCart: () =>
                    set(
                        produce((state) => {
                            state.cartList = [];
                            state.cartPrice = 0;
                        })
                    ),

                // Action xóa danh sách đã xem
                clearViewedProducts: () =>
                    set(
                        produce((state) => {
                            state.viewedProducts = [];
                        })
                    ),

                // Action xóa lịch sử đơn hàng
                clearOrderHistory: () =>
                    set(
                        produce((state) => {
                            state.orderHistoryList = [];
                        })
                    ),

                // Action xóa yêu thích
                clearFavorites: () =>
                    set(
                        produce((state) => {
                            state.favoritesList = [];
                            // Cũng reset favorite flag cho từng sản phẩm
                            state.foodList.forEach((item) => {
                                item.favourite = false;
                            });
                        })
                    ),

                addProduct: (product) =>
                    set(
                        produce((state) => {
                            state.foodList.unshift(product);
                        })
                    ),

                deleteProduct: (productId, _productType) =>
                    set(
                        produce((state) => {
                            state.foodList = state.foodList.filter(
                                (item) => item.id !== productId
                            );
                        })
                    ),

                // Action thêm vào danh sách đã xem
                addToViewedProducts: (product) =>
                    set(
                        produce((state) => {
                            // Xóa nếu đã tồn tại để đưa lên đầu
                            const index = state.viewedProducts.findIndex(
                                (item) => item.id === product.id
                            );
                            if (index !== -1) {
                                state.viewedProducts.splice(index, 1);
                            }
                            // Thêm vào đầu danh sách
                            state.viewedProducts.unshift(product);
                            // Giới hạn số lượng (ví dụ: 10 sản phẩm)
                            if (state.viewedProducts.length > 10) {
                                state.viewedProducts.pop();
                            }
                        })
                    ),
            };
        },
        {
            name: "product-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 19, // Tăng version để xóa món "Quán ăn 0 đồng"
            migrate: async (persistedState, version) => {
                if (version < 19) {
                    // Filter out "Quán ăn 0 đồng" items from foodList
                    const filteredFoodList = FoodData.filter(
                        (item) => item.category !== "Quán ăn 0 đồng"
                    );
                    return {
                        ...persistedState,
                        foodList: filteredFoodList,
                    };
                }
                return persistedState;
            },
        }
    )
);
