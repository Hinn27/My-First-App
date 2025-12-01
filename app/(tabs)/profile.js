// Screen: Profile - Trang cá nhân
/* Chức năng:
 * - Hiển thị thông tin người dùng từ Zustand store
 * - Menu seller (nếu là seller): Đăng sản phẩm, Xem sản phẩm, Quản lí doanh thu
 * - Settings: Theme, notifications
 * - Test functions: Set seller status
 * - Đăng xuất
 */

// UI
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
    Text,
    Button,
    Card,
    List,
    Switch,
    IconButton,
    Divider,
} from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../src/context/ThemeContext";
import { useUserStore } from "../../src/store/userStore";
import { useProductStore } from "../../src/store/productStore";
import { useChatStore } from "../../src/store/chatStore"; // Import Chat Store
import ScreenWrapper from "../../src/components/ScreenWrapper";

export default function ProfileScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Use Zustand store instead of local state
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const isLoggedIn = user?.isLoggedIn || false;

    // Access Product Store actions
    const clearCart = useProductStore((state) => state.clearCart);
    const clearViewedProducts = useProductStore(
        (state) => state.clearViewedProducts
    );
    const clearOrderHistory = useProductStore(
        (state) => state.clearOrderHistory
    );
    const clearFavorites = useProductStore((state) => state.clearFavorites);

    // Access Chat Store actions
    const clearChat = useChatStore((state) => state.clearChat);

    // Create dynamic styles
    const styles = createStyles(theme);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Function to clear all data and reset app
    const handleClearDataAndLogout = async () => {
        try {
            // 1. Clear All AsyncStorage first
            await AsyncStorage.clear();

            // 2. IMPORTANT: Set viewedOnboarding back to true so we don't see it again
            await AsyncStorage.setItem("@viewedOnboarding", "true");

            // 3. Reset User Store
            setUser(null);

            // 4. Reset Product Store - clear everything
            if (clearCart) clearCart();
            if (clearViewedProducts) clearViewedProducts();
            if (clearOrderHistory) clearOrderHistory();
            if (clearFavorites) clearFavorites();

            // 5. Clear Chat Store
            if (clearChat) clearChat();

            // 6. Navigate to Home (Guest mode)
            router.replace("/(tabs)");
        } catch (error) {
            console.error("Error clearing data:", error);
            Alert.alert("Lỗi", "Không thể xoá dữ liệu.");
        }
    };

    // TEST FUNCTION: Set user as approved seller
    const testSetApprovedSeller = async () => {
        try {
            const updatedUser = {
                ...user,
                name: user?.name || "Test Seller",
                email: user?.email || "seller@test.com",
                isLoggedIn: true,
                isSeller: true,
                sellerStatus: "approved",
                sellerInfo: {
                    sellerName: "Test Seller",
                    storeName: "Test Store",
                    address: "123 Test Street",
                    phone: "0123456789",
                    registrationDate: new Date().toISOString(),
                },
            };
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser); // Update Zustand store
            Alert.alert(
                "Thành công",
                "Đã set user thành seller đã được duyệt! Menu sẽ cập nhật ngay."
            );
        } catch (error) {
            console.error("Error setting seller:", error);
        }
    };

    return (
        <ScreenWrapper style={styles.scrollContainer}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Profile Header */}
                    <View style={styles.avatarContainer}>
                        <IconButton
                            icon="account-circle"
                            size={100}
                            iconColor={theme.primary}
                        />
                    </View>

                    {isLoggedIn ? (
                        <>
                            <Text variant="headlineSmall" style={styles.name}>
                                {user?.name || "Người dùng"}
                            </Text>
                            <Text variant="bodyMedium" style={styles.bio}>
                                {user?.email || "email@example.com"}
                            </Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text
                                        variant="headlineMedium"
                                        style={styles.statNumber}
                                    >
                                        18
                                    </Text>
                                    <Text
                                        variant="bodySmall"
                                        style={styles.statLabel}
                                    >
                                        Đơn hàng
                                    </Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text
                                        variant="headlineMedium"
                                        style={styles.statNumber}
                                    >
                                        36
                                    </Text>
                                    <Text
                                        variant="bodySmall"
                                        style={styles.statLabel}
                                    >
                                        Điểm
                                    </Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text variant="headlineSmall" style={styles.name}>
                                Khách
                            </Text>
                            <Text variant="bodyMedium" style={styles.bio}>
                                Đăng nhập để trải nghiệm đầy đủ
                            </Text>

                            <Button
                                mode="contained"
                                onPress={() => router.push("/auth/login")}
                                style={styles.loginButton}
                            >
                                Đăng nhập
                            </Button>
                        </>
                    )}

                    {/* Menu */}
                    <Card
                        style={styles.menuCard}
                        mode="flat"
                        contentStyle={styles.cardContentStyle}
                    >
                        <Card.Content style={styles.cardContent}>
                            {/* Hide info & order history if not logged in */}
                            {isLoggedIn && (
                                <>
                                    <Link href="/user/123" asChild>
                                        <List.Item
                                            title="Thông tin cá nhân"
                                            left={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="account-outline"
                                                />
                                            )}
                                            right={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="chevron-right"
                                                />
                                            )}
                                        />
                                    </Link>

                                    <Divider style={styles.divider} />
                                </>
                            )}

                            {/* Show "Add Product" if user is approved seller */}
                            {user?.isSeller &&
                                user?.sellerStatus === "approved" && (
                                    <>
                                        <Link
                                            href="/seller/add-product"
                                            asChild
                                        >
                                            <List.Item
                                                title="Đăng sản phẩm"
                                                titleStyle={{
                                                    color: theme.tertiary,
                                                }}
                                                left={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="plus-circle-outline"
                                                        color={theme.tertiary}
                                                    />
                                                )}
                                                right={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="chevron-right"
                                                    />
                                                )}
                                            />
                                        </Link>

                                        <Divider style={styles.divider} />

                                        <Link
                                            href="/seller/my-products"
                                            asChild
                                        >
                                            <List.Item
                                                title="Xem sản phẩm của bạn"
                                                titleStyle={{
                                                    color: theme.tertiary,
                                                }}
                                                left={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="package-variant"
                                                        color={theme.tertiary}
                                                    />
                                                )}
                                                right={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="chevron-right"
                                                    />
                                                )}
                                            />
                                        </Link>

                                        <Divider style={styles.divider} />

                                        <Link href="/seller/revenue" asChild>
                                            <List.Item
                                                title="Quản lí doanh thu"
                                                titleStyle={{
                                                    color: theme.tertiary,
                                                }}
                                                left={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="chart-line"
                                                        color={theme.tertiary}
                                                    />
                                                )}
                                                right={(props) => (
                                                    <List.Icon
                                                        {...props}
                                                        icon="chevron-right"
                                                    />
                                                )}
                                            />
                                        </Link>

                                        <Divider style={styles.divider} />
                                    </>
                                )}

                            {/* Show "Register as Seller" if not seller yet AND logged in */}
                            {isLoggedIn && !user?.isSeller && (
                                <>
                                    <Link href="/auth/seller-register" asChild>
                                        <List.Item
                                            title="Đăng ký bán hàng"
                                            titleStyle={{
                                                color: theme.secondary,
                                            }}
                                            left={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="store-outline"
                                                    color={theme.secondary}
                                                />
                                            )}
                                            right={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="chevron-right"
                                                />
                                            )}
                                        />
                                    </Link>

                                    <Divider style={styles.divider} />
                                </>
                            )}

                            {/* Show pending status if seller is pending approval */}
                            {user?.isSeller &&
                                user?.sellerStatus === "pending" && (
                                    <>
                                        <List.Item
                                            title="Chờ duyệt trong 24h"
                                            disabled
                                            left={(props) => (
                                                <List.Icon
                                                    {...props}
                                                    icon="clock-outline"
                                                    color={theme.secondary}
                                                />
                                            )}
                                        />
                                        <Divider style={styles.divider} />
                                    </>
                                )}

                            {/* Order history moved to a top-level tab; keep functionality via tab */}
                        </Card.Content>
                    </Card>

                    {/* Settings Section */}
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        Cài đặt
                    </Text>

                    <Card
                        style={styles.menuCard}
                        mode="flat"
                        contentStyle={styles.cardContentStyle}
                    >
                        <Card.Content style={styles.cardContent}>
                            <List.Item
                                title="Thông báo"
                                left={(props) => (
                                    <List.Icon {...props} icon="bell-outline" />
                                )}
                                right={() => (
                                    <Switch
                                        value={notificationsEnabled}
                                        onValueChange={setNotificationsEnabled}
                                    />
                                )}
                            />

                            <Divider style={styles.divider} />

                            <List.Item
                                title="Ngôn ngữ"
                                description="Tiếng Việt"
                                left={(props) => (
                                    <List.Icon {...props} icon="translate" />
                                )}
                                right={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="chevron-right"
                                    />
                                )}
                                onPress={() =>
                                    Alert.alert(
                                        "Thông báo",
                                        "Tính năng đang phát triển"
                                    )
                                }
                            />

                            <Divider style={styles.divider} />

                            <List.Item
                                title="Bảo mật"
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="shield-check-outline"
                                    />
                                )}
                                right={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="chevron-right"
                                    />
                                )}
                                onPress={() =>
                                    Alert.alert(
                                        "Thông báo",
                                        "Tính năng đang phát triển"
                                    )
                                }
                            />

                            <Divider style={styles.divider} />

                            <List.Item
                                title="Trợ giúp"
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="help-circle-outline"
                                    />
                                )}
                                right={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="chevron-right"
                                    />
                                )}
                                onPress={() =>
                                    Alert.alert(
                                        "Thông báo",
                                        "Tính năng đang phát triển"
                                    )
                                }
                            />

                            <Divider style={styles.divider} />

                            <List.Item
                                title="🧪 Test: Xoá dữ liệu & Reset"
                                titleStyle={{ fontSize: 13 }}
                                descriptionStyle={{ fontSize: 11 }}
                                description="Xoá dữ liệu, không hỏi lại"
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="trash-can-outline"
                                        color={theme.error}
                                    />
                                )}
                                onPress={handleClearDataAndLogout}
                            />

                            <Divider style={styles.divider} />

                            <List.Item
                                title="🧪 Test: Set seller đã duyệt"
                                titleStyle={{ fontSize: 13 }}
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="flask-outline"
                                    />
                                )}
                                onPress={testSetApprovedSeller}
                            />
                        </Card.Content>
                    </Card>

                    {/* Logout */}
                    {isLoggedIn && (
                        <Button
                            mode="outlined"
                            icon="logout"
                            textColor={theme.error}
                            onPress={handleLogout}
                            style={styles.logoutButton}
                        >
                            Đăng xuất
                        </Button>
                    )}
                </View>
            </ScrollView>
        </ScreenWrapper>
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
            alignItems: "center",
            padding: 20,
            paddingTop: 40,
            paddingBottom: 40,
        },
        avatarContainer: {
            marginBottom: 16,
        },
        name: {
            marginBottom: 4,
            textAlign: "center",
        },
        bio: {
            marginBottom: 32,
            textAlign: "center",
        },
        loginButton: {
            marginBottom: 32,
        },
        statsContainer: {
            flexDirection: "row",
            gap: 40,
            marginBottom: 32,
        },
        stat: {
            alignItems: "center",
        },
        statNumber: {
            color: theme.primary,
        },
        statLabel: {
            marginTop: 4,
        },
        sectionTitle: {
            alignSelf: "flex-start",
            marginTop: 24,
            marginBottom: 12,
        },
        menuCard: {
            width: "100%",
            marginBottom: 16,
            borderRadius: 24,
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
        },
        cardContentStyle: {
            borderRadius: 24,
        },
        cardContent: {
            paddingVertical: 0,
            paddingHorizontal: 0,
        },
        divider: {
            marginVertical: 0,
            height: 1,
        },
        logoutButton: {
            width: "100%",
            marginTop: 8,
            borderColor: theme.error,
        },
    });
