import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Alert,
    StatusBar,
    Animated,
    Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useTheme } from "../src/context/ThemeContext";
import { useProductStore } from "../src/store/productStore";
import { useChatStore } from "../src/store/chatStore";

export default function PaymentScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const cartPrice = useProductStore((state) => state.cartPrice);
    const cartList = useProductStore((state) => state.cartList);
    const addToOrderHistoryFromCart = useProductStore(
        (state) => state.addToOrderHistoryFromCart
    );
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );

    // Access chat store to send thank you message
    const addMessage = useChatStore((state) => state.addMessage);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const scaleAnim = useState(new Animated.Value(0))[0];

    const handlePlaceOrder = () => {
        setShowConfirmDialog(true);
    };

    const confirmOrder = () => {
        setShowConfirmDialog(false);
        setShowSuccess(true);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        addToOrderHistoryFromCart();
        calculateCartPrice();

        // Send thank you message to each shop in the order
        if (cartList && cartList.length > 0) {
            cartList.forEach((product) => {
                const shopId = product.shopId;
                if (shopId) {
                    addMessage(shopId, {
                        id: `thank-you-${shopId}-${Date.now()}`,
                        text: `Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ chuẩn bị sớm nhất.`,
                        from: "me",
                        timestamp: Date.now(),
                    });
                }
            });
        }

        setTimeout(() => {
            setShowSuccess(false);
            Alert.alert("Thành công", "Đơn hàng của bạn đã được đặt!", [
                {
                    text: "Xem lịch sử",
                    onPress: () => router.push("/order-history"),
                },
                {
                    text: "Về trang chủ",
                    onPress: () => router.push("/"),
                },
            ]);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {showSuccess && (
                <View style={styles.successOverlay}>
                    <Animated.View
                        style={[
                            styles.successContainer,
                            { transform: [{ scale: scaleAnim }] },
                        ]}
                    >
                        <View style={styles.successCircle}>
                            <Ionicons
                                name="checkmark"
                                size={64}
                                color="#FFFFFF"
                            />
                        </View>
                        <Text style={styles.successText}>
                            Đặt hàng thành công!
                        </Text>
                    </Animated.View>
                </View>
            )}

            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.onSurface}
                    />
                </Pressable>
                <Text style={styles.headerTitle}>Xác nhận đặt hàng</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tổng tiền</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Tổng tiền hàng:
                            </Text>
                            <Text style={styles.summaryValue}>
                                {parseInt(cartPrice).toLocaleString("vi-VN")} đ
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tổng cộng:</Text>
                            <Text style={styles.totalValue}>
                                {parseInt(cartPrice).toLocaleString("vi-VN")} đ
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.payButton} onPress={handlePlaceOrder}>
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#FFFFFF"
                    />
                    <Text style={styles.payButtonText}>Đặt hàng</Text>
                </Pressable>
            </View>

            <Modal
                visible={showConfirmDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowConfirmDialog(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmDialog}>
                        <Ionicons
                            name="help-circle"
                            size={60}
                            color={theme.primary}
                        />
                        <Text style={styles.confirmTitle}>
                            Xác nhận đặt hàng
                        </Text>
                        <Text style={styles.confirmMessage}>
                            Bạn có chắc chắn muốn đặt hàng với tổng tiền
                            <Text style={styles.confirmPrice}>
                                {parseInt(cartPrice).toLocaleString("vi-VN")} đ
                            </Text>
                            không?
                        </Text>
                        <View style={styles.confirmButtons}>
                            <Button
                                mode="outlined"
                                onPress={() => setShowConfirmDialog(false)}
                                style={styles.cancelButton}
                                textColor={theme.onSurface}
                            >
                                Hủy
                            </Button>
                            <Button
                                mode="contained"
                                onPress={confirmOrder}
                                style={styles.confirmButton}
                                buttonColor={theme.primary}
                            >
                                Xác nhận
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme.surface,
            justifyContent: "center",
            alignItems: "center",
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: "700",
            color: theme.onSurface,
        },
        placeholder: {
            width: 40,
        },
        scrollContent: {
            padding: 20,
            paddingBottom: 100,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "700",
            color: theme.onBackground,
            marginBottom: 16,
        },
        summaryCard: {
            padding: 20,
            borderRadius: 16,
            backgroundColor: theme.surface,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        summaryRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
        },
        summaryLabel: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
        },
        summaryValue: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.onSurface,
        },
        divider: {
            height: 1,
            backgroundColor: theme.outlineVariant,
            marginVertical: 16,
        },
        totalRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        totalLabel: {
            fontSize: 18,
            fontWeight: "700",
            color: theme.onSurface,
        },
        totalValue: {
            fontSize: 20,
            fontWeight: "700",
            color: theme.primary,
        },
        footer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: theme.surface,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
        },
        payButton: {
            flexDirection: "row",
            backgroundColor: theme.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
        },
        payButtonText: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "700",
        },
        successOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        successContainer: {
            alignItems: "center",
            gap: 24,
        },
        successCircle: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#4CAF50",
            justifyContent: "center",
            alignItems: "center",
        },
        successText: {
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        confirmDialog: {
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 24,
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
            gap: 16,
        },
        confirmTitle: {
            fontSize: 20,
            fontWeight: "700",
            color: "#1C1B1F",
            textAlign: "center",
        },
        confirmMessage: {
            fontSize: 16,
            color: "#49454F",
            textAlign: "center",
            lineHeight: 24,
        },
        confirmPrice: {
            fontSize: 18,
            fontWeight: "700",
            color: "#00BCD4",
        },
        confirmButtons: {
            flexDirection: "row",
            gap: 12,
            marginTop: 8,
            width: "100%",
        },
        cancelButton: {
            flex: 1,
            borderRadius: 12,
        },
        confirmButton: {
            flex: 1,
            borderRadius: 12,
        },
    });
