// Screen: Favorites - Danh sách yêu thích
/* Chức năng:
 * - Hiển thị danh sách sản phẩm đã thêm vào mục yêu thích
 * - Chuyển đến chi tiết sản phẩm
 * - Xóa khỏi mục yêu thích
 * - Sử dụng Zustand store để quản lý state
 */
import React from "react";
import { View, StyleSheet, FlatList, StatusBar, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, IconButton } from "react-native-paper";
import { useTheme } from "../../src/context/ThemeContext";
import { useProductStore } from "../../src/store/productStore";
import { useUserStore } from "../../src/store/userStore";
import ProductCard from "../../src/components/ProductCard";
import ScreenWrapper from "../../src/components/ScreenWrapper";

export default function FavoritesScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // Zustand store
    const favoritesList = useProductStore((state) => state.favoritesList);
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );
    const deleteFromFavoriteList = useProductStore(
        (state) => state.deleteFromFavoriteList
    );

    // User store
    const user = useUserStore((state) => state.user);

    const styles = createStyles(theme);

    // Handlers
    const handleAddToCart = (item) => {
        const defaultPrice = item.prices[0];
        addToCart({
            id: item.id,
            index: item.index,
            name: item.name,
            roasted: item.roasted,
            imageIcon: item.imageIcon,
            special_ingredient: item.special_ingredient,
            type: item.type,
            prices: [{ ...defaultPrice, quantity: 1 }],
        });
        calculateCartPrice();
        Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`, [
            { text: "OK" },
        ]);
    };

    const handleRemoveFavorite = (item) => {
        deleteFromFavoriteList(item.type, item.id);
    };

    const handleCardPress = (item) => {
        router.push({
            pathname: "/product/[id]",
            params: { id: item.id, type: item.type, index: item.index },
        });
    };

    // Render Not Logged In View
    if (!user) {
        return (
            <ScreenWrapper
                style={[
                    styles.container,
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    },
                ]}
            >
                <StatusBar
                    backgroundColor={theme.background}
                    barStyle={
                        theme.mode === "dark" ? "light-content" : "dark-content"
                    }
                />
                <IconButton
                    icon="lock-outline"
                    size={80}
                    iconColor={theme.onSurfaceVariant}
                />
                <Text variant="headlineMedium" style={styles.emptyText}>
                    Yêu cầu đăng nhập
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                    Vui lòng đăng nhập để xem danh sách yêu thích của bạn
                </Text>
                <Button
                    mode="contained"
                    onPress={() => router.push("/auth/login")}
                    style={styles.shopButton}
                >
                    Đăng nhập ngay
                </Button>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            {favoritesList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconButton
                        icon="heart-broken-outline"
                        size={80}
                        iconColor={theme.onSurfaceVariant}
                    />
                    <Text variant="headlineMedium" style={styles.emptyText}>
                        Chưa có yêu thích
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtext}>
                        Hãy thêm món ăn yêu thích của bạn vào đây
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => router.push("/")}
                        style={styles.shopButton}
                    >
                        Khám phá món ngon
                    </Button>
                </View>
            ) : (
                <FlatList
                    data={favoritesList}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productRow}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ProductCard
                            {...item}
                            theme={theme}
                            onPress={() => handleCardPress(item)}
                            onAddToCart={() => handleAddToCart(item)}
                            onFavoritePress={() => handleRemoveFavorite(item)}
                        />
                    )}
                />
            )}
        </ScreenWrapper>
    );
}

// Dynamic styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        emptyText: {
            marginTop: 20,
            textAlign: "center",
            color: theme.onSurface,
        },
        emptySubtext: {
            marginTop: 8,
            textAlign: "center",
            color: theme.onSurfaceVariant,
        },
        shopButton: {
            marginTop: 24,
        },
        productList: {
            padding: 20,
            paddingBottom: 100,
        },
        productRow: {
            justifyContent: "space-between",
        },
    });
