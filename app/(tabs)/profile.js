// Screen: Profile - Trang cá nhân
/* Chức năng:
 * - Hiển thị thông tin người dùng từ Zustand store
 * - Menu seller (nếu là seller): Đăng sản phẩm, Xem sản phẩm, Quản lí doanh thu
 * - Settings: Theme, notifications
 * - Test functions: Set seller status
 * - Đăng xuất
 */

// UI
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Switch,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../src/context/ThemeContext';
import { useUserStore } from '../../src/store/userStore';

export default function ProfileScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Use Zustand store instead of local state
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const isLoggedIn = user?.isLoggedIn || false;

    // Create dynamic styles
    const styles = createStyles(theme);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // TEST FUNCTION: Set user as approved seller
    const testSetApprovedSeller = async () => {
        try {
            const updatedUser = {
                ...user,
                name: user?.name || 'Test Seller',
                email: user?.email || 'seller@test.com',
                isLoggedIn: true,
                isSeller: true,
                sellerStatus: 'approved',
                sellerInfo: {
                    sellerName: 'Test Seller',
                    storeName: 'Test Store',
                    address: '123 Test Street',
                    phone: '0123456789',
                    registrationDate: new Date().toISOString(),
                },
            };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser); // Update Zustand store
            Alert.alert(
                'Thành công',
                'Đã set user thành seller đã được duyệt! Menu sẽ cập nhật ngay.',
            );
        } catch (error) {
            console.error('Error setting seller:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Profile Header */}
                <View style={styles.avatarContainer}>
                    <Ionicons
                        name="person-circle-outline"
                        size={100}
                        color={theme.primary}
                    />
                </View>

                {isLoggedIn ? (
                    <>
                        <Text style={styles.name}>
                            {user?.name || 'Người dùng'}
                        </Text>
                        <Text style={styles.bio}>
                            {user?.email || 'email@example.com'}
                        </Text>

                        <View style={styles.statsContainer}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>18</Text>
                                <Text style={styles.statLabel}>Đơn hàng</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>36</Text>
                                <Text style={styles.statLabel}>Điểm</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.name}>Khách</Text>
                        <Text style={styles.bio}>
                            Đăng nhập để trải nghiệm đầy đủ
                        </Text>

                        <Pressable
                            style={styles.loginButton}
                            onPress={() => router.push('/auth/login')}
                        >
                            <Text style={styles.loginButtonText}>
                                Đăng nhập
                            </Text>
                        </Pressable>
                    </>
                )}

                {/* Menu */}
                <View style={styles.menuContainer}>
                    {/* Debug log */}
                    {console.log('👤 User Debug:', {
                        isSeller: user?.isSeller,
                        sellerStatus: user?.sellerStatus,
                        showMenu:
                            user?.isSeller && user?.sellerStatus === 'approved',
                    })}

                    <Link href="/user/123" asChild>
                        <Pressable style={styles.menuItem}>
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={theme.onSurface}
                            />
                            <Text style={styles.menuText}>
                                Thông tin cá nhân
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={theme.onSurfaceVariant}
                            />
                        </Pressable>
                    </Link>

                    {/* Show "Add Product" if user is approved seller */}
                    {user?.isSeller && user?.sellerStatus === 'approved' && (
                        <>
                            <Link href="/seller/add-product" asChild>
                                <Pressable style={styles.menuItem}>
                                    <Ionicons
                                        name="add-circle-outline"
                                        size={24}
                                        color={theme.tertiary}
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: theme.tertiary },
                                        ]}
                                    >
                                        Đăng sản phẩm
                                    </Text>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color={theme.onSurfaceVariant}
                                    />
                                </Pressable>
                            </Link>

                            <Link href="/seller/my-products" asChild>
                                <Pressable style={styles.menuItem}>
                                    <Ionicons
                                        name="cube-outline"
                                        size={24}
                                        color={theme.tertiary}
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: theme.tertiary },
                                        ]}
                                    >
                                        Xem sản phẩm của bạn
                                    </Text>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color={theme.onSurfaceVariant}
                                    />
                                </Pressable>
                            </Link>

                            <Link href="/seller/revenue" asChild>
                                <Pressable style={styles.menuItem}>
                                    <Ionicons
                                        name="bar-chart-outline"
                                        size={24}
                                        color={theme.tertiary}
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: theme.tertiary },
                                        ]}
                                    >
                                        Quản lí doanh thu
                                    </Text>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color={theme.onSurfaceVariant}
                                    />
                                </Pressable>
                            </Link>
                        </>
                    )}

                    {/* Show "Register as Seller" if not seller yet */}
                    {!user?.isSeller && (
                        <Link href="/auth/seller-register" asChild>
                            <Pressable style={styles.menuItem}>
                                <Ionicons
                                    name="storefront-outline"
                                    size={24}
                                    color={theme.secondary}
                                />
                                <Text
                                    style={[
                                        styles.menuText,
                                        { color: theme.secondary },
                                    ]}
                                >
                                    Đăng ký bán hàng
                                </Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={theme.onSurfaceVariant}
                                />
                            </Pressable>
                        </Link>
                    )}

                    {/* Show pending status if seller is pending approval */}
                    {user?.isSeller && user?.sellerStatus === 'pending' && (
                        <Pressable style={styles.menuItem} disabled>
                            <Ionicons
                                name="time-outline"
                                size={24}
                                color={theme.secondary}
                            />
                            <Text
                                style={[
                                    styles.menuText,
                                    { color: theme.onSurfaceVariant },
                                ]}
                            >
                                Chờ duyệt trong 24h
                            </Text>
                        </Pressable>
                    )}

                    <Pressable style={[styles.menuItem, styles.menuItemLast]}>
                        <Ionicons
                            name="receipt-outline"
                            size={24}
                            color={theme.onSurface}
                        />
                        <Text style={styles.menuText}>Lịch sử mua hàng</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={theme.onSurfaceVariant}
                        />
                    </Pressable>
                </View>

                {/* Settings Section */}
                <Text style={styles.sectionTitle}>Cài đặt</Text>

                <View style={styles.menuContainer}>
                    <View style={styles.menuItem}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color={theme.onSurface}
                        />
                        <Text style={styles.menuText}>Thông báo</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{
                                false: theme.outlineVariant,
                                true: theme.primary,
                            }}
                            thumbColor="#fff"
                        />
                    </View>

                    <Pressable style={styles.menuItem}>
                        <Ionicons
                            name="language-outline"
                            size={24}
                            color={theme.onSurface}
                        />
                        <Text style={styles.menuText}>Ngôn ngữ</Text>
                        <Text style={styles.menuValue}>Tiếng Việt</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={theme.onSurfaceVariant}
                        />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={24}
                            color={theme.onSurface}
                        />
                        <Text style={styles.menuText}>Bảo mật</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={theme.onSurfaceVariant}
                        />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <Ionicons
                            name="help-circle-outline"
                            size={24}
                            color={theme.onSurface}
                        />
                        <Text style={styles.menuText}>Trợ giúp</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={theme.onSurfaceVariant}
                        />
                    </Pressable>

                    <Pressable
                        style={[styles.menuItem, styles.menuItemLast]}
                        onPress={testSetApprovedSeller}
                    >
                        <Ionicons
                            name="flask-outline"
                            size={24}
                            color={theme.onSurfaceVariant}
                        />
                        <Text
                            style={[
                                styles.menuText,
                                { color: theme.onSurfaceVariant, fontSize: 13 },
                            ]}
                        >
                            🧪 Test: Set seller đã duyệt
                        </Text>
                    </Pressable>
                </View>

                {/* Logout */}
                {isLoggedIn && (
                    <Pressable
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color={theme.error}
                        />
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    );
}

// Dynamic styles based on theme - Material You Design
const createStyles = (theme) =>
    StyleSheet.create({
        scrollContainer: {
            flex: 1,
            backgroundColor: theme.background,
        },
        container: {
            alignItems: 'center',
            padding: 20,
            paddingTop: 40,
            paddingBottom: 40,
        },
        avatarContainer: {
            marginBottom: 16,
        },
        name: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.onBackground,
            marginBottom: 4,
        },
        bio: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginBottom: 32,
        },
        loginButton: {
            backgroundColor: theme.primary,
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 24,
            marginBottom: 32,
        },
        loginButtonText: {
            color: theme.onPrimary,
            fontSize: 16,
            fontWeight: 'bold',
        },
        statsContainer: {
            flexDirection: 'row',
            gap: 40,
            marginBottom: 32,
        },
        stat: {
            alignItems: 'center',
        },
        statNumber: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.primary,
        },
        statLabel: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            marginTop: 4,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.onBackground,
            alignSelf: 'flex-start',
            marginTop: 24,
            marginBottom: 12,
        },
        menuContainer: {
            width: '100%',
            backgroundColor: theme.surface,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 16,
            borderWidth: theme.mode === 'dark' ? 1 : 0,
            borderColor: theme.outline,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.outline,
            gap: 12,
        },
        menuItemLast: {
            borderBottomWidth: 0,
        },
        menuText: {
            flex: 1,
            fontSize: 16,
            color: theme.onSurface,
        },
        menuValue: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            marginRight: 4,
        },
        logoutButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.surface,
            width: '100%',
            padding: 16,
            borderRadius: 16,
            marginTop: 8,
            gap: 8,
            borderWidth: theme.mode === 'dark' ? 1 : 0,
            borderColor: theme.outline,
        },
        logoutText: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.error,
        },
    });
