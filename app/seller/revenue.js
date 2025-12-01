// Screen: Revenue - Quản lý doanh thu (Seller)
/* Chức năng:
 * - Thống kê doanh thu (đơn mới, đã giao, tổng)
 * - Hiển thị danh sách đơn hàng
 * - Tab "Đơn mới" và "Đã giao"
 * - Đánh dấu đơn đã giao
 * - Mock data (trong production sẽ lấy từ API)
 */

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';

export default function RevenueScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);
    const [activeTab, setActiveTab] = useState('new'); // 'new' or 'completed'
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            // Load mock orders for now (no need to read user from storage)
            const mockOrders = [
                {
                    id: '001',
                    customerName: 'Nguyễn Văn A',
                    items: [
                        { name: 'Cơm tấm sườn', quantity: 2, price: 25000 },
                        { name: 'Bún nạm chả', quantity: 1, price: 30000 },
                    ],
                    total: 80000,
                    status: 'new',
                    date: '2024-01-15 10:30',
                },
                {
                    id: '002',
                    customerName: 'Trần Thị B',
                    items: [
                        {
                            name: 'Cơm tấm sườn',
                            quantity: 1,
                            price: 25000,
                        },
                    ],
                    total: 25000,
                    status: 'new',
                    date: '2024-01-15 11:15',
                },
                {
                    id: '003',
                    customerName: 'Lê Văn C',
                    items: [
                        { name: 'Phở bò', quantity: 2, price: 35000 },
                        { name: 'Bún chả', quantity: 1, price: 30000 },
                    ],
                    total: 100000,
                    status: 'completed',
                    date: '2024-01-14 09:20',
                },
                {
                    id: '004',
                    customerName: 'Phạm Thị D',
                    items: [{ name: 'Bún nạm chả', quantity: 1, price: 30000 }],
                    total: 30000,
                    status: 'completed',
                    date: '2024-01-14 12:00',
                },
            ];

            setOrders(mockOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    const calculateRevenue = (status) => {
        return orders
            .filter((order) => order.status === status)
            .reduce((sum, order) => sum + order.total, 0);
    };

    const markAsCompleted = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId
                    ? { ...order, status: 'completed' }
                    : order,
            ),
        );
    };

    const filteredOrders = orders.filter((order) => order.status === activeTab);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.onSurface}
                    />
                </Pressable>
                <Text style={styles.headerTitle}>Quản lí doanh thu</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Ionicons
                        name="timer-outline"
                        size={28}
                        color={theme.secondary}
                    />
                    <Text style={styles.statValue}>
                        {calculateRevenue('new').toLocaleString('vi-VN')}đ
                    </Text>
                    <Text style={styles.statLabel}>Đơn mới</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={28}
                        color={theme.tertiary}
                    />
                    <Text style={styles.statValue}>
                        {calculateRevenue('completed').toLocaleString('vi-VN')}đ
                    </Text>
                    <Text style={styles.statLabel}>Đã giao</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons
                        name="wallet-outline"
                        size={28}
                        color={theme.primary}
                    />
                    <Text style={styles.statValue}>
                        {(
                            calculateRevenue('new') +
                            calculateRevenue('completed')
                        ).toLocaleString('vi-VN')}
                        đ
                    </Text>
                    <Text style={styles.statLabel}>Tổng doanh thu</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'new' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('new')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'new' && styles.activeTabText,
                        ]}
                    >
                        Đơn mới (
                        {orders.filter((o) => o.status === 'new').length})
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'completed' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('completed')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'completed' && styles.activeTabText,
                        ]}
                    >
                        Đã giao (
                        {orders.filter((o) => o.status === 'completed').length})
                    </Text>
                </Pressable>
            </View>

            {/* Orders List */}
            <ScrollView style={styles.scrollContainer}>
                {filteredOrders.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name={
                                activeTab === 'new'
                                    ? 'receipt-outline'
                                    : 'checkmark-done-outline'
                            }
                            size={80}
                            color={theme.outline}
                        />
                        <Text style={styles.emptyTitle}>
                            {activeTab === 'new'
                                ? 'Chưa có đơn mới'
                                : 'Chưa có đơn đã giao'}
                        </Text>
                        <Text style={styles.emptyText}>
                            {activeTab === 'new'
                                ? 'Đơn hàng mới sẽ xuất hiện ở đây'
                                : 'Lịch sử đơn hàng đã giao sẽ hiển thị ở đây'}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.ordersContainer}>
                        {filteredOrders.map((order) => (
                            <View key={order.id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <View>
                                        <Text style={styles.orderId}>
                                            Đơn hàng #{order.id}
                                        </Text>
                                        <Text style={styles.orderDate}>
                                            {order.date}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            order.status === 'new'
                                                ? styles.statusNew
                                                : styles.statusCompleted,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                order.status === 'new'
                                                    ? styles.statusTextNew
                                                    : styles.statusTextCompleted,
                                            ]}
                                        >
                                            {order.status === 'new'
                                                ? 'Mới'
                                                : 'Đã giao'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.customerInfo}>
                                    <Ionicons
                                        name="person"
                                        size={16}
                                        color={theme.onSurfaceVariant}
                                    />
                                    <Text style={styles.customerName}>
                                        {order.customerName}
                                    </Text>
                                </View>

                                <View style={styles.itemsList}>
                                    {order.items.map((item, index) => (
                                        <View
                                            key={index}
                                            style={styles.itemRow}
                                        >
                                            <Text style={styles.itemName}>
                                                {item.quantity}x {item.name}
                                            </Text>
                                            <Text style={styles.itemPrice}>
                                                {(
                                                    item.quantity * item.price
                                                ).toLocaleString('vi-VN')}
                                                đ
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.orderFooter}>
                                    <Text style={styles.totalLabel}>
                                        Tổng cộng:
                                    </Text>
                                    <Text style={styles.totalValue}>
                                        {order.total.toLocaleString('vi-VN')}đ
                                    </Text>
                                </View>

                                {order.status === 'new' && (
                                    <Pressable
                                        style={styles.completeButton}
                                        onPress={() =>
                                            markAsCompleted(order.id)
                                        }
                                    >
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={20}
                                            color="#fff"
                                        />
                                        <Text style={styles.completeButtonText}>
                                            Đánh dấu đã giao
                                        </Text>
                                    </Pressable>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingBottom: 12,
            paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 50, // Add padding top for status bar
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.outlineVariant,
        },
        backButton: {
            padding: 4,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.onSurface,
            flex: 1,
            marginLeft: 12,
        },
        statsContainer: {
            flexDirection: 'row',
            padding: 16,
            gap: 12,
        },
        statCard: {
            flex: 1,
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.outlineVariant,
        },
        statValue: {
            fontSize: 16,
            fontWeight: '700',
            color: theme.onSurface,
            marginTop: 8,
        },
        statLabel: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
            marginTop: 4,
        },
        tabContainer: {
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 12,
            marginBottom: 8,
        },
        tab: {
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: theme.surfaceVariant,
        },
        activeTab: {
            backgroundColor: theme.primary,
        },
        tabText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.onSurfaceVariant,
        },
        activeTabText: {
            color: '#fff',
        },
        scrollContainer: {
            flex: 1,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
            paddingHorizontal: 32,
        },
        emptyTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: theme.onSurface,
            marginTop: 16,
        },
        emptyText: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            textAlign: 'center',
            marginTop: 8,
        },
        ordersContainer: {
            padding: 16,
        },
        orderCard: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.outlineVariant,
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        orderId: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
        },
        orderDate: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
            marginTop: 2,
        },
        statusBadge: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
        },
        statusNew: {
            backgroundColor: theme.secondaryContainer,
        },
        statusCompleted: {
            backgroundColor: theme.tertiaryContainer,
        },
        statusText: {
            fontSize: 12,
            fontWeight: '600',
        },
        statusTextNew: {
            color: theme.secondary,
        },
        statusTextCompleted: {
            color: theme.tertiary,
        },
        customerInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginBottom: 12,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.outlineVariant,
        },
        customerName: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
        },
        itemsList: {
            marginBottom: 12,
        },
        itemRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6,
        },
        itemName: {
            fontSize: 14,
            color: theme.onSurface,
        },
        itemPrice: {
            fontSize: 14,
            fontWeight: '500',
            color: theme.onSurface,
        },
        orderFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: theme.outlineVariant,
            marginBottom: 12,
        },
        totalLabel: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
        },
        totalValue: {
            fontSize: 16,
            fontWeight: '700',
            color: theme.primary,
        },
        completeButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.tertiary,
            paddingVertical: 10,
            borderRadius: 8,
            gap: 6,
        },
        completeButtonText: {
            fontSize: 14,
            fontWeight: '600',
            color: '#fff',
        },
    });
