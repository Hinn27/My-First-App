// Layout cho tabs
/* Define bottom tabs and icons */
import { Tabs } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import TabBarIconWithBadge from "../../src/components/TabBarIconWithBadge";
import React from "react";
import { useChatStore } from "../../src/store/chatStore";
import { useUserStore } from "../../src/store/userStore";

// Tab Icons - Modern & Clean Design
const HomeIcon = ({ color, size, focused }) => (
    <TabBarIconWithBadge
        focused={focused}
        iconName={focused ? "home" : "home-outline"}
        color={color}
        size={size}
        badge={0}
    />
);

const FreeFoodIcon = ({ color, size, focused }) => (
    <TabBarIconWithBadge
        focused={focused}
        iconName={focused ? "gift" : "gift-outline"}
        color={color}
        size={size}
        badge={0}
    />
);

const MessagesIcon = ({ color, size, focused }) => {
    const unread = useChatStore((state) => state.unread);
    const user = useUserStore((state) => state.user);
    const isLoggedIn = user?.isLoggedIn || false;

    const totalUnread = isLoggedIn
        ? Object.values(unread || {}).reduce((s, v) => s + (v || 0), 0)
        : 0;

    return (
        <TabBarIconWithBadge
            focused={focused}
            iconName={focused ? "chatbubbles" : "chatbubbles-outline"}
            color={color}
            size={size}
            badge={totalUnread}
        />
    );
};

const OrderIcon = ({ color, size, focused }) => (
    <TabBarIconWithBadge
        focused={focused}
        iconName={focused ? "receipt" : "receipt-outline"}
        color={color}
        size={size}
        badge={0}
    />
);

const ProfileIcon = ({ color, size, focused }) => (
    <TabBarIconWithBadge
        focused={focused}
        iconName={focused ? "person-circle" : "person-circle-outline"}
        color={color}
        size={size}
        badge={0}
    />
);

export default function TabLayout() {
    const { theme } = useTheme();

    const handleTabPress = (_routeName) => {
        // Haptic feedback khi chuyển tab
        if (Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.onSurfaceVariant,
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.surface,
                    elevation: 4,
                    shadowOpacity: 0.1,
                    borderBottomWidth: 0.5,
                    borderBottomColor: theme.outlineVariant,
                },
                headerTintColor: theme.onSurface,
                headerTitleStyle: {
                    fontWeight: "600",
                    fontSize: 18,
                    color: theme.onBackground,
                },
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopWidth: 1,
                    borderTopColor:
                        theme.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                    elevation: 16,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                    height: Platform.OS === "ios" ? 85 : 65,
                    paddingBottom: Platform.OS === "ios" ? 20 : 8,
                    paddingTop: 4,
                    paddingHorizontal: 0,
                    marginHorizontal: 0,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                },
                tabBarItemStyle: {
                    paddingVertical: 2,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                    gap: 1,
                    width: "20%",
                    minWidth: "20%",
                },
                tabBarLabelStyle: {
                    fontSize: 9,
                    fontWeight: "500",
                    marginTop: 2,
                    marginBottom: 0,
                    textAlign: "center",
                },
                tabBarIconStyle: {
                    marginTop: 0,
                    marginBottom: 2,
                },
                animation: "shift",
                tabBarShowLabel: true,
            }}
        >
            {/* Main Tab: Home */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Trang chủ",
                    headerTitle: "Kính chào quý khách",
                    tabBarLabel: "Trang chủ",
                    tabBarIcon: HomeIcon,
                }}
                listeners={{
                    tabPress: () => handleTabPress("home"),
                }}
            />

            {/* Tab: Free Food / Quán ăn 0đ */}
            <Tabs.Screen
                name="free-food"
                options={{
                    title: "Quán ăn 0đ",
                    headerTitle: "Quán ăn 0 đồng",
                    tabBarLabel: "0 đồng",
                    tabBarIcon: FreeFoodIcon,
                }}
                listeners={{ tabPress: () => handleTabPress("free-food") }}
            />

            {/* Tab: Messages / Tin nhắn */}
            <Tabs.Screen
                name="messages"
                options={{
                    title: "Tin nhắn",
                    headerTitle: "Tin nhắn",
                    tabBarLabel: "Tin nhắn",
                    tabBarIcon: MessagesIcon,
                }}
                listeners={{ tabPress: () => handleTabPress("messages") }}
            />

            {/* Tab: Order History */}
            <Tabs.Screen
                name="order-history"
                options={{
                    title: "Đơn hàng",
                    headerTitle: "Lịch sử đơn hàng",
                    tabBarLabel: "Đơn hàng",
                    tabBarIcon: OrderIcon,
                }}
                listeners={{ tabPress: () => handleTabPress("order-history") }}
            />

            {/* Tab: Profile */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Cá nhân",
                    headerTitle: "Tài khoản của tôi",
                    tabBarLabel: "Cá nhân",
                    tabBarIcon: ProfileIcon,
                }}
                listeners={{
                    tabPress: () => handleTabPress("profile"),
                }}
            />

            {/* Hidden Tabs */}
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Giỏ hàng",
                    tabBarButton: () => null,
                    tabBarItemStyle: { width: 0, padding: 0, margin: 0 },
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Yêu thích",
                    tabBarButton: () => null,
                    tabBarItemStyle: { width: 0, padding: 0, margin: 0 },
                }}
            />
        </Tabs>
    );
}
