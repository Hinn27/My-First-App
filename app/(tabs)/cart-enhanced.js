// Enhanced Cart Screen - Coffee Shop Style
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    Alert,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';
import CartItemCard from '../../src/components/CartItemCard';

export default function EnhancedCartScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // Zustand store
    const cartList = useProductStore((state) => state.cartList);
    const cartPrice = useProductStore((state) => state.cartPrice);
    const incrementCartItemQuantity = useProductStore(
        (state) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useProductStore(
        (state) => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice,
    );
    const clearCart = useProductStore((state) => state.clearCart);

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
                'Giỏ hàng trống',
                'Vui lòng thêm sản phẩm trước khi thanh toán',
            );
            return;
        }
        router.push('/payment');
    };

    const handleClearCart = () => {
        Alert.alert('Xóa giỏ hàng', 'Bạn có chắc muốn xóa tất cả sản phẩm?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: () => {
                    clearCart();
                    Alert.alert('Thành công', 'Đã xóa giỏ hàng!');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
            />

            {cartList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="cart-outline"
                        size={80}
                        color={theme.onSurfaceVariant}
                    />
                    <Text style={styles.emptyText}>Giỏ hàng trống</Text>
                    <Text style={styles.emptySubtext}>
                        Thêm sản phẩm để bắt đầu mua sắm
                    </Text>
                    <Pressable
                        style={styles.shopButton}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.shopButtonText}>
                            Tiếp tục mua sắm
                        </Text>
                    </Pressable>
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

                    <View style={styles.footer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Tổng cộng:</Text>
                            <Text style={styles.totalPrice}>
                                {parseInt(cartPrice).toLocaleString('vi-VN')} đ
                            </Text>
                        </View>

                        <Pressable
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                        >
                            <Ionicons
                                name="card"
                                size={20}
                                color="#fff"
                                style={{ marginRight: 8 }}
                            />
                            <Text style={styles.checkoutButtonText}>
                                Thanh toán
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.clearButton}
                            onPress={handleClearCart}
                        >
                            <Text style={styles.clearButtonText}>
                                Xóa giỏ hàng
                            </Text>
                        </Pressable>
                    </View>
                </>
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
        listContainer: {
            padding: 16,
            paddingBottom: 120,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.surface,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        totalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        totalLabel: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.onSurface,
        },
        totalPrice: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.primary,
        },
        checkoutButton: {
            flexDirection: 'row',
            backgroundColor: theme.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
        },
        checkoutButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '700',
        },
        clearButton: {
            padding: 12,
            alignItems: 'center',
        },
        clearButtonText: {
            color: theme.error,
            fontSize: 14,
            fontWeight: '600',
        },
    });
