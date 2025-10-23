// Enhanced Home Screen - Coffee Shop Style
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Pressable,
    ScrollView,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';
import { useUserStore } from '../../src/store/userStore';
import ProductCard from '../../src/components/ProductCard';

const { width } = Dimensions.get('window');

// Get categories from data
const getCategoriesFromData = (data) => {
    const temp = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].category] === undefined) {
            temp[data[i].category] = 1;
        } else {
            temp[data[i].category]++;
        }
    }
    const categories = Object.keys(temp);
    categories.unshift('Tất cả');
    return categories;
};

// Filter products by category
const getFilteredList = (category, data) => {
    if (category === 'Tất cả') {
        return data;
    } else {
        return data.filter((item) => item.category === category);
    }
};

export default function EnhancedHomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Zustand store
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

    // Get user from store
    const user = useUserStore((state) => state.user);

    // Combine food and drink lists (food first)
    const allProducts = [...foodList, ...drinkList];

    // State
    const [categories] = useState(getCategoriesFromData(allProducts));
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedProducts, setSortedProducts] = useState(
        getFilteredList(categories[0], allProducts),
    );

    const listRef = useRef(null);

    // Search function
    const searchProduct = (search) => {
        if (search !== '') {
            listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedProducts([
                ...allProducts.filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    // Reset search
    const resetSearch = () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedProducts([...allProducts]);
        setSearchText('');
    };

    // Add to cart handler
    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            index: item.index,
            name: item.name,
            roasted: item.roasted,
            imageIcon: item.imageIcon,
            special_ingredient: item.special_ingredient,
            type: item.type,
            prices: [{ ...item.prices[0], quantity: 1 }],
        });
        calculateCartPrice();
        Alert.alert('Thành công', `Đã thêm ${item.name} vào giỏ hàng!`, [
            { text: 'OK' },
        ]);
    };

    // Toggle favorite
    const handleFavorite = (id, favourite, type) => {
        if (favourite) {
            deleteFromFavoriteList(type, id);
        } else {
            addToFavoriteList(type, id);
        }
    };

    // Navigate to details
    const handleCardPress = (item) => {
        router.push({
            pathname: '/product/[id]',
            params: { id: item.id, type: item.type, index: item.index },
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
            />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Xin chào,</Text>
                    <Text style={styles.title}>
                        {user?.name || 'Khách hàng'}!
                    </Text>
                </View>
                <Pressable style={styles.profileButton}>
                    <Ionicons
                        name="person-circle"
                        size={40}
                        color={theme.primary}
                    />
                </Pressable>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Ionicons
                        name="search"
                        size={20}
                        color={theme.onSurfaceVariant}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        placeholder="Tìm kiếm đồ uống, món ăn..."
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            searchProduct(text);
                        }}
                        style={styles.searchInput}
                    />
                    {searchText.length > 0 && (
                        <Pressable onPress={resetSearch}>
                            <Ionicons
                                name="close-circle"
                                size={20}
                                color={theme.onSurfaceVariant}
                            />
                        </Pressable>
                    )}
                </View>
                <Pressable style={styles.filterButton}>
                    <Ionicons name="options" size={24} color={theme.primary} />
                </Pressable>
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={styles.categoryContainer}
                    snapToInterval={undefined}
                    decelerationRate="fast"
                >
                    {categories.map((category, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setCategoryIndex({ index, category });
                                setSortedProducts(
                                    getFilteredList(category, allProducts),
                                );
                                // Scroll to top sau khi update state
                                setTimeout(() => {
                                    listRef?.current?.scrollToOffset({
                                        animated: false,
                                        offset: 0,
                                    });
                                }, 0);
                            }}
                            style={[
                                styles.categoryButton,
                                categoryIndex.index === index &&
                                    styles.categoryButtonActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    categoryIndex.index === index &&
                                        styles.categoryTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Products Grid */}
            <FlatList
                ref={listRef}
                data={sortedProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="search-outline"
                            size={64}
                            color={theme.onSurfaceVariant}
                        />
                        <Text style={styles.emptyText}>
                            Không tìm thấy sản phẩm
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <ProductCard
                        {...item}
                        theme={theme}
                        onPress={() => handleCardPress(item)}
                        onAddToCart={() => handleAddToCart(item)}
                        onFavoritePress={() =>
                            handleFavorite(item.id, item.favourite, item.type)
                        }
                    />
                )}
            />
        </View>
    );
}

// Dynamic styles based on theme
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 16,
        },
        greeting: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            marginBottom: 4,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.onBackground,
        },
        profileButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            gap: 12,
            marginBottom: 20,
        },
        searchBox: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: 12,
            paddingHorizontal: 16,
            height: 48,
            borderWidth: theme.mode === 'dark' ? 1 : 0,
            borderColor: theme.outline,
        },
        searchIcon: {
            marginRight: 8,
        },
        searchInput: {
            flex: 1,
            fontSize: 15,
            color: theme.onSurface,
        },
        filterButton: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: theme.surface,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: theme.mode === 'dark' ? 1 : 0,
            borderColor: theme.outline,
        },
        categoryWrapper: {
            backgroundColor: theme.background,
            paddingBottom: 12,
            marginBottom: 4,
            zIndex: 10,
            elevation: 2,
        },
        categoryScroll: {
            flexGrow: 0,
        },
        categoryContainer: {
            paddingHorizontal: 20,
            paddingRight: 20,
            gap: 8,
            alignItems: 'center',
            flexDirection: 'row',
        },
        categoryButton: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.outline,
            minHeight: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 0,
        },
        categoryButtonActive: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        categoryText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.onSurface,
        },
        categoryTextActive: {
            color: '#FFFFFF',
        },
        productList: {
            paddingHorizontal: 20,
            paddingTop: 4,
            paddingBottom: 20,
        },
        productRow: {
            justifyContent: 'space-between',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyText: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 16,
        },
    });
