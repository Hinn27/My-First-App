// Screen: Order History - Lịch sử đơn hàng
/* Chức năng:
 * - Hiển thị danh sách đơn hàng đã đặt
 * - Xem chi tiết từng đơn hàng
 * - Hiển thị ngày giờ, tổng tiền
 * - Empty state khi chưa có đơn hàng
 */
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTheme } from "../src/context/ThemeContext";
import { useProductStore } from "../src/store/productStore";

export default function OrderHistoryScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Store
    const orderHistoryList = useProductStore((state) => state.orderHistoryList);

    const handleReview = (_orderId) => {
        Alert.alert("Đánh giá", "Tính năng đánh giá đang được phát triển");
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: true }} />
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {orderHistoryList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="receipt-outline"
                        size={80}
                        color={theme.onSurfaceVariant}
                    />
                    <Text style={styles.emptyText}>Chưa có đơn hàng</Text>
                    <Text style={styles.emptySubtext}>
                        Lịch sử đơn hàng của bạn sẽ hiển thị ở đây
                    </Text>
                    <Pressable
                        style={styles.shopButton}
                        onPress={() => router.push("/")}
                    >
                        <Text style={styles.shopButtonText}>
                            Bắt đầu mua sắm
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {orderHistoryList.map((order, index) => (
                        <View key={index} style={styles.orderCard}>
                            <LinearGradient
                                colors={
                                    theme.mode === "dark"
                                        ? ["#252A32", "#0C0F14"]
                                        : ["#FFFFFF", "#F7F8FB"]
                                }
                                style={styles.cardGradient}
                            >
                                {/* Order Header */}
                                <View style={styles.orderHeader}>
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderDate}>
                                            {order.orderDate}
                                        </Text>
                                        <Text style={styles.orderTime}>
                                            {order.orderTime}
                                        </Text>
                                    </View>
                                    <View style={styles.statusBadge}>
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={16}
                                            color="#4CAF50"
                                        />
                                        <Text style={styles.statusText}>
                                            Hoàn thành
                                        </Text>
                                    </View>
                                </View>

                                {/* Order Items */}
                                <View style={styles.itemsContainer}>
                                    {order.cartList.map((item, itemIndex) => (
                                        <View
                                            key={itemIndex}
                                            style={styles.orderItem}
                                        >
                                            <View style={styles.itemLeft}>
                                                <View style={styles.itemInfo}>
                                                    <Text
                                                        style={styles.itemName}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.itemSpecial
                                                        }
                                                    >
                                                        {
                                                            item.special_ingredient
                                                        }
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.itemRight}>
                                                {item.prices.map(
                                                    (price, priceIndex) => (
                                                        <View
                                                            key={priceIndex}
                                                            style={
                                                                styles.priceRow
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.sizeText
                                                                }
                                                            >
                                                                {price.size} x{" "}
                                                                {price.quantity}
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.priceText
                                                                }
                                                            >
                                                                {parseInt(
                                                                    price.price
                                                                ).toLocaleString(
                                                                    "vi-VN"
                                                                )}{" "}
                                                                đ
                                                            </Text>
                                                        </View>
                                                    )
                                                )}
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Order Total & Actions */}
                                <View style={styles.footerContainer}>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>
                                            Tổng cộng:
                                        </Text>
                                        <Text style={styles.totalValue}>
                                            {parseInt(
                                                order.cartListPrice
                                            ).toLocaleString("vi-VN")}{" "}
                                            đ
                                        </Text>
                                    </View>

                                    <View style={styles.actionRow}>
                                        <Pressable
                                            style={styles.reviewButton}
                                            onPress={() => handleReview(index)}
                                        >
                                            <Ionicons
                                                name="star-outline"
                                                size={16}
                                                color={theme.primary}
                                            />
                                            <Text
                                                style={styles.reviewButtonText}
                                            >
                                                Đánh giá quán
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={styles.reorderButton}
                                            onPress={() => {
                                                // Reorder logic would go here
                                                router.push("/");
                                            }}
                                        >
                                            <Text
                                                style={styles.reorderButtonText}
                                            >
                                                Mua lại
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

// Dynamic styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-between', // Removed to align left
            paddingHorizontal: 16,
            paddingVertical: 12,
            paddingTop:
                Platform.OS === "android"
                    ? (StatusBar.currentHeight || 24) + 12
                    : 50, // Padding top safe area
            borderBottomWidth: 0.5,
            borderBottomColor: theme.outlineVariant,
            backgroundColor: theme.surface, // Ensure header has background
        },
        backButton: {
            padding: 4,
            // Không cần width/height cố định nếu muốn nút gọn hơn
            justifyContent: "center",
            alignItems: "center",
        },
        headerTitle: {
            fontSize: 18, // Giảm font size xuống 18 cho đồng bộ
            fontWeight: "600", // Giảm weight xuống 600
            color: theme.onBackground,
            flex: 1,
            marginLeft: 16, // Khoảng cách vừa phải với nút back
            textAlign: "left", // Căn trái thay vì giữa
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        emptyText: {
            fontSize: 24,
            fontWeight: "700",
            color: theme.onBackground,
            marginTop: 20,
        },
        emptySubtext: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 8,
            textAlign: "center",
        },
        shopButton: {
            marginTop: 24,
            backgroundColor: theme.primary,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
        },
        shopButtonText: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
        },
        scrollContent: {
            padding: 20,
        },
        orderCard: {
            marginBottom: 16,
        },
        cardGradient: {
            borderRadius: 16,
            padding: 16,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        orderHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
        },
        orderInfo: {
            gap: 4,
        },
        orderDate: {
            fontSize: 16,
            fontWeight: "700",
            color: theme.onSurface,
        },
        orderTime: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        statusBadge: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
        },
        statusText: {
            fontSize: 13,
            fontWeight: "600",
            color: "#4CAF50",
        },
        itemsContainer: {
            gap: 12,
            marginBottom: 16,
        },
        orderItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        itemLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            flex: 1,
        },
        itemInfo: {
            flex: 1,
            gap: 2,
        },
        itemName: {
            fontSize: 15,
            fontWeight: "600",
            color: theme.onSurface,
        },
        itemSpecial: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
        },
        itemRight: {
            alignItems: "flex-end",
            gap: 4,
        },
        priceRow: {
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
        },
        sizeText: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        priceText: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.primary,
        },
        footerContainer: {
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
        },
        totalRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        totalLabel: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.onSurface,
        },
        totalValue: {
            fontSize: 20,
            fontWeight: "700",
            color: theme.primary,
        },
        actionRow: {
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 12,
        },
        reviewButton: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.primary,
            gap: 6,
        },
        reviewButtonText: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.primary,
        },
        reorderButton: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: theme.primary,
        },
        reorderButtonText: {
            fontSize: 14,
            fontWeight: "600",
            color: "#FFF",
        },
    });
