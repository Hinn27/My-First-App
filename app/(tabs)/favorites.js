// Screen: Favorites - Yêu thích
/* Chức năng:
 * - Hiển thị danh sách sản phẩm yêu thích
 * - Xóa khỏi danh sách yêu thích
 * - Thêm vào giỏ hàng từ favorites
 * - Empty state khi chưa có sản phẩm yêu thích
 */
import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
    Text,
    Button,
    IconButton,
    useTheme as usePaperTheme,
} from 'react-native-paper';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';
import ProductCard from '../../src/components/ProductCard';
import ScreenWrapper from '../../src/components/ScreenWrapper';

export default function FavoritesScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const paperTheme = usePaperTheme();
    const styles = createStyles(theme);

    // Store
    const favoritesList = useProductStore((state) => state.favoritesList);
    const deleteFromFavoriteList = useProductStore(
        (state) => state.deleteFromFavoriteList,
    );
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice,
    );

    // Handlers
    const handleRemoveFavorite = (id, type) => {
        deleteFromFavoriteList(type, id);
    };

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
        Alert.alert('Thành công', `Đã thêm ${item.name} vào giỏ hàng!`);
    };

    const handleCardPress = (item) => {
        router.push({
            pathname: '/product/[id]',
            params: { id: item.id, type: item.type, index: item.index },
        });
    };

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === 'dark' ? 'light-content' : 'dark-content'
                }
            />

            {favoritesList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <IconButton
                        icon="heart-outline"
                        size={80}
                        iconColor={theme.onSurfaceVariant}
                    />
                    <Text variant="headlineMedium" style={styles.emptyText}>
                        Chưa có sản phẩm yêu thích
                    </Text>
                    <Text variant="bodyMedium" style={styles.emptySubtext}>
                        Thêm sản phẩm vào danh sách yêu thích để xem lại sau
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => router.push('/')}
                        style={styles.shopButton}
                    >
                        Khám phá ngay
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
                            onFavoritePress={() =>
                                handleRemoveFavorite(item.id, item.type)
                            }
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
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        emptyText: {
            marginTop: 20,
            textAlign: 'center',
        },
        emptySubtext: {
            marginTop: 8,
            textAlign: 'center',
            paddingHorizontal: 32,
        },
        shopButton: {
            marginTop: 24,
        },
        productList: {
            padding: 20,
        },
        productRow: {
            justifyContent: 'space-between',
        },
    });
