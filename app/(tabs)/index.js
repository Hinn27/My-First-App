// Screen: Home - App đặt đồ ăn/uống
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal,
    TextInput,
    Animated,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { useTheme } from '../../src/context/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

export default function HomeScreen() {
    const { addToCart, getTotalItems } = useCart();
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const [deliveryAddress, setDeliveryAddress] =
        useState('Đang lấy vị trí...');
    const [location, setLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [showAddressModal, setShowAddressModal] = useState(false);

    // Toast notification
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const toastAnim = useRef(new Animated.Value(-100)).current;

    // Form địa chỉ chi tiết
    const [addressForm, setAddressForm] = useState({
        houseNumber: '',
        street: '',
        ward: '',
        city: '',
    });

    // Danh sách món ăn từ các quán gần đây
    const [nearbyDishes, setNearbyDishes] = useState([]);

    // Lấy vị trí người dùng khi component mount
    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        try {
            setLoadingLocation(true);

            // 1. Xin quyền truy cập vị trí
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Quyền truy cập vị trí',
                    'Ứng dụng cần quyền truy cập vị trí để hiển thị địa chỉ giao hàng.',
                    [{ text: 'OK' }],
                );
                setDeliveryAddress('Vui lòng cho phép truy cập vị trí');
                setLoadingLocation(false);
                return;
            }

            // 2. Lấy tọa độ hiện tại
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation(currentLocation);

            // 3. Reverse geocoding: Chuyển tọa độ thành địa chỉ
            const address = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            if (address && address.length > 0) {
                const addr = address[0];
                // Format địa chỉ và lưu vào form
                setAddressForm({
                    houseNumber: addr.streetNumber || '',
                    street: addr.street || '',
                    ward: addr.district || '',
                    city: addr.city || 'Hà Nội',
                });

                const formattedAddress = [
                    addr.street,
                    addr.district,
                    addr.city,
                    addr.country,
                ]
                    .filter(Boolean)
                    .join(', ');

                setDeliveryAddress(formattedAddress || 'Hà Nội, Việt Nam');
            } else {
                setDeliveryAddress('Hà Nội, Việt Nam');
            }

            // Tải món ăn gần vị trí (3km)
            loadNearbyDishes(currentLocation.coords);
        } catch (error) {
            console.error('Error getting location:', error);
            setDeliveryAddress('Hà Nội, Việt Nam');
            Alert.alert(
                'Lỗi',
                'Không thể lấy vị trí hiện tại. Vui lòng thử lại.',
                [{ text: 'OK' }],
            );
        } finally {
            setLoadingLocation(false);
        }
    };

    // Hàm tải món ăn từ các quán trong bán kính 3km
    const loadNearbyDishes = (coords) => {
        // TODO: Gọi API backend để lấy món ăn gần vị trí
        // Hiện tại dùng data mẫu
        const mockDishes = [
            {
                id: 'nb-1',
                name: 'Phở Bò Đặc Biệt',
                price: 55000,
                rating: 4.9,
                restaurant: 'Phở Hà Nội',
                distance: 0.8,
                image: '🍜',
            },
            {
                id: 'nb-2',
                name: 'Bún Chả Hà Nội',
                price: 50000,
                rating: 4.8,
                restaurant: 'Bún Chả Đắc Kim',
                distance: 1.2,
                image: '🍲',
            },
            {
                id: 'nb-3',
                name: 'Cơm Tấm Sườn Bì',
                price: 45000,
                rating: 4.7,
                restaurant: 'Cơm Tấm Sài Gòn',
                distance: 1.5,
                image: '🍚',
            },
            {
                id: 'nb-4',
                name: 'Bánh Mì Thịt Nướng',
                price: 25000,
                rating: 4.9,
                restaurant: 'Bánh Mì Hòa Mã',
                distance: 0.5,
                image: '🥖',
            },
            {
                id: 'nb-5',
                name: 'Cà Phê Sữa Đá',
                price: 20000,
                rating: 4.8,
                restaurant: 'The Coffee House',
                distance: 0.9,
                image: '☕',
            },
            {
                id: 'nb-6',
                name: 'Trà Sữa Trân Châu',
                price: 35000,
                rating: 4.7,
                restaurant: 'Gong Cha',
                distance: 1.1,
                image: '🧋',
            },
            {
                id: 'nb-7',
                name: 'Bún Bò Huế',
                price: 50000,
                rating: 4.8,
                restaurant: 'Bún Bò Huế Miền Trung',
                distance: 2.0,
                image: '🍜',
            },
            {
                id: 'nb-8',
                name: 'Hủ Tiếu Nam Vang',
                price: 45000,
                rating: 4.6,
                restaurant: 'Hủ Tiếu Mỹ Tho',
                distance: 2.3,
                image: '🍜',
            },
        ];
        setNearbyDishes(mockDishes);
    };

    const handleOpenAddressModal = () => {
        setShowAddressModal(true);
    };

    const handleSaveManualAddress = () => {
        const { houseNumber, street, ward, city } = addressForm;

        // Validate
        if (
            !houseNumber.trim() ||
            !street.trim() ||
            !ward.trim() ||
            !city.trim()
        ) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin địa chỉ');
            return;
        }

        // Format và lưu địa chỉ
        const fullAddress = `${houseNumber} ${street}, ${ward}, ${city}`;
        setDeliveryAddress(fullAddress);
        setShowAddressModal(false);

        // TODO: Tải lại món ăn dựa trên địa chỉ mới
        Alert.alert('Thành công', 'Đã cập nhật địa chỉ giao hàng');
    };

    const handleUseCurrentLocation = () => {
        setShowAddressModal(false);
        getCurrentLocation();
    };

    // Hàm hiển thị toast notification
    const showToastNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);

        // Animation slide down
        Animated.sequence([
            Animated.timing(toastAnim, {
                toValue: 20,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(toastAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowToast(false);
        });
    };

    // Hàm thêm món vào giỏ có thông báo
    const handleAddToCart = (item) => {
        addToCart(item);
        showToastNotification(`Đã thêm ${item.name} vào giỏ hàng`);
    };

    // Create dynamic styles based on current theme
    const styles = createStyles(theme);

    return (
        <>
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.locationContainer}>
                        <Ionicons
                            name="location"
                            size={20}
                            color={theme.error}
                        />
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationLabel}>Giao đến</Text>
                            <Pressable onPress={handleOpenAddressModal}>
                                <View style={styles.addressRow}>
                                    {loadingLocation ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={theme.primary}
                                        />
                                    ) : (
                                        <>
                                            <Text
                                                style={styles.locationAddress}
                                                numberOfLines={1}
                                            >
                                                {deliveryAddress}
                                            </Text>
                                            <Ionicons
                                                name="chevron-down"
                                                size={16}
                                                color={theme.onSurface}
                                            />
                                        </>
                                    )}
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    <Link href="/cart" asChild>
                        <Pressable style={styles.cartButton}>
                            <Ionicons
                                name="cart-outline"
                                size={28}
                                color={theme.onSurface}
                            />
                            {getTotalItems() > 0 && (
                                <View style={styles.cartBadge}>
                                    <Text style={styles.cartBadgeText}>
                                        {getTotalItems()}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                </View>

                <Pressable style={styles.searchBar}>
                    <Ionicons
                        name="search"
                        size={20}
                        color={theme.onSurfaceVariant}
                    />
                    <Text style={styles.searchPlaceholder}>
                        Tìm món ăn, đồ uống...
                    </Text>
                </Pressable>

                <View style={styles.bannerContainer}>
                    <Pressable style={styles.banner}>
                        <View style={styles.bannerContent}>
                            <Text style={styles.bannerTitle}>
                                🎉 Khuyến mãi hôm nay
                            </Text>
                            <Text style={styles.bannerSubtitle}>
                                Giảm 30% cho đơn từ 100k
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={theme.onPrimary}
                        />
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Danh mục</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryScrollContainer}
                    >
                        <Link href="/food" asChild>
                            <Pressable style={styles.categoryItem}>
                                <View
                                    style={[
                                        styles.categoryIconCircle,
                                        { backgroundColor: theme.cardFood },
                                    ]}
                                >
                                    <Ionicons
                                        name="restaurant"
                                        size={26}
                                        color={theme.primary}
                                    />
                                </View>
                                <Text style={styles.categoryText}>Món Ăn</Text>
                            </Pressable>
                        </Link>

                        <Link href="/drink" asChild>
                            <Pressable style={styles.categoryItem}>
                                <View
                                    style={[
                                        styles.categoryIconCircle,
                                        { backgroundColor: theme.cardDrink },
                                    ]}
                                >
                                    <Ionicons
                                        name="cafe"
                                        size={26}
                                        color={theme.secondary}
                                    />
                                </View>
                                <Text style={styles.categoryText}>Đồ Uống</Text>
                            </Pressable>
                        </Link>

                        <Pressable style={styles.categoryItem}>
                            <View
                                style={[
                                    styles.categoryIconCircle,
                                    { backgroundColor: theme.cardPromo },
                                ]}
                            >
                                <Ionicons
                                    name="flash"
                                    size={26}
                                    color={theme.error}
                                />
                            </View>
                            <Text style={styles.categoryText}>Ưu Đãi</Text>
                        </Pressable>

                        <Pressable style={styles.categoryItem}>
                            <View
                                style={[
                                    styles.categoryIconCircle,
                                    { backgroundColor: theme.cardFavorite },
                                ]}
                            >
                                <Ionicons
                                    name="heart"
                                    size={26}
                                    color={theme.tertiary}
                                />
                            </View>
                            <Text style={styles.categoryText}>Yêu Thích</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Món ăn gần bạn (trong 3km)
                        </Text>
                        <Pressable>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                        </Pressable>
                    </View>

                    {nearbyDishes.length > 0 ? (
                        nearbyDishes.map((item) => (
                            <Pressable
                                key={item.id}
                                style={styles.featuredCard}
                            >
                                <View style={styles.featuredIcon}>
                                    <Text style={styles.dishEmoji}>
                                        {item.image}
                                    </Text>
                                </View>

                                <View style={styles.featuredInfo}>
                                    <Text style={styles.featuredName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.restaurantName}>
                                        {item.restaurant}
                                    </Text>
                                    <View style={styles.featuredMeta}>
                                        <Ionicons
                                            name="star"
                                            size={14}
                                            color="#FFD700"
                                        />
                                        <Text style={styles.featuredRating}>
                                            {item.rating}
                                        </Text>
                                        <Text style={styles.featuredDot}>
                                            •
                                        </Text>
                                        <Ionicons
                                            name="navigate"
                                            size={12}
                                            color="#8e8e93"
                                        />
                                        <Text style={styles.distanceText}>
                                            {item.distance}km
                                        </Text>
                                        <Text style={styles.featuredDot}>
                                            •
                                        </Text>
                                        <Text style={styles.featuredPrice}>
                                            {item.price.toLocaleString('vi-VN')}
                                            đ
                                        </Text>
                                    </View>
                                </View>

                                <Pressable
                                    style={styles.addButton}
                                    onPress={() =>
                                        handleAddToCart({
                                            id: item.id,
                                            name: item.name,
                                            price: item.price,
                                        })
                                    }
                                >
                                    <Ionicons
                                        name="add"
                                        size={22}
                                        color={theme.primary}
                                    />
                                </Pressable>
                            </Pressable>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Ionicons
                                name="location-outline"
                                size={48}
                                color={theme.onSurfaceVariant}
                            />
                            <Text style={styles.emptyStateText}>
                                Đang tải món ăn gần bạn...
                            </Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Toast Notification */}
            {showToast && (
                <Animated.View
                    style={[
                        styles.toast,
                        {
                            transform: [{ translateY: toastAnim }],
                        },
                    ]}
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={theme.onTertiary}
                    />
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            )}

            <Modal
                visible={showAddressModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowAddressModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Địa chỉ giao hàng
                            </Text>
                            <Pressable
                                onPress={() => setShowAddressModal(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color={theme.onSurface}
                                />
                            </Pressable>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Số nhà *</Text>
                                <TextInput
                                    style={styles.formInput}
                                    value={addressForm.houseNumber}
                                    onChangeText={(text) =>
                                        setAddressForm({
                                            ...addressForm,
                                            houseNumber: text,
                                        })
                                    }
                                    placeholder="Ví dụ: 123"
                                    placeholderTextColor={
                                        theme.onSurfaceVariant
                                    }
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    Tên đường *
                                </Text>
                                <TextInput
                                    style={styles.formInput}
                                    value={addressForm.street}
                                    onChangeText={(text) =>
                                        setAddressForm({
                                            ...addressForm,
                                            street: text,
                                        })
                                    }
                                    placeholder="Ví dụ: Nguyễn Huệ"
                                    placeholderTextColor={
                                        theme.onSurfaceVariant
                                    }
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    Phường/Xã *
                                </Text>
                                <TextInput
                                    style={styles.formInput}
                                    value={addressForm.ward}
                                    onChangeText={(text) =>
                                        setAddressForm({
                                            ...addressForm,
                                            ward: text,
                                        })
                                    }
                                    placeholder="Ví dụ: Phường Bến Nghé"
                                    placeholderTextColor={
                                        theme.onSurfaceVariant
                                    }
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    Thành phố *
                                </Text>
                                <TextInput
                                    style={styles.formInput}
                                    value={addressForm.city}
                                    onChangeText={(text) =>
                                        setAddressForm({
                                            ...addressForm,
                                            city: text,
                                        })
                                    }
                                    placeholder="Ví dụ: Hồ Chí Minh"
                                    placeholderTextColor={
                                        theme.onSurfaceVariant
                                    }
                                />
                            </View>

                            <Pressable
                                style={styles.gpsButton}
                                onPress={handleUseCurrentLocation}
                            >
                                <Ionicons
                                    name="locate"
                                    size={20}
                                    color={theme.primary}
                                />
                                <Text style={styles.gpsButtonText}>
                                    Sử dụng vị trí hiện tại
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.saveButton}
                                onPress={handleSaveManualAddress}
                            >
                                <Text style={styles.saveButtonText}>
                                    Lưu địa chỉ
                                </Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}

// Dynamic styles based on theme - Material You Design
const createStyles = (theme) =>
    StyleSheet.create({
        scrollContainer: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
            elevation: 2,
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            gap: 8,
        },
        locationTextContainer: { flex: 1 },
        locationLabel: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
            marginBottom: 2,
        },
        addressRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        locationAddress: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
            maxWidth: 200,
        },
        cartButton: {
            position: 'relative',
            padding: 8,
        },
        cartBadge: {
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: theme.error,
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
        },
        cartBadgeText: {
            color: theme.onError,
            fontSize: 11,
            fontWeight: '700',
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surfaceVariant,
            margin: 16,
            padding: 14,
            borderRadius: 28,
            gap: 8,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        searchPlaceholder: {
            fontSize: 15,
            color: theme.onSurfaceVariant,
        },
        bannerContainer: {
            paddingHorizontal: 16,
            marginBottom: 20,
        },
        banner: {
            backgroundColor: theme.primary,
            borderRadius: 24,
            padding: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        bannerContent: { flex: 1 },
        bannerTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.onPrimary,
            marginBottom: 6,
        },
        bannerSubtitle: {
            fontSize: 14,
            color: theme.onPrimary,
            opacity: 0.8,
        },
        section: {
            paddingHorizontal: 16,
            marginBottom: 24,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        sectionTitle: {
            fontSize: 22,
            fontWeight: '700',
            color: theme.onBackground,
        },
        seeAllText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.primary,
        },
        categoryScrollContainer: {
            paddingVertical: 8,
            gap: 16,
        },
        categoryItem: {
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 8,
        },
        categoryIconCircle: {
            width: 68,
            height: 68,
            borderRadius: 34,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.mode === 'dark' ? 0 : 0.1,
            shadowRadius: 4,
            elevation: theme.mode === 'dark' ? 0 : 2,
        },
        categoryText: {
            fontSize: 13,
            fontWeight: '600',
            color: theme.onSurface,
            textAlign: 'center',
            marginTop: 4,
        },
        featuredCard: {
            flexDirection: 'row',
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            alignItems: 'center',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: theme.mode === 'dark' ? 0 : 0.06,
            shadowRadius: 4,
            elevation: theme.mode === 'dark' ? 0 : 2,
            borderWidth: theme.mode === 'dark' ? 1 : 0,
            borderColor: theme.outline,
        },
        featuredIcon: {
            width: 68,
            height: 68,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            backgroundColor: theme.surfaceVariant,
        },
        featuredInfo: { flex: 1 },
        featuredName: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onSurface,
            marginBottom: 4,
        },
        featuredMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        featuredRating: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.onSurface,
        },
        featuredDot: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
        },
        featuredPrice: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.primary,
        },
        addButton: {
            backgroundColor: theme.primaryContainer,
            width: 44,
            height: 44,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
        },
        dishEmoji: { fontSize: 44 },
        restaurantName: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
            marginBottom: 4,
        },
        distanceText: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
        },
        emptyState: {
            alignItems: 'center',
            paddingVertical: 40,
        },
        emptyStateText: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            marginTop: 12,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'flex-end',
        },
        modalContent: {
            backgroundColor: theme.surface,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            padding: 24,
            paddingBottom: 40,
            maxHeight: '80%',
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.onSurface,
        },
        formGroup: { marginBottom: 16 },
        formLabel: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.onSurface,
            marginBottom: 8,
        },
        formInput: {
            backgroundColor: theme.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            fontSize: 15,
            color: theme.onSurface,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        gpsButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: theme.primaryContainer,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
            marginTop: 4,
        },
        gpsButtonText: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.primary,
        },
        saveButton: {
            backgroundColor: theme.primary,
            padding: 18,
            borderRadius: 16,
            alignItems: 'center',
            elevation: 2,
        },
        saveButtonText: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.onPrimary,
        },
        toast: {
            position: 'absolute',
            top: 0,
            left: 20,
            right: 20,
            backgroundColor: theme.tertiary,
            borderRadius: 16,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
            zIndex: 1000,
        },
        toastText: {
            color: theme.onTertiary,
            fontSize: 15,
            fontWeight: '600',
            flex: 1,
        },
    });
