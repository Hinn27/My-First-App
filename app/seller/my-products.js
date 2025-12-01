// Screen: My Products - Quản lý sản phẩm (Seller)
/* Chức năng:
 * - Hiển thị danh sách sản phẩm đã đăng
 * - Xem ảnh, tên, giá sản phẩm
 * - Xóa sản phẩm khỏi store
 * - Sửa sản phẩm (coming soon)
 * - Lấy data từ Zustand store (drinkList + foodList)
 */

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Alert,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';
// useUserStore not used here

export default function MyProductsScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);

    // Get products from store
    const drinkList = useProductStore((state) => state.drinkList);
    const foodList = useProductStore((state) => state.foodList);
    const deleteProduct = useProductStore((state) => state.deleteProduct);

    // Combine all products (in production, filter by seller ID)
    const allProducts = [...drinkList, ...foodList];

    // For now, show all products. In production, filter by seller ID:
    // const myProducts = allProducts.filter(p => p.sellerId === user?.email);
    const products = allProducts;

    const handleDeleteProduct = (productId, productType) => {
        Alert.alert('Xác nhận xóa', 'Bạn có chắc muốn xóa sản phẩm này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: () => {
                    deleteProduct(productId, productType);
                    Alert.alert('Thành công', 'Đã xóa sản phẩm!');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
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
                                {product.imagelink_square ? (
                                    <Image
                                        source={
                                            typeof product.imagelink_square === 'string'
                                                ? { uri: product.imagelink_square }
                                                : product.imagelink_square
                                        }
                                        style={styles.productImage}
                                    />
                                ) : product.imageIcon ? (
                                    <View style={styles.placeholderImage}>
                                        <Text style={styles.emoji}>
                                            {product.imageIcon}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.placeholderImage}>
                                        <Ionicons
                                            name="image-outline"
                                            size={48}
                                            color={theme.onSurfaceVariant}
                                        />
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
                                        {product.prices &&
                                        product.prices.length > 0
                                            ? `${parseInt(
                                                  product.prices[0].price,
                                              ).toLocaleString('vi-VN')}đ${
                                                  product.prices.length > 1
                                                      ? ` - ${parseInt(
                                                            product.prices[
                                                                product.prices
                                                                    .length - 1
                                                            ].price,
                                                        ).toLocaleString(
                                                            'vi-VN',
                                                        )}đ`
                                                      : ''
                                              }`
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
                                                handleDeleteProduct(
                                                    product.id,
                                                    product.type,
                                                )
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
