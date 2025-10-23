// Root Layout
/*
 * Vai trò:
 * Layout chính của toàn bộ app
 * Wrap tất cả screens
 * Define navigation structure (Stack, Tabs, etc.)
 * Bọc CartProvider để quản lý giỏ hàng global
 * Bọc ThemeProvider để cung cấp theme Material You colors
 */

import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <CartProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="modal"
                        options={{ presentation: 'modal' }}
                    />
                    <Stack.Screen
                        name="food/index"
                        options={{
                            title: 'Món Ăn',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="food/[slug]"
                        options={{
                            title: 'Chi tiết món ăn',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="drink/index"
                        options={{
                            title: 'Đồ Uống',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="drink/[drink]"
                        options={{
                            title: 'Chi tiết đồ uống',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="user/[id]"
                        options={{
                            title: 'Người dùng',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="product/[id]"
                        options={{
                            title: 'Chi tiết sản phẩm',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="payment"
                        options={{
                            title: 'Thanh toán',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="order-history"
                        options={{
                            title: 'Lịch sử đơn hàng',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="auth/login"
                        options={{
                            title: 'Đăng nhập',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="auth/register"
                        options={{
                            title: 'Đăng ký',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="auth/seller-register"
                        options={{
                            title: 'Đăng ký bán hàng',
                            headerShown: false,
                        }}
                    />
                </Stack>
            </CartProvider>
        </ThemeProvider>
    );
}
