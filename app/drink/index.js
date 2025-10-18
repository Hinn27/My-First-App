// Screen: Drink List
/* Vai trò:
       * Hiển thị danh sách đồ uống
     * Route: /drink
*/

import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';

const DRINK_DATA = [
    { id: 'drink-1', name: 'Cà Phê Sữa Đá', drink: 'ca-phe-sua-da', price: 20000, category: 'Cà phê', description: 'Cà phê phin truyền thống', image: 'cafe' },
    { id: 'drink-2', name: 'Trà Sữa Trân Châu', drink: 'tra-sua-tran-chau', price: 35000, category: 'Trà sữa', description: 'Trà sữa trân châu đường đen', image: 'cafe' },
    { id: 'drink-3', name: 'Sinh Tố Bơ', drink: 'sinh-to-bo', price: 30000, category: 'Sinh tố', description: 'Sinh tố bơ béo ngậy', image: 'nutrition' },
    { id: 'drink-4', name: 'Nước Ép Cam', drink: 'nuoc-ep-cam', price: 25000, category: 'Nước ép', description: 'Nước cam tươi 100%', image: 'wine' },
    { id: 'drink-5', name: 'Trà Đào Cam Sả', drink: 'tra-dao-cam-sa', price: 35000, category: 'Trà trái cây', description: 'Trà đào cam sả mát lạnh', image: 'cafe' },
    { id: 'drink-6', name: 'Soda Chanh Dây', drink: 'soda-chanh-day', price: 28000, category: 'Soda', description: 'Soda chanh dây sảng khoái', image: 'beer' },
    { id: 'drink-7', name: 'Matcha Latte', drink: 'matcha-latte', price: 40000, category: 'Cà phê', description: 'Matcha latte Nhật Bản', image: 'cafe' },
    { id: 'drink-8', name: 'Nước Dừa Tươi', drink: 'nuoc-dua-tuoi', price: 22000, category: 'Giải khát', description: 'Nước dừa xiêm tươi mát', image: 'wine' },
];

export default function DrinkListScreen() {
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
        });
    };

    const renderDrinkItem = ({ item }) => (
        <View style={styles.drinkCard}>
            <Link href={`/drink/${item.drink}`} asChild>
                <Pressable style={styles.drinkInfo}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.image} size={40} color="#FF9500" />
                    </View>
                    <View style={styles.drinkDetails}>
                        <Text style={styles.drinkName}>{item.name}</Text>
                        <Text style={styles.drinkCategory}>{item.category}</Text>
                        <Text style={styles.drinkDescription}>{item.description}</Text>
                        <Text style={styles.drinkPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
                    </View>
                </Pressable>
            </Link>

            <Pressable
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
            >
                <Ionicons name="add-circle" size={32} color="#FF9500" />
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="cafe" size={32} color="#FF9500" />
                <Text style={styles.title}>Đồ Uống</Text>
            </View>

            <FlatList
                data={DRINK_DATA}
                renderItem={renderDrinkItem}
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
    drinkCard: {
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
    drinkInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    drinkDetails: {
        flex: 1,
    },
    drinkName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c1c1e',
        marginBottom: 4,
    },
    drinkCategory: {
        fontSize: 12,
        color: '#8e8e93',
        marginBottom: 4,
    },
    drinkDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    drinkPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF9500',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
});
