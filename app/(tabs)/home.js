// Screen: Home - Trang chủ với search, filter category, grid layout
/* Chức năng:
 * - Hiển thị danh sách sản phẩm (đồ ăn & đồ uống)
 * - Search theo tên sản phẩm
 * - Filter theo category (Món khô, Món ướt, Cà phê, Trà...)
 * - Thêm vào giỏ hàng, yêu thích
 * - Hiển thị tên người dùng từ Zustand store
 */
import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Dimensions,
    StatusBar,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
    Text,
    TextInput,
    IconButton,
    Chip,
    useTheme as usePaperTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import { useProductStore } from "../../src/store/productStore";
import { useUserStore } from "../../src/store/userStore";
import ProductCard from "../../src/components/ProductCard";
import ScreenWrapper from "../../src/components/ScreenWrapper";

const { width } = Dimensions.get("window");

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
    categories.unshift("Tất cả");
    return categories;
};

// Filter products by category
const getFilteredList = (category, data) => {
    if (category === "Tất cả") {
        return data;
    } else {
        return data.filter((item) => item.category === category);
    }
};

export default function EnhancedHomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const paperTheme = usePaperTheme();
    const styles = createStyles(theme);

    // Zustand store
    const foodList = useProductStore((state) => state.foodList);
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );
    const addToFavoriteList = useProductStore(
        (state) => state.addToFavoriteList
    );
    const deleteFromFavoriteList = useProductStore(
        (state) => state.deleteFromFavoriteList
    );

    // Get user from store
    const user = useUserStore((state) => state.user);

    // State
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: "Tất cả",
    });
    const [sortedProducts, setSortedProducts] = useState([]);

    const listRef = useRef(null);

    // Recompute categories and filtered list when data changes
    useEffect(() => {
        console.log("Home: foodList thay đổi, số lượng:", foodList.length);
        
        if (foodList && foodList.length > 0) {
            const cats = getCategoriesFromData(foodList);
            setCategories(cats);
            
            // Reset về category hiện tại hoặc mặc định là Tất cả
            let currentCat = categoryIndex.category;
            if (!cats.includes(currentCat)) {
                currentCat = cats[0];
            }
            
            setCategoryIndex({ index: cats.indexOf(currentCat), category: currentCat });
            setSortedProducts(getFilteredList(currentCat, foodList));
        }
    }, [foodList]);

    // Search function
    const searchProduct = (search) => {
        if (search !== "") {
            listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
            setCategoryIndex({ index: 0, category: "Tất cả" }); // Reset về tất cả khi search
            setSortedProducts([
                ...foodList.filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                ),
            ]);
        }
    };

    // Reset search
    const resetSearch = () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedProducts([...foodList]);
        setSearchText("");
    };

    // Add to cart handler
    const handleAddToCart = (item) => {
        if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        // API có thể trả về prices khác format local, cần kiểm tra
        const defaultPrice = item.prices && item.prices.length > 0 ? item.prices[0] : { size: 'M', price: 0, currency: 'đ' };
        
        addToCart({
            id: item.id,
            index: item.index,
            name: item.name,
            roasted: item.roasted,
            imageIcon: item.imageIcon,
            special_ingredient: item.special_ingredient,
            type: item.type || 'Food',
            prices: [{ ...defaultPrice, quantity: 1 }],
        });
        calculateCartPrice();
        Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`, [
            { text: "OK" },
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
            pathname: "/product/[id]",
            params: { id: item.id, type: item.type || 'Food', index: item.index },
        });
    };

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text variant="bodyMedium" style={styles.greeting}>
                        Xin chào,
                    </Text>
                    <Text variant="headlineSmall" style={styles.title}>
                        {user?.name || "quý khách"}!
                    </Text>
                </View>
                <IconButton
                    icon="account-circle"
                    size={40}
                    iconColor={theme.primary}
                    onPress={() => router.push("/(tabs)/profile")}
                />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Tìm kiếm món ăn..."
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                        searchProduct(text);
                    }}
                    mode="outlined"
                    left={<TextInput.Icon icon="magnify" />}
                    right={
                        searchText.length > 0 ? (
                            <TextInput.Icon
                                icon="close-circle"
                                onPress={resetSearch}
                            />
                        ) : null
                    }
                    style={styles.searchInput}
                />
                <IconButton
                    icon="filter"
                    size={24}
                    iconColor={theme.primary}
                    onPress={() =>
                        Alert.alert("Thông báo", "Tính năng đang phát triển")
                    }
                />
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={styles.categoryContainer}
                >
                    {categories.map((category, index) => (
                        <Chip
                            key={index}
                            selected={categoryIndex.index === index}
                            onPress={() => {
                                if (Platform.OS !== "web") {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light
                                    );
                                }
                                setCategoryIndex({ index, category });
                                setSortedProducts(
                                    getFilteredList(category, foodList)
                                );
                                setTimeout(() => {
                                    listRef?.current?.scrollToOffset({
                                        animated: false,
                                        offset: 0,
                                    });
                                }, 0);
                            }}
                            style={styles.categoryChip}
                            textStyle={styles.categoryChipText}
                        >
                            {category}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            {/* Products Grid */}
            <FlatList
                ref={listRef}
                data={sortedProducts}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <IconButton
                            icon="magnify"
                            size={64}
                            iconColor={theme.onSurfaceVariant}
                        />
                        <Text variant="bodyLarge" style={styles.emptyText}>
                            {foodList.length === 0 ? "Đang tải dữ liệu..." : "Không tìm thấy sản phẩm"}
                        </Text>
                        <Text variant="bodySmall" style={{color: theme.onSurfaceVariant, marginTop: 8}}>
                            (Kiểm tra kết nối API nếu đợi quá lâu)
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
        </ScreenWrapper>
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 16,
        },
        greeting: {
            marginBottom: 4,
        },
        title: {
            color: theme.onBackground,
        },
        searchContainer: {
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 12,
            marginBottom: 20,
            alignItems: "center",
        },
        searchInput: {
            flex: 1,
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
            alignItems: "center",
            flexDirection: "row",
        },
        categoryChip: {
            marginRight: 0,
        },
        categoryChipText: {
            fontSize: 14,
        },
        productList: {
            paddingHorizontal: 20,
            paddingTop: 4,
            paddingBottom: 20,
        },
        productRow: {
            justifyContent: "space-between",
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 60,
        },
        emptyText: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 16,
        },
    });
