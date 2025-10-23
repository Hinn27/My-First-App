// Screen: Food Detail
/* Vai trò:
 * Chi tiết món ăn
 * Route: /food/[slug]
 */

import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { useState } from 'react';

// Mock data - trong thực tế sẽ fetch từ API
const FOOD_DETAILS = {
    'pho-bo': {
        id: 'food-1',
        name: 'Phở Bò',
        price: 50000,
        category: 'Món khô',
        description:
            'Phở bò truyền thống Hà Nội với nước dùng hầm xương 12 tiếng',
        ingredients: ['Bánh phở', 'Thịt bò', 'Hành lá', 'Ngò rí', 'Hành tây'],
        rating: 4.8,
        reviews: 156,
    },
    'bun-cha': {
        id: 'food-2',
        name: 'Bún Chả',
        price: 45000,
        category: 'Món khô',
        description: 'Bún chả Hà Nội với thịt nướng than hoa thơm ngon',
        ingredients: ['Bún', 'Thịt nướng', 'Chả', 'Nước mắm', 'Rau sống'],
        rating: 4.7,
        reviews: 128,
    },
    'com-tam': {
        id: 'food-3',
        name: 'Cơm Tấm',
        price: 40000,
        category: 'Món khô',
        description: 'Cơm tấm sườn bì chả trứng đặc sản Sài Gòn',
        ingredients: ['Cơm tấm', 'Sườn nướng', 'Bì', 'Chả', 'Trứng ốp la'],
        rating: 4.6,
        reviews: 203,
    },
    'banh-mi': {
        id: 'food-4',
        name: 'Bánh Mì',
        price: 25000,
        category: 'Món ướt',
        description: 'Bánh mì thịt nguội pate với bánh giòn tan',
        ingredients: ['Bánh mì', 'Pate', 'Thịt nguội', 'Rau sống', 'Đồ chua'],
        rating: 4.5,
        reviews: 342,
    },
    'hu-tieu': {
        id: 'food-5',
        name: 'Hủ Tiếu',
        price: 35000,
        category: 'Món ướt',
        description: 'Hủ tiếu Nam Vang với tôm thịt đầy đặn',
        ingredients: ['Hủ tiếu', 'Tôm', 'Thịt băm', 'Gan', 'Giá đỗ'],
        rating: 4.7,
        reviews: 189,
    },
    'goi-cuon': {
        id: 'food-6',
        name: 'Gỏi Cuốn',
        price: 30000,
        category: 'Ăn vặt',
        description: 'Gỏi cuốn tôm thịt tươi ngon, ăn kèm tương đậu phộng',
        ingredients: ['Bánh tráng', 'Tôm', 'Thịt', 'Bún', 'Rau sống'],
        rating: 4.6,
        reviews: 95,
    },
};

export default function FoodDetailScreen() {
    const { slug } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const food = FOOD_DETAILS[slug] || {
        id: 'unknown',
        name: 'Không tìm thấy',
        price: 0,
        description: 'Món ăn không tồn tại',
        ingredients: [],
        rating: 0,
        reviews: 0,
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: food.id,
                name: food.name,
                price: food.price,
            });
        }
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Ionicons name="restaurant" size={100} color="#0a84ff" />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{food.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.rating}>{food.rating}</Text>
                        <Text style={styles.reviews}>
                            ({food.reviews} đánh giá)
                        </Text>
                    </View>
                </View>

                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{food.category}</Text>
                </View>

                <Text style={styles.price}>
                    {food.price.toLocaleString('vi-VN')}đ
                </Text>

                <Text style={styles.sectionTitle}>Mô tả</Text>
                <Text style={styles.description}>{food.description}</Text>

                <Text style={styles.sectionTitle}>Nguyên liệu</Text>
                <View style={styles.ingredientsContainer}>
                    {food.ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientItem}>
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#34C759"
                            />
                            <Text style={styles.ingredientText}>
                                {ingredient}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Số lượng:</Text>
                    <View style={styles.quantityControls}>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() =>
                                setQuantity(Math.max(1, quantity - 1))
                            }
                        >
                            <Ionicons name="remove" size={20} color="#fff" />
                        </Pressable>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <Ionicons name="add" size={20} color="#fff" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalPrice}>
                        {(food.price * quantity).toLocaleString('vi-VN')}đ
                    </Text>
                </View>

                <Pressable style={styles.addButton} onPress={handleAddToCart}>
                    <Ionicons name="cart" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fb',
    },
    imageContainer: {
        backgroundColor: '#e3f2ff',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 12,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1c1c1e',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c1c1e',
    },
    reviews: {
        fontSize: 14,
        color: '#8e8e93',
    },
    categoryBadge: {
        backgroundColor: '#e3f2ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0a84ff',
    },
    price: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0a84ff',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1c1c1e',
        marginTop: 8,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 16,
    },
    ingredientsContainer: {
        marginBottom: 20,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    ingredientText: {
        fontSize: 16,
        color: '#1c1c1e',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    quantityLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c1c1e',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityButton: {
        backgroundColor: '#0a84ff',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1c1c1e',
        minWidth: 40,
        textAlign: 'center',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
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
    addButton: {
        backgroundColor: '#0a84ff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        marginBottom: 30,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
