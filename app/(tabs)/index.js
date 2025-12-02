// Screen: Index - Home
/*
 * Chức năng:
 * File redirect mặc định cho root
 * Expo Router sẽ lấy index.js làm Home
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    StatusBar,
    Alert,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, IconButton, Chip, Menu } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../src/context/ThemeContext";
import { useProductStore } from "../../src/store/productStore";
import { useUserStore } from "../../src/store/userStore";
import ProductCard from "../../src/components/ProductCard";
import ScreenWrapper from "../../src/components/ScreenWrapper";

// Get categories from data
const getCategoriesFromData = (data, hasViewed = false) => {
    const temp = {};
    for (const item of data) {
        if (temp[item.category] === undefined) {
            temp[item.category] = 1;
        } else {
            temp[item.category]++;
        }
    }
    const categories = Object.keys(temp);
    // Always include "Quán ăn 0 đồng" even if empty
    if (!categories.includes("Quán ăn 0 đồng")) {
        categories.push("Quán ăn 0 đồng");
    }
    categories.unshift("Tất cả");
    if (hasViewed) {
        categories.push("Đã xem gần đây");
    }
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
    const styles = createStyles(theme);

    // Zustand store
    const foodList = useProductStore((state) => state.foodList);
    const cartList = useProductStore((state) => state.cartList);
    const favoriteList = useProductStore((state) => state.favoriteList);
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
    const viewedProducts = useProductStore(
        (state) => state.viewedProducts || []
    );
    const addToViewedProducts = useProductStore(
        (state) => state.addToViewedProducts
    );

    const user = useUserStore((state) => state.user);

    // State
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: "Tất cả",
    });
    const [sortedProducts, setSortedProducts] = useState([]);
    const [visibleFilterMenu, setVisibleFilterMenu] = useState(false);
    const [filterType, setFilterType] = useState("default");

    const listRef = useRef(null);

    // Filter logic
    const applyFilter = useCallback(
        (category, type) => {
            let list;

            if (category === "Đã xem gần đây") {
                list = viewedProducts || [];
            } else {
                list = getFilteredList(category, foodList);
            }

            if (searchText) {
                list = list.filter((item) =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            let sorted = [...list];
            if (type === "price_asc") {
                sorted.sort((a, b) => {
                    const priceA =
                        a.prices && a.prices.length > 0
                            ? a.prices[0].price
                            : a.price || 0;
                    const priceB =
                        b.prices && b.prices.length > 0
                            ? b.prices[0].price
                            : b.price || 0;
                    return priceA - priceB;
                });
            } else if (type === "price_desc") {
                sorted.sort((a, b) => {
                    const priceA =
                        a.prices && a.prices.length > 0
                            ? a.prices[0].price
                            : a.price || 0;
                    const priceB =
                        b.prices && b.prices.length > 0
                            ? b.prices[0].price
                            : b.price || 0;
                    return priceB - priceA;
                });
            } else if (type === "rating_desc") {
                sorted.sort((a, b) => b.average_rating - a.average_rating);
            }

            setSortedProducts(sorted);
        },
        [foodList, viewedProducts, searchText]
    );

    // Recompute categories and filtered list when data changes
    useEffect(() => {
        if (foodList && foodList.length > 0) {
            const cats = getCategoriesFromData(
                foodList,
                viewedProducts && viewedProducts.length > 0
            );
            // Don't add "Quán ăn 0 đồng" - it's in bottom navigation
            setCategories(cats);

            // Reset về category hiện tại hoặc mặc định là Tất cả
            let currentCat = categoryIndex.category;
            if (!cats.includes(currentCat)) {
                currentCat = cats[0];
            }

            setCategoryIndex({
                index: cats.indexOf(currentCat),
                category: currentCat,
            });

            // Apply current filter and category
            applyFilter(currentCat, filterType);
        }
    }, [
        foodList,
        viewedProducts,
        applyFilter,
        categoryIndex.category,
        filterType,
    ]);

    // Effect to re-apply filter when type changes
    useEffect(() => {
        applyFilter(categoryIndex.category, filterType);
    }, [filterType, searchText, applyFilter, categoryIndex.category]);

    // Search function
    const searchProduct = (search) => {
        setSearchText(search);
        // Logic filtered handled in useEffect dependency
    };

    // Reset search
    const resetSearch = () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSearchText("");
        setFilterType("default");
        applyFilter(categories[0], "default");
    };

    // Add to cart handler
    const handleAddToCart = async (item) => {
        if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        // API có thể trả về prices khác format local, cần kiểm tra
        const defaultPrice =
            item.prices && item.prices.length > 0
                ? item.prices[0]
                : {
                      size: "M",
                      price: 0,
                      currency: "đ",
                  };

        addToCart({
            id: item.id,
            index: item.index,
            name: item.name,
            roasted: item.roasted,
            imageIcon: item.imageIcon,
            special_ingredient: item.special_ingredient,
            type: item.type || "Food",
            prices: [{ ...defaultPrice, quantity: 1 }],
        });
        calculateCartPrice();
    };

    // Toggle favorite
    const handleFavorite = (id, favourite, type) => {
        // Check login
        if (!user) {
            Alert.alert(
                "Yêu cầu đăng nhập",
                "Bạn cần đăng nhập để thêm vào yêu thích.",
                [
                    { text: "Hủy", style: "cancel" },
                    {
                        text: "Đăng nhập",
                        onPress: () => router.push("/auth/login"),
                    },
                ]
            );
            return;
        }

        if (favourite) {
            deleteFromFavoriteList(type, id);
        } else {
            addToFavoriteList(type, id);
        }
    };

    // Navigate to details
    const handleCardPress = (item) => {
        if (addToViewedProducts) {
            addToViewedProducts(item);
        }
        // Đã xóa param index để tránh gây hiểu nhầm
        router.push({
            pathname: "/product/[id]",
            params: { id: item.id, type: item.type || "Food" },
        });
    };

    // Render Filter Menu
    const renderFilterMenu = () => (
        <Menu
            visible={visibleFilterMenu}
            onDismiss={() => setVisibleFilterMenu(false)}
            anchor={
                <IconButton
                    icon="filter"
                    size={24}
                    iconColor={theme.primary}
                    onPress={() => setVisibleFilterMenu(true)}
                />
            }
            contentStyle={{ backgroundColor: theme.surface, borderRadius: 12 }}
        >
            <Menu.Item
                onPress={() => {
                    setFilterType("default");
                    setVisibleFilterMenu(false);
                }}
                title="Mặc định"
                leadingIcon={filterType === "default" ? "check" : undefined}
            />
            <Menu.Item
                onPress={() => {
                    setFilterType("price_asc");
                    setVisibleFilterMenu(false);
                }}
                title="Giá: Thấp đến Cao"
                leadingIcon={filterType === "price_asc" ? "check" : undefined}
            />
            <Menu.Item
                onPress={() => {
                    setFilterType("price_desc");
                    setVisibleFilterMenu(false);
                }}
                title="Giá: Cao đến Thấp"
                leadingIcon={filterType === "price_desc" ? "check" : undefined}
            />
            <Menu.Item
                onPress={() => {
                    setFilterType("rating_desc");
                    setVisibleFilterMenu(false);
                }}
                title="Đánh giá cao nhất"
                leadingIcon={filterType === "rating_desc" ? "check" : undefined}
            />
        </Menu>
    );

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {/* Header */}
            <LinearGradient
                colors={[theme.primary, theme.primaryGradientEnd]}
                style={styles.headerGradient}
            >
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.locationContainer}>
                            <Text
                                variant="bodySmall"
                                style={styles.locationLabel}
                            >
                                Khám phá
                            </Text>
                            <Text
                                variant="titleMedium"
                                style={[styles.title, { fontWeight: "bold" }]}
                                numberOfLines={1}
                            >
                                Món ăn ngon
                            </Text>
                        </View>
                    </View>

                    {/* Updated Right Buttons: Cart + Favorites */}
                    <View style={styles.headerRight}>
                        <View style={{ position: "relative" }}>
                            <IconButton
                                icon="cart-outline"
                                size={28}
                                iconColor={theme.onPrimary}
                                onPress={() => router.push("/cart")}
                            />
                            {cartList && cartList.length > 0 && (
                                <View
                                    style={[
                                        styles.badge,
                                        {
                                            backgroundColor: theme.error,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            fontSize: 10,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {cartList.length}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={{ position: "relative" }}>
                            <IconButton
                                icon="heart-outline"
                                size={28}
                                iconColor={theme.onPrimary}
                                onPress={() => router.push("/favorites")}
                            />
                            {favoriteList && favoriteList.length > 0 && (
                                <View
                                    style={[
                                        styles.badge,
                                        {
                                            backgroundColor: theme.error,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            fontSize: 10,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {favoriteList.length}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* Search Bar & Filter */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Tìm kiếm món ăn..."
                    value={searchText}
                    onChangeText={searchProduct}
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
                    theme={{ roundness: theme.radius.md }}
                />
                {renderFilterMenu()}
            </View>

            {/* Recently Viewed (Example UI - needs store data) */}
            {/* REMOVED - Now in categories */}

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
                            key={category}
                            selected={categoryIndex.index === index}
                            onPress={() => {
                                if (Platform.OS !== "web") {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light
                                    );
                                }
                                setCategoryIndex({ index, category });
                                applyFilter(category, filterType);

                                setTimeout(() => {
                                    listRef?.current?.scrollToOffset({
                                        animated: false,
                                        offset: 0,
                                    });
                                }, 0);
                            }}
                            style={[
                                styles.categoryChip,
                                categoryIndex.index === index &&
                                    styles.categoryChipSelected,
                            ]}
                            textStyle={styles.categoryChipText}
                            selectedColor={theme.primary}
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
                keyExtractor={(item) =>
                    item.id ? item.id.toString() : Math.random().toString()
                }
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
                            {categoryIndex.category === "Quán ăn 0 đồng"
                                ? "Hiện tại chưa có quán ăn đăng món, quý khách vui lòng quay lại sau"
                                : foodList.length === 0
                                ? "Đang tải dữ liệu..."
                                : "Không tìm thấy sản phẩm"}
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

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        headerGradient: {
            borderBottomLeftRadius: theme.radius.lg,
            borderBottomRightRadius: theme.radius.lg,
            elevation: 4,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 8,
            paddingBottom: 12,
            paddingHorizontal: 20,
        },
        locationContainer: {
            justifyContent: "center",
            flex: 1,
        },
        locationLabel: {
            color: theme.onPrimary,
            fontSize: 12,
            opacity: 0.9,
        },
        locationRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
        },
        headerRight: {
            flexDirection: "row",
            alignItems: "center",
        },
        greeting: {
            marginBottom: 4,
        },
        title: {
            color: theme.onPrimary,
        },
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20,
            gap: 8,
        },
        searchInput: {
            flex: 1,
            backgroundColor: theme.surface,
            borderRadius: theme.radius.md,
        },
        recentContainer: {
            marginBottom: 16,
        },
        sectionTitle: {
            paddingHorizontal: 20,
            marginBottom: 8,
            fontWeight: "bold",
            color: theme.onBackground,
        },
        recentItem: {
            backgroundColor: theme.surfaceVariant,
            padding: 8,
            borderRadius: 8,
            width: 100,
            alignItems: "center",
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
            marginHorizontal: 0,
            backgroundColor: theme.surface,
            borderRadius: theme.radius.md,
        },
        categoryChipSelected: {
            backgroundColor: theme.primaryContainer,
            borderColor: theme.primary,
            borderWidth: 1,
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
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 16,
            alignItems: "center",
        },
        emptyText: {
            textAlign: "center",
        },
        badge: {
            position: "absolute",
            top: -6,
            right: -6,
            width: 22,
            height: 22,
            borderRadius: 11,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
        },
    });
