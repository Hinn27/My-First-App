// Screen: Free Food - Quán ăn 0 đồng
/*
 * Chức năng:
 * Hiển thị danh sách các món ăn 0 đồng (từ thiện)
 * Tab riêng biệt thay thế cho Giỏ hàng
 */

import React from "react";
import { StyleSheet, FlatList, StatusBar, Platform, Alert } from "react-native";
import {} from "react-native-paper";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../src/context/ThemeContext";
import { useProductStore } from "../../src/store/productStore";
import { useUserStore } from "../../src/store/userStore";
import ProductCard from "../../src/components/ProductCard";
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { helpData } from "../../src/data/helpData"; // Data riêng cho quán 0 đồng

export default function FreeFoodScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Zustand store
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );

    // User store
    const user = useUserStore((state) => state.user);

    // Data is helpData directly
    const freeFoodList = helpData;

    // Handlers
    const handleAddToCart = (item) => {
        if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        // Default price structure for helpData (price is 0)
        const defaultPrice = {
            size: "M",
            price: 0,
            currency: "đ",
        };

        addToCart({
            id: item.id,
            index: 0, // Dummy index
            name: item.name,
            roasted: "",
            imageIcon: "",
            special_ingredient: "Suất ăn 0 đồng",
            type: "Food",
            prices: [{ ...defaultPrice, quantity: 1 }],
            restaurantName: "Quán 0 Đồng",
        });
        calculateCartPrice();
        Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`, [
            { text: "OK" },
        ]);
    };

    const handleFavorite = (id, favourite, type) => {
        if (!user) {
            Alert.alert(
                "Thông báo",
                "Vui lòng đăng nhập để thêm vào yêu thích"
            );
            return;
        }
        // Note: Favorites logic might need update if item is not in main foodList,
        // but for UI responsiveness we can just show alert or dummy toggle
        Alert.alert(
            "Thông báo",
            "Tính năng yêu thích cho món 0 đồng đang cập nhật"
        );
    };

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            <FlatList
                data={freeFoodList}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        {...item}
                        theme={theme}
                        onPress={() => {}} // Disable detail for now
                        onAddToCart={() => handleAddToCart(item)}
                        onFavoritePress={() =>
                            handleFavorite(item.id, item.favourite, "Food")
                        }
                    />
                )}
            />
        </ScreenWrapper>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        productList: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        productRow: {
            justifyContent: "space-between",
        },
    });
