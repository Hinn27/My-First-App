// Screen: Product Detail - Chi tiết sản phẩm
/* Chức năng:
 * - Hiển thị thông tin chi tiết sản phẩm (tên, mô tả, giá, đánh giá)
 * - Chọn size (S/M/L)
 * - Thêm vào giỏ hàng
 * - Thêm/xóa yêu thích
 * - Hiển thị ảnh sản phẩm
 */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions,
    Alert,
    StatusBar,
    Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { id, type, index } = useLocalSearchParams();
    const styles = createStyles(theme);

    // Get product from store
    const drinkList = useProductStore((state) => state.drinkList);
    const foodList = useProductStore((state) => state.foodList);
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice,
    );
    const addToFavoriteList = useProductStore(
        (state) => state.addToFavoriteList,
    );
    const deleteFromFavoriteList = useProductStore(
        (state) => state.deleteFromFavoriteList,
    );

    const productList = type === 'Drink' ? drinkList : foodList;
    const product = productList[parseInt(index)];

    const [selectedPrice, setSelectedPrice] = useState(product.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);

    // Toggle favorite
    const handleToggleFavorite = () => {
        if (product.favourite) {
            deleteFromFavoriteList(product.type, product.id);
        } else {
            addToFavoriteList(product.type, product.id);
        }
    };

    // Add to cart
    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            index: product.index,
            name: product.name,
            roasted: product.roasted,
            imageIcon: product.imageIcon,
            special_ingredient: product.special_ingredient,
            type: product.type,
            prices: [{ ...selectedPrice, quantity: 1 }],
        });
        calculateCartPrice();
        Alert.alert('Thành công', `Đã thêm ${product.name} vào giỏ hàng!`, [
            {
                text: 'Xem giỏ hàng',
                onPress: () => router.push('/(tabs)/cart'),
            },
            { text: 'Tiếp tục mua' },
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image Header */}
                <View style={styles.imageSection}>
                    <LinearGradient
                        colors={
                            theme.mode === 'dark'
                                ? ['#252A32', '#0C0F14']
                                : ['#FFFFFF', '#F7F8FB']
                        }
                        style={styles.imageContainer}
                    >
                        {/* Back Button */}
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

                        {/* Favorite Button */}
                        <Pressable
                            style={styles.favoriteButton}
                            onPress={handleToggleFavorite}
                        >
                            <Ionicons
                                name={
                                    product.favourite
                                        ? 'heart'
                                        : 'heart-outline'
                                }
                                size={24}
                                color={product.favourite ? '#DC3535' : '#888'}
                            />
                        </Pressable>

                        {/* Product Image */}
                        <View style={styles.imageIconContainer}>
                            {product?.imagelink_square ? (
                                <Image
                                    source={
                                        typeof product.imagelink_square === 'string'
                                            ? { uri: product.imagelink_square }
                                            : product.imagelink_square
                                    }
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Text style={styles.imageIcon}>
                                    {product.imageIcon || '🍽️'}
                                </Text>
                            )}
                        </View>

                        {/* Product Basic Info Overlay */}
                        <View style={styles.overlayInfo}>
                            <View style={styles.basicInfo}>
                                <View style={styles.nameSection}>
                                    <Text style={styles.productName}>
                                        {product.name}
                                    </Text>
                                    <Text style={styles.specialIngredient}>
                                        {product.special_ingredient}
                                    </Text>
                                </View>

                                <View style={styles.statsRow}>
                                    <View style={styles.statBox}>
                                        <Ionicons
                                            name="star"
                                            size={20}
                                            color="#FFD700"
                                        />
                                        <Text style={styles.statText}>
                                            {product.average_rating}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            ({product.ratings_count})
                                        </Text>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.statBox}>
                                        <Ionicons
                                            name="cafe"
                                            size={20}
                                            color={theme.primary}
                                        />
                                        <Text style={styles.statText}>
                                            {product.roasted}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mô tả</Text>
                        <Pressable onPress={() => setFullDesc(!fullDesc)}>
                            <Text
                                style={styles.description}
                                numberOfLines={fullDesc ? undefined : 3}
                            >
                                {product.description}
                            </Text>
                            <Text style={styles.readMore}>
                                {fullDesc ? 'Thu gọn' : 'Xem thêm'}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Size Selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kích cỡ</Text>
                        <View style={styles.sizeContainer}>
                            {product.prices.map((priceItem, idx) => (
                                <Pressable
                                    key={idx}
                                    style={[
                                        styles.sizeButton,
                                        selectedPrice.size === priceItem.size &&
                                            styles.sizeButtonActive,
                                    ]}
                                    onPress={() => setSelectedPrice(priceItem)}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            selectedPrice.size ===
                                                priceItem.size &&
                                                styles.sizeTextActive,
                                        ]}
                                    >
                                        {priceItem.size}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Ingredients */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nguyên liệu</Text>
                        <Text style={styles.ingredients}>
                            {product.ingredients}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer - Price and Add to Cart */}
            <View style={styles.footer}>
                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>Giá</Text>
                    <Text style={styles.priceValue}>
                        {parseInt(selectedPrice.price).toLocaleString('vi-VN')}{' '}
                        đ
                    </Text>
                </View>

                <Pressable style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
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
        scrollContent: {
            paddingBottom: 100,
        },
        imageSection: {
            height: height * 0.5,
        },
        imageContainer: {
            flex: 1,
            position: 'relative',
        },
        backButton: {
            position: 'absolute',
            top: 16,
            left: 16,
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme.surface,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            elevation: 4,
        },
        favoriteButton: {
            position: 'absolute',
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: theme.surface,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            elevation: 4,
        },
        imageIconContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageIcon: {
            fontSize: 120,
        },
        overlayInfo: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor:
                theme.mode === 'dark'
                    ? 'rgba(0,0,0,0.7)'
                    : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            padding: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
        },
        basicInfo: {
            gap: 16,
        },
        nameSection: {
            gap: 4,
        },
        productName: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.onBackground,
        },
        specialIngredient: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
        },
        statsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        statBox: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            flex: 1,
        },
        statText: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
        },
        statLabel: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        divider: {
            width: 1,
            height: 30,
            backgroundColor: theme.outline,
        },
        contentSection: {
            padding: 20,
            gap: 24,
        },
        section: {
            gap: 12,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.onBackground,
        },
        description: {
            fontSize: 15,
            lineHeight: 24,
            color: theme.onSurfaceVariant,
        },
        readMore: {
            fontSize: 14,
            color: theme.primary,
            fontWeight: '600',
            marginTop: 8,
        },
        sizeContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        sizeButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: theme.surface,
            borderWidth: 2,
            borderColor: theme.outline,
            alignItems: 'center',
        },
        sizeButtonActive: {
            borderColor: theme.primary,
            backgroundColor:
                theme.mode === 'dark'
                    ? 'rgba(209, 120, 66, 0.15)'
                    : 'rgba(209, 120, 66, 0.08)',
        },
        sizeText: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
        },
        sizeTextActive: {
            color: theme.primary,
        },
        ingredients: {
            fontSize: 15,
            lineHeight: 22,
            color: theme.onSurfaceVariant,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            backgroundColor: theme.surface,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
            gap: 16,
        },
        priceSection: {
            gap: 4,
        },
        priceLabel: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        priceValue: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.primary,
        },
        addButton: {
            flex: 1,
            backgroundColor: theme.primary,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
        },
        addButtonText: {
            fontSize: 16,
            fontWeight: '700',
            color: '#FFFFFF',
        },
    });
