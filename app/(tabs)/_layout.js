// Layout cho tabs
/* Vai trò:
 * Define bottom tabs cho nhóm screens trong (tabs)/
 * Config icons, labels, colors cho từng tab
 */
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

export default function TabLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.onSurfaceVariant,
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.surface,
                },
                headerTintColor: theme.onSurface,
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.outline,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Kính chào quý khách',
                    headerTitle: 'Kính chào quý khách',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
