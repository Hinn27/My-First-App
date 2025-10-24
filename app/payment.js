// Screen: Payment - Thanh toán
/* Chức năng:
 * - Chọn phương thức thanh toán (Ví điện tử, Tiền mặt, Thẻ, Chuyển khoản)
 * - Hiển thị tổng tiền từ giỏ hàng
 * - Xác nhận thanh toán → Lưu vào lịch sử đơn hàng
 * - Animation success
 * - Xóa giỏ hàng sau khi thanh toán
 */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Alert,
    StatusBar,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../src/context/ThemeContext';
import { useProductStore } from '../src/store/productStore';

const PaymentMethods = [
    {
        id: 'wallet',
        name: 'Ví điện tử',
        icon: 'wallet',
        isIcon: true,
    },
    {
        id: 'cash',
        name: 'Tiền mặt',
        icon: 'cash',
        isIcon: true,
    },
    {
        id: 'card',
        name: 'Thẻ tín dụng',
        icon: 'card',
        isIcon: true,
    },
    {
        id: 'banking',
        name: 'Chuyển khoản',
        icon: 'business',
        isIcon: true,
    },
];

export default function PaymentScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Store
    const cartPrice = useProductStore((state) => state.cartPrice);
    const addToOrderHistoryFromCart = useProductStore(
        (state) => state.addToOrderHistoryFromCart,
    );
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice,
    );

    const [selectedPayment, setSelectedPayment] = useState(
        PaymentMethods[0].id,
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const scaleAnim = useState(new Animated.Value(0))[0];

    const handlePayment = () => {
        // Show success animation
        setShowSuccess(true);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        // Add to order history and clear cart
        addToOrderHistoryFromCart();
        calculateCartPrice();

        // Navigate after delay
        setTimeout(() => {
            setShowSuccess(false);
            Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt!', [
                {
                    text: 'Xem lịch sử',
                    onPress: () => router.push('/order-history'),
                },
                {
                    text: 'Về trang chủ',
                    onPress: () => router.push('/'),
                },
            ]);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
            />

            {/* Success Animation Overlay */}
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
                            Thanh toán thành công!
                        </Text>
                    </Animated.View>
                </View>
            )}

            {/* Header */}
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
                <Text style={styles.headerTitle}>Thanh toán</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Payment Amount Card */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tổng thanh toán</Text>
                    <LinearGradient
                        colors={
                            theme.mode === 'dark'
                                ? ['#D17842', '#C2691F']
                                : ['#D17842', '#E89A5C']
                        }
                        style={styles.amountCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.amountContent}>
                            <Text style={styles.amountLabel}>Tổng cộng</Text>
                            <Text style={styles.amountValue}>
                                {parseInt(cartPrice).toLocaleString('vi-VN')} đ
                            </Text>
                        </View>
                        <Ionicons
                            name="wallet"
                            size={48}
                            color="rgba(255,255,255,0.3)"
                        />
                    </LinearGradient>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Phương thức thanh toán
                    </Text>
                    {PaymentMethods.map((method) => (
                        <Pressable
                            key={method.id}
                            style={[
                                styles.paymentMethod,
                                selectedPayment === method.id &&
                                    styles.paymentMethodActive,
                            ]}
                            onPress={() => setSelectedPayment(method.id)}
                        >
                            <View style={styles.methodLeft}>
                                {method.isIcon ? (
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            selectedPayment === method.id &&
                                                styles.iconContainerActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={method.icon}
                                            size={24}
                                            color={
                                                selectedPayment === method.id
                                                    ? theme.primary
                                                    : theme.onSurfaceVariant
                                            }
                                        />
                                    </View>
                                ) : (
                                    <Image
                                        source={method.icon}
                                        style={styles.paymentImage}
                                    />
                                )}
                                <Text style={styles.methodName}>
                                    {method.name}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.radio,
                                    selectedPayment === method.id &&
                                        styles.radioActive,
                                ]}
                            >
                                {selectedPayment === method.id && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tạm tính:</Text>
                            <Text style={styles.summaryValue}>
                                {parseInt(cartPrice).toLocaleString('vi-VN')} đ
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Phí giao hàng:
                            </Text>
                            <Text style={styles.summaryValue}>0 đ</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Giảm giá:</Text>
                            <Text style={styles.summaryValue}>0 đ</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Tổng cộng:</Text>
                            <Text style={styles.totalValue}>
                                {parseInt(cartPrice).toLocaleString('vi-VN')} đ
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer - Pay Button */}
            <View style={styles.footer}>
                <Pressable style={styles.payButton} onPress={handlePayment}>
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#FFFFFF"
                    />
                    <Text style={styles.payButtonText}>
                        Xác nhận thanh toán
                    </Text>
                </Pressable>
            </View>
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme.surface,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.onBackground,
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
            fontWeight: '700',
            color: theme.onBackground,
            marginBottom: 16,
        },
        amountCard: {
            padding: 24,
            borderRadius: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        amountContent: {
            gap: 8,
        },
        amountLabel: {
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
        },
        amountValue: {
            fontSize: 32,
            fontWeight: '700',
            color: '#FFFFFF',
        },
        paymentMethod: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: theme.surface,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        paymentMethodActive: {
            borderColor: theme.primary,
            backgroundColor:
                theme.mode === 'dark'
                    ? 'rgba(209, 120, 66, 0.15)'
                    : 'rgba(209, 120, 66, 0.08)',
        },
        methodLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: theme.mode === 'dark' ? '#0C0F14' : '#F0F0F0',
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconContainerActive: {
            backgroundColor:
                theme.mode === 'dark'
                    ? 'rgba(209, 120, 66, 0.2)'
                    : 'rgba(209, 120, 66, 0.15)',
        },
        methodName: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
        },
        radio: {
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme.outline,
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioActive: {
            borderColor: theme.primary,
        },
        radioInner: {
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: theme.primary,
        },
        summaryCard: {
            backgroundColor: theme.surface,
            padding: 20,
            borderRadius: 16,
            gap: 12,
        },
        summaryRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        summaryLabel: {
            fontSize: 15,
            color: theme.onSurfaceVariant,
        },
        summaryValue: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
        },
        divider: {
            height: 1,
            backgroundColor: theme.outline,
            marginVertical: 4,
        },
        totalLabel: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.onSurface,
        },
        totalValue: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.primary,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: theme.surface,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
        },
        payButton: {
            flexDirection: 'row',
            backgroundColor: theme.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        payButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
        },
        successOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        successContainer: {
            alignItems: 'center',
            gap: 24,
        },
        successCircle: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#4CAF50',
            justifyContent: 'center',
            alignItems: 'center',
        },
        successText: {
            fontSize: 24,
            fontWeight: '700',
            color: '#FFFFFF',
        },
    });
