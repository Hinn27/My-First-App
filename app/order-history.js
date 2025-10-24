// Screen: Order History - Lịch sử đơn hàng
/* Chức năng:
 * - Hiển thị danh sách đơn hàng đã đặt
 * - Xem chi tiết từng đơn hàng
 * - Hiển thị ngày giờ, tổng tiền
 * - Empty state khi chưa có đơn hàng
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../src/context/ThemeContext';
import { useProductStore } from '../src/store/productStore';

export default function OrderHistoryScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Store
    const orderHistoryList = useProductStore((state) => state.orderHistoryList);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
            />

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
                <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
                <View style={styles.placeholder} />
            </View>

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
                        onPress={() => router.push('/')}
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
                                    theme.mode === 'dark'
                                        ? ['#252A32', '#0C0F14']
                                        : ['#FFFFFF', '#F7F8FB']
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
                                                <Text style={styles.itemIcon}>
                                                    {item.imageIcon}
                                                </Text>
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
                                                                {price.size} x{' '}
                                                                {price.quantity}
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.priceText
                                                                }
                                                            >
                                                                {parseInt(
                                                                    price.price,
                                                                ).toLocaleString(
                                                                    'vi-VN',
                                                                )}{' '}
                                                                đ
                                                            </Text>
                                                        </View>
                                                    ),
                                                )}
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Order Total */}
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalLabel}>
                                        Tổng cộng:
                                    </Text>
                                    <Text style={styles.totalValue}>
                                        {parseInt(
                                            order.cartListPrice,
                                        ).toLocaleString('vi-VN')}{' '}
                                        đ
                                    </Text>
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
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        emptyText: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.onBackground,
            marginTop: 20,
        },
        emptySubtext: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 8,
            textAlign: 'center',
        },
        shopButton: {
            marginTop: 24,
            backgroundColor: theme.primary,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
        },
        shopButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            fontWeight: '700',
            color: theme.onSurface,
        },
        orderTime: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        statusBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
        },
        statusText: {
            fontSize: 13,
            fontWeight: '600',
            color: '#4CAF50',
        },
        itemsContainer: {
            gap: 12,
            marginBottom: 16,
        },
        orderItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        itemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            flex: 1,
        },
        itemIcon: {
            fontSize: 36,
        },
        itemInfo: {
            flex: 1,
            gap: 2,
        },
        itemName: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
        },
        itemSpecial: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
        },
        itemRight: {
            alignItems: 'flex-end',
            gap: 4,
        },
        priceRow: {
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
        },
        sizeText: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        priceText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.primary,
        },
        totalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
        },
        totalLabel: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
        },
        totalValue: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.primary,
        },
    });
