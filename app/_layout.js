// Root Layout
/*
 * Vai trò:
 * Layout chính của toàn bộ app
 * Wrap tất cả screens
 * Define navigation structure (Stack, Tabs, etc.)
 * Bọc ThemeProvider để cung cấp theme Material You colors
 * Bọc PaperProvider để cung cấp Material Design components
 */

import { Stack } from "expo-router";
import {
    Provider as PaperProvider,
    configureFonts,
    MD3LightTheme,
} from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import {
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold_Italic,
} from "@expo-google-fonts/playfair-display";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Font configuration cho Playfair Display
const fontConfig = {
    web: {
        regular: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "PlayfairDisplay_500Medium",
            fontWeight: "normal",
        },
        light: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        thin: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        bold: {
            fontFamily: "PlayfairDisplay_700Bold",
            fontWeight: "bold",
        },
    },
    ios: {
        regular: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "PlayfairDisplay_500Medium",
            fontWeight: "normal",
        },
        light: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        thin: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        bold: {
            fontFamily: "PlayfairDisplay_700Bold",
            fontWeight: "bold",
        },
    },
    android: {
        regular: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "PlayfairDisplay_500Medium",
            fontWeight: "normal",
        },
        light: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        thin: {
            fontFamily: "PlayfairDisplay_400Regular",
            fontWeight: "normal",
        },
        bold: {
            fontFamily: "PlayfairDisplay_700Bold",
            fontWeight: "bold",
        },
    },
};

// Helper để convert theme sang Paper theme
function getPaperTheme(customTheme) {
    const defaultTheme = MD3LightTheme;
    return {
        ...defaultTheme,
        roundness: 16, // Bo góc mềm mại hơn
        colors: {
            ...defaultTheme.colors, // QUAN TRỌNG: Giữ lại các colors mặc định (như elevation)
            primary: customTheme.primary,
            onPrimary: customTheme.onPrimary,
            primaryContainer: customTheme.primaryContainer,
            onPrimaryContainer: customTheme.onPrimaryContainer,
            secondary: customTheme.secondary,
            onSecondary: customTheme.onSecondary,
            secondaryContainer: customTheme.secondaryContainer,
            onSecondaryContainer: customTheme.onSecondaryContainer,
            tertiary: customTheme.tertiary,
            onTertiary: customTheme.onTertiary,
            tertiaryContainer: customTheme.tertiaryContainer,
            onTertiaryContainer: customTheme.onTertiaryContainer,
            error: customTheme.error,
            onError: customTheme.onError,
            errorContainer: customTheme.errorContainer,
            onErrorContainer: customTheme.onErrorContainer,
            background: customTheme.background,
            onBackground: customTheme.onBackground,
            surface: customTheme.surface,
            onSurface: customTheme.onSurface,
            surfaceVariant: customTheme.surfaceVariant,
            onSurfaceVariant: customTheme.onSurfaceVariant,
            outline: customTheme.outline,
            outlineVariant: customTheme.outlineVariant,
            shadow: customTheme.shadow,
            scrim: customTheme.scrim,
            inverseSurface: customTheme.inverseSurface,
            inverseOnSurface: customTheme.inverseOnSurface,
            inversePrimary: customTheme.inversePrimary,
        },
        fonts: configureFonts({ config: fontConfig }),
    };
}

// Inner component để có thể sử dụng useTheme
function AppContent() {
    const { theme } = useTheme();
    const paperTheme = getPaperTheme(theme);

    // Load fonts - Playfair Display
    const [fontsLoaded, fontError] = useFonts({
        PlayfairDisplay_400Regular,
        PlayfairDisplay_500Medium,
        PlayfairDisplay_600SemiBold,
        PlayfairDisplay_700Bold,
        PlayfairDisplay_800ExtraBold,
        PlayfairDisplay_900Black,
        PlayfairDisplay_400Regular_Italic,
        PlayfairDisplay_700Bold_Italic,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <PaperProvider theme={paperTheme}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/** Đã xoá các route cũ food/index, food/[slug] */}
                <Stack.Screen
                    name="user/[id]"
                    options={{
                        title: "Người dùng",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="product/[id]"
                    options={{
                        title: "Chi tiết sản phẩm",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="payment"
                    options={{
                        title: "Thanh toán",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="order-history"
                    options={{
                        title: "Lịch sử đơn hàng",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="auth/login"
                    options={{
                        title: "Đăng nhập",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="auth/register"
                    options={{
                        title: "Đăng ký",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="auth/seller-register"
                    options={{
                        title: "Đăng ký bán hàng",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="seller/my-products"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="seller/revenue"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="seller/add-product"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="chat/[shopId]"
                    options={{
                        headerShown: true,
                        title: "Tin nhắn",
                        headerBackTitle: "Quay lại",
                    }}
                />
                <Stack.Screen
                    name="user/edit-profile"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </PaperProvider>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
