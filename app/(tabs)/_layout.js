// Layout cho tabs
/* Vai trò:
 * Define bottom tabs cho nhóm screens trong (tabs)/
 * Config icons, labels, colors cho từng tab
 * Thêm animations và haptic feedback
 */
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";

// Animated Tab Icon Component
function AnimatedTabIcon({ focused, iconName, color, size = 24 }) {
    const scale = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withSpring(focused ? 1.15 : 1, {
                    damping: 15,
                    stiffness: 150,
                }),
            },
        ],
    }));

    const opacity = useAnimatedStyle(() => ({
        opacity: withTiming(focused ? 1 : 0.6, { duration: 200 }),
    }));

    return (
        <Animated.View style={[scale, opacity]}>
            <Ionicons name={iconName} size={size} color={color} />
        </Animated.View>
    );
}

export default function TabLayout() {
    const { theme } = useTheme();
    const prevTabRef = useRef(null);

    const handleTabPress = (routeName) => {
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
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTintColor: theme.onSurface,
                headerTitleStyle: {
                    fontWeight: "600",
                    fontSize: 18,
                },
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopWidth: 0,
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    height: Platform.OS === "ios" ? 88 : 64,
                    paddingBottom: Platform.OS === "ios" ? 24 : 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
                animation: "shift",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Trang chủ",
                    headerTitle: "Kính chào quý khách",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            iconName="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress("home"),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Yêu thích",
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            iconName="heart"
                            color={color}
                            size={size}
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress("favorites"),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Giỏ hàng",
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            iconName="cart"
                            color={color}
                            size={size}
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress("cart"),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedTabIcon
                            focused={focused}
                            iconName="person"
                            color={color}
                            size={size}
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress("profile"),
                }}
            />
        </Tabs>
    );
}
