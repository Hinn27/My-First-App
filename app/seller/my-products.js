// Screen: My Products (for sellers)
/* Vai trò:
 * Hiển thị danh sách sản phẩm của người bán
 * Route: /seller/my-products
 */

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../src/context/ThemeContext';

export default function MyProductsScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const userDataStr = await AsyncStorage.getItem('user');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                setUser(userData);
                // In production, fetch from API
                // For now, load from AsyncStorage
                const productsStr = await AsyncStorage.getItem(
                    'sellerProducts',
                );
                if (productsStr) {
                    const allProducts = JSON.parse(productsStr);
                    // Filter by seller ID
                    const myProducts = allProducts.filter(
                        (p) => p.sellerId === userData.email,
                    );
                    setProducts(myProducts);
                }
            }
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        Alert.alert('Xác nhận xóa', 'Bạn có chắc muốn xóa sản phẩm này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const productsStr = await AsyncStorage.getItem(
                            'sellerProducts',
                        );
                        if (productsStr) {
                            const allProducts = JSON.parse(productsStr);
                            const updatedProducts = allProducts.filter(
                                (p) => p.id !== productId,
                            );
                            await AsyncStorage.setItem(
                                'sellerProducts',
                                JSON.stringify(updatedProducts),
                            );
                            loadProducts(); // Reload
                            Alert.alert('Thành công', 'Đã xóa sản phẩm!');
                        }
                    } catch (error) {
                        console.error('Error deleting product:', error);
                        Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
                    }
                },
            },
        ]);
    };

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
                <Text style={styles.headerTitle}>Sản phẩm của bạn</Text>
                <Pressable onPress={() => router.push('/seller/add-product')}>
                    <Ionicons
                        name="add-circle"
                        size={28}
                        color={theme.primary}
                    />
                </Pressable>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {products.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="cube-outline"
                            size={80}
                            color={theme.outline}
                        />
                        <Text style={styles.emptyTitle}>Chưa có sản phẩm</Text>
                        <Text style={styles.emptyText}>
                            Bạn chưa đăng sản phẩm nào. Nhấn nút + để thêm sản
                            phẩm mới!
                        </Text>
                    </View>
                ) : (
                    <View style={styles.productsContainer}>
                        {products.map((product) => (
                            <View key={product.id} style={styles.productCard}>
                                {product.image ? (
                                    <Image
                                        source={{ uri: product.image }}
                                        style={styles.productImage}
                                    />
                                ) : (
                                    <View style={styles.placeholderImage}>
                                        <Text style={styles.emoji}>
                                            {product.emoji}
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>
                                        {product.name}
                                    </Text>
                                    <Text style={styles.productCategory}>
                                        {product.category}
                                    </Text>
                                    <Text style={styles.productPrice}>
                                        {product.sizes &&
                                        product.sizes.length > 0
                                            ? `${product.sizes[0].price.toLocaleString(
                                                  'vi-VN',
                                              )}đ - ${product.sizes[
                                                  product.sizes.length - 1
                                              ].price.toLocaleString('vi-VN')}đ`
                                            : 'Chưa có giá'}
                                    </Text>

                                    <View style={styles.productActions}>
                                        <Pressable
                                            style={styles.actionButton}
                                            onPress={() => {
                                                // TODO: Navigate to edit screen
                                                Alert.alert(
                                                    'Thông báo',
                                                    'Chức năng sửa sản phẩm sẽ được cập nhật sau',
                                                );
                                            }}
                                        >
                                            <Ionicons
                                                name="create-outline"
                                                size={20}
                                                color={theme.primary}
                                            />
                                            <Text
                                                style={[
                                                    styles.actionText,
                                                    { color: theme.primary },
                                                ]}
                                            >
                                                Sửa
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={styles.actionButton}
                                            onPress={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                        >
                                            <Ionicons
                                                name="trash-outline"
                                                size={20}
                                                color={theme.error}
                                            />
                                            <Text
                                                style={[
                                                    styles.actionText,
                                                    { color: theme.error },
                                                ]}
                                            >
                                                Xóa
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
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
            paddingVertical: 12,
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
        scrollContainer: {
            flex: 1,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80,
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
            lineHeight: 20,
        },
        productsContainer: {
            padding: 16,
        },
        productCard: {
            flexDirection: 'row',
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.outlineVariant,
        },
        productImage: {
            width: 80,
            height: 80,
            borderRadius: 8,
        },
        placeholderImage: {
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: theme.surfaceVariant,
            alignItems: 'center',
            justifyContent: 'center',
        },
        emoji: {
            fontSize: 40,
        },
        productInfo: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'space-between',
        },
        productName: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
        },
        productCategory: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
            marginTop: 2,
        },
        productPrice: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.primary,
            marginTop: 4,
        },
        productActions: {
            flexDirection: 'row',
            marginTop: 8,
            gap: 12,
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        actionText: {
            fontSize: 14,
            fontWeight: '500',
        },
    });
