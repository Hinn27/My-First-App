// filepath: /home/hinne/Documents/Code/FullStack_App/My-First-App/app/cart.js
// Screen: Cart - Giỏ hàng
/* Chức năng:
 * - Hiển thị danh sách sản phẩm trong giỏ hàng
 * - Tăng/giảm số lượng sản phẩm
 * - Tính tổng tiền tự động
 * - Xóa giỏ hàng
 * - Chuyển đến thanh toán
 * - Sử dụng Zustand store để quản lý state
 */
import React from "react";
import { View, StyleSheet, FlatList, Alert, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, Card, IconButton } from "react-native-paper";
import { useTheme } from "../src/context/ThemeContext";
import { useProductStore } from "../src/store/productStore";
import { useUserStore } from "../src/store/userStore"; // Import user store
import CartItemCard from "../src/components/CartItemCard";
import ScreenWrapper from "../src/components/ScreenWrapper";

export default function CartScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // Zustand store
    const cartList = useProductStore((state) => state.cartList);
    const cartPrice = useProductStore((state) => state.cartPrice);
    const incrementCartItemQuantity = useProductStore(
        (state) => state.incrementCartItemQuantity
    );
    const decrementCartItemQuantity = useProductStore(
        (state) => state.decrementCartItemQuantity
    );
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );
    const clearCart = useProductStore((state) => state.clearCart);
    const user = useUserStore((state) => state.user); // Get user from store

    const styles = createStyles(theme);

    // Handlers
    const handleIncrement = (id, size) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const handleDecrement = (id, size) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const handleCheckout = () => {
        if (cartList.length === 0) {
            Alert.alert(
                "Giỏ hàng trống",
                "Vui lòng thêm sản phẩm trước khi thanh toán"
            );
            return;
        }

        // Check login requirement
        if (!user) {
            Alert.alert(
                "Yêu cầu đăng nhập",
                "Bạn cần đăng nhập để tiếp tục đặt hàng.",
                [
                    {
                        text: "Để sau",
                        style: "cancel",
                    },
                    {
                        text: "Đăng nhập ngay",
                        onPress: () => router.push("/auth/login"),
                    },
                ]
            );
            return;
        }

        router.push("/payment");
    };

    const handleClearCart = () => {
        Alert.alert("Xóa giỏ hàng", "Bạn có chắc muốn xóa tất cả sản phẩm?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: () => {
                    clearCart();
                    Alert.alert("Thành công", "Đã xóa giỏ hàng!");
                },
            },
        ]);
    };

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {cartList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconButton
                        icon="cart-outline"
                        size={80}
                        iconColor={theme.onSurfaceVariant}
                    />
                    <Text variant="headlineMedium" style={styles.emptyText}>
                        Giỏ hàng trống
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtext}>
                        Thêm sản phẩm để bắt đầu mua sắm
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => router.push("/")}
                        style={styles.shopButton}
                    >
                        Tiếp tục mua sắm
                    </Button>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CartItemCard
                                {...item}
                                theme={theme}
                                incrementHandler={handleIncrement}
                                decrementHandler={handleDecrement}
                            />
                        )}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />

                    <Card style={styles.footer} mode="elevated">
                        <Card.Content>
                            <View style={styles.totalContainer}>
                                <Text
                                    variant="titleLarge"
                                    style={styles.totalLabel}
                                >
                                    Tổng cộng:
                                </Text>
                                <Text
                                    variant="headlineSmall"
                                    style={styles.totalPrice}
                                >
                                    {Number.parseInt(
                                        cartPrice || 0
                                    ).toLocaleString("vi-VN")}{" "}
                                    đ
                                </Text>
                            </View>

                            <Button
                                mode="contained"
                                icon="check-circle"
                                onPress={handleCheckout}
                                style={styles.checkoutButton}
                                contentStyle={styles.checkoutButtonContent}
                            >
                                Xác nhận đặt hàng
                            </Button>

                            <Button
                                mode="text"
                                textColor={theme.error}
                                onPress={handleClearCart}
                                style={styles.clearButton}
                            >
                                Xóa giỏ hàng
                            </Button>
                        </Card.Content>
                    </Card>
                </>
            )}
        </ScreenWrapper>
    );
}

// Dynamic styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        emptyText: {
            marginTop: 20,
            textAlign: "center",
        },
        emptySubtext: {
            marginTop: 8,
            textAlign: "center",
        },
        shopButton: {
            marginTop: 24,
        },
        listContainer: {
            padding: 16,
            paddingBottom: 200,
        },
        footer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: 0,
            borderRadius: 0,
        },
        totalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        totalLabel: {
            color: theme.onSurface,
        },
        totalPrice: {
            color: theme.primary,
        },
        checkoutButton: {
            marginBottom: 8,
        },
        checkoutButtonContent: {
            paddingVertical: 8,
        },
        clearButton: {
            marginTop: 4,
        },
    });
