// Screen: Cart tab
/* Vai trò:
 * Screen Giỏ hàng (tab cart)
 * Route: /cart
 * Hiển thị danh sách sản phẩm trong giỏ, tổng tiền, nút thanh toán
 */

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';

export default function CartTab() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart,
    } = useCart();

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Ionicons name="fast-food-outline" size={40} color="#0a84ff" />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>
                        {item.price?.toLocaleString('vi-VN')}đ
                    </Text>
                </View>
            </View>

            <View style={styles.quantityContainer}>
                <Pressable
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    <Ionicons name="remove" size={20} color="#fff" />
                </Pressable>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <Pressable
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Ionicons name="add" size={20} color="#fff" />
                </Pressable>
            </View>

            <Pressable
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
            </Pressable>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={100} color="#c7c7cc" />
                <Text style={styles.emptyText}>Giỏ hàng trống</Text>
                <Text style={styles.emptySubtext}>
                    Hãy thêm sản phẩm vào giỏ hàng!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalPrice}>
                        {getTotalPrice().toLocaleString('vi-VN')}đ
                    </Text>
                </View>

                <Pressable style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </Pressable>

                <Pressable style={styles.clearButton} onPress={clearCart}>
                    <Text style={styles.clearButtonText}>Xóa tất cả</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fb',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f8fb',
        padding: 20,
    },
    emptyText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1c1c1e',
        marginTop: 20,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#8e8e93',
        marginTop: 8,
    },
    listContainer: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDetails: {
        marginLeft: 12,
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c1c1e',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#0a84ff',
        fontWeight: '500',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    quantityButton: {
        backgroundColor: '#0a84ff',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c1c1e',
        marginHorizontal: 12,
        minWidth: 30,
        textAlign: 'center',
    },
    deleteButton: {
        padding: 8,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e5ea',
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
        color: '#1c1c1e',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0a84ff',
    },
    checkoutButton: {
        backgroundColor: '#0a84ff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 8,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        padding: 12,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#ff3b30',
        fontSize: 14,
        fontWeight: '500',
    },
});
