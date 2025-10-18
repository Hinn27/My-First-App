// Root Layout
/*
* Vai trò:
  * Layout chính của toàn bộ app
    * Wrap tất cả screens
    * Define navigation structure (Stack, Tabs, etc.)
    * Bọc CartProvider để quản lý giỏ hàng global
    * Bọc ThemeProvider để quản lý theme Material You và dark mode
*/

import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="food" options={{ title: 'Món Ăn' }} />
          <Stack.Screen name="drink" options={{ title: 'Đồ Uống' }} />
          <Stack.Screen name="user" options={{ title: 'Người dùng' }} />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}