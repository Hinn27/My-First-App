// Screen: Drink Detail
/* Vai trò:
 * Chi tiết đồ uống
 * Route: /drink/[drink]
 */

import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { useState } from 'react';

// Mock data - trong thực tế sẽ fetch từ API
const DRINK_DETAILS = {
    'ca-phe-sua-da': {
        id: 'drink-1',
        name: 'Cà Phê Sữa Đá',
        price: 20000,
        category: 'Cà phê',
        description: 'Cà phê phin truyền thống pha với sữa đặc ngọt ngào',
        ingredients: ['Cà phê robusta', 'Sữa đặc', 'Đá'],
        size: ['S', 'M', 'L'],
        rating: 4.9,
        reviews: 456,
    },
    'tra-sua-tran-chau': {
        id: 'drink-2',
        name: 'Trà Sữa Trân Châu',
        price: 35000,
        category: 'Trà sữa',
        description: 'Trà sữa Taiwan với trân châu đường đen dai ngon',
        ingredients: ['Trà đen', 'Sữa', 'Trân châu', 'Đường đen'],
        size: ['M', 'L'],
        rating: 4.8,
        reviews: 892,
    },
    'sinh-to-bo': {
        id: 'drink-3',
        name: 'Sinh Tố Bơ',
        price: 30000,
        category: 'Sinh tố',
        description: 'Sinh tố bơ sáp béo ngậy, bổ dưỡng',
        ingredients: ['Bơ sáp', 'Sữa tươi', 'Đường', 'Đá'],
        size: ['M', 'L'],
        rating: 4.7,
        reviews: 234,
    },
    'nuoc-ep-cam': {
        id: 'drink-4',
        name: 'Nước Ép Cam',
        price: 25000,
        category: 'Nước ép',
        description: 'Nước cam tươi ép 100% không đường, giàu vitamin C',
        ingredients: ['Cam Úc', 'Đá'],
        size: ['S', 'M', 'L'],
        rating: 4.6,
        reviews: 178,
    },
    'tra-dao-cam-sa': {
        id: 'drink-5',
        name: 'Trà Đào Cam Sả',
        price: 35000,
        category: 'Trà',
        description: 'Trà đào cam sả mát lạnh, hương vị thanh mát',
        ingredients: ['Trà xanh', 'Đào', 'Cam', 'Sả', 'Đá'],
        size: ['M', 'L'],
        rating: 4.8,
        reviews: 567,
    },
    'soda-chanh-day': {
        id: 'drink-6',
        name: 'Soda Chanh Dây',
        price: 28000,
        category: 'Soda',
        description: 'Soda chanh dây chua ngọt sảng khoái',
        ingredients: ['Soda', 'Chanh dây', 'Đường', 'Đá'],
        size: ['M', 'L'],
        rating: 4.7,
        reviews: 298,
    },
    'matcha-latte': {
        id: 'drink-7',
        name: 'Matcha Latte',
        price: 40000,
        category: 'Cà phê',
        description: 'Matcha Nhật Bản cao cấp pha với sữa tươi',
        ingredients: ['Matcha Nhật', 'Sữa tươi', 'Đường'],
        size: ['M', 'L'],
        rating: 4.9,
        reviews: 412,
    },
    'nuoc-dua-tuoi': {
        id: 'drink-8',
        name: 'Nước Dừa Tươi',
        price: 22000,
        category: 'Giải khát',
        description: 'Nước dừa xiêm tươi mát, ngọt tự nhiên',
        ingredients: ['Dừa xiêm', 'Đá'],
        size: ['M', 'L'],
        rating: 4.8,
        reviews: 345,
    },
};

export default function DrinkDetailScreen() {
    const { drink } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    const drinkData = DRINK_DETAILS[drink] || {
        id: 'unknown',
        name: 'Không tìm thấy',
        price: 0,
        description: 'Đồ uống không tồn tại',
        ingredients: [],
        size: [],
        rating: 0,
        reviews: 0,
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: `${drinkData.id}-${selectedSize}`,
                name: `${drinkData.name} (${selectedSize})`,
                price: drinkData.price,
            });
        }
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Ionicons name="cafe" size={100} color="#FF9500" />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{drinkData.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.rating}>{drinkData.rating}</Text>
                        <Text style={styles.reviews}>
                            ({drinkData.reviews} đánh giá)
                        </Text>
                    </View>
                </View>

                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                        {drinkData.category}
                    </Text>
                </View>

                <Text style={styles.price}>
                    {drinkData.price.toLocaleString('vi-VN')}đ
                </Text>

                <Text style={styles.sectionTitle}>Mô tả</Text>
                <Text style={styles.description}>{drinkData.description}</Text>

                <Text style={styles.sectionTitle}>Thành phần</Text>
                <View style={styles.ingredientsContainer}>
                    {drinkData.ingredients.map((ingredient, index) => (
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

                <Text style={styles.sectionTitle}>Kích thước</Text>
                <View style={styles.sizeContainer}>
                    {drinkData.size.map((size) => (
                        <Pressable
                            key={size}
                            style={[
                                styles.sizeButton,
                                selectedSize === size &&
                                    styles.sizeButtonActive,
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text
                                style={[
                                    styles.sizeText,
                                    selectedSize === size &&
                                        styles.sizeTextActive,
                                ]}
                            >
                                {size}
                            </Text>
                        </Pressable>
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
                        {(drinkData.price * quantity).toLocaleString('vi-VN')}đ
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
        backgroundColor: '#FFF3E0',
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
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF9500',
    },
    price: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FF9500',
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
    sizeContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    sizeButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FF9500',
        backgroundColor: '#fff',
    },
    sizeButtonActive: {
        backgroundColor: '#FF9500',
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF9500',
    },
    sizeTextActive: {
        color: '#fff',
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
        backgroundColor: '#FF9500',
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
        color: '#FF9500',
    },
    addButton: {
        backgroundColor: '#FF9500',
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
