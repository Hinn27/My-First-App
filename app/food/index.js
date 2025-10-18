// Screen: Food List
/* Vai trò:
    * Hiển thị danh sách món ăn
    * Route: /food
*/

import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';

const FOOD_DATA = [
    { id: 'food-1', name: 'Phở Bò', slug: 'pho-bo', price: 50000, category: 'Món Việt', description: 'Phở bò truyền thống Hà Nội', image: 'restaurant' },
    { id: 'food-2', name: 'Bún Chả', slug: 'bun-cha', price: 45000, category: 'Món Việt', description: 'Bún chả Hà Nội đặc sản', image: 'restaurant' },
    { id: 'food-3', name: 'Cơm Tấm', slug: 'com-tam', price: 40000, category: 'Món Việt', description: 'Cơm tấm sườn bì chả', image: 'restaurant' },
    { id: 'food-4', name: 'Bánh Mì', slug: 'banh-mi', price: 25000, category: 'Ăn sáng', description: 'Bánh mì thịt nguội pate', image: 'fast-food' },
    { id: 'food-5', name: 'Hủ Tiếu', slug: 'hu-tieu', price: 35000, category: 'Món Việt', description: 'Hủ tiếu Nam Vang', image: 'restaurant' },
    { id: 'food-6', name: 'Gỏi Cuốn', slug: 'goi-cuon', price: 30000, category: 'Khai vị', description: 'Gỏi cuốn tôm thịt', image: 'nutrition' },
];

export default function FoodListScreen() {
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
        });
    };

    const renderFoodItem = ({ item }) => (
        <View style={styles.foodCard}>
            <Link href={`/food/${item.slug}`} asChild>
                <Pressable style={styles.foodInfo}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.image} size={40} color="#0a84ff" />
                    </View>
                    <View style={styles.foodDetails}>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={styles.foodCategory}>{item.category}</Text>
                        <Text style={styles.foodDescription}>{item.description}</Text>
                        <Text style={styles.foodPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
                    </View>
                </Pressable>
            </Link>

            <Pressable
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
            >
                <Ionicons name="add-circle" size={32} color="#0a84ff" />
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="restaurant" size={32} color="#0a84ff" />
                <Text style={styles.title}>Món Ăn</Text>
            </View>

            <FlatList
                data={FOOD_DATA}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5ea',
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1c1c1e',
    },
    listContainer: {
        padding: 16,
    },
    foodCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    foodInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#e3f2ff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    foodDetails: {
        flex: 1,
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c1c1e',
        marginBottom: 4,
    },
    foodCategory: {
        fontSize: 12,
        color: '#8e8e93',
        marginBottom: 4,
    },
    foodDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    foodPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0a84ff',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
});
