// Screen: Profile tab
/* Vai trò:
     * Screen Profile (tab thứ 4)
     * Route: /profile
     * Bao gồm: Info, Menu, Settings
*/

// UI
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useTheme } from '../../src/context/ThemeContext';

export default function ProfileScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Create dynamic styles
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={100} color={theme.primary} />
        </View>
        <Text style={styles.name}>Ngọc Diệu</Text>
        <Text style={styles.bio}>mỏng manh íu đúi</Text>

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

        {/* Menu */}
        <View style={styles.menuContainer}>
          <Link href="/user/123" asChild>
            <Pressable style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color={theme.onSurface} />
              <Text style={styles.menuText}>Thông tin cá nhân</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
            </Pressable>
          </Link>

          <Pressable style={[styles.menuItem, styles.menuItemLast]}>
            <Ionicons name="receipt-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Lịch sử mua hàng</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
          </Pressable>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Cài đặt</Text>

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Thông báo</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.outlineVariant, true: theme.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name={isDarkMode ? "moon" : "moon-outline"} size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Chế độ tối</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.outlineVariant, true: theme.primary }}
              thumbColor="#fff"
            />
          </View>

          <Pressable style={styles.menuItem}>
            <Ionicons name="language-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Ngôn ngữ</Text>
            <Text style={styles.menuValue}>Tiếng Việt</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Bảo mật</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Trợ giúp</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
          </Pressable>

          <Pressable style={[styles.menuItem, styles.menuItemLast]}>
            <Ionicons name="information-circle-outline" size={24} color={theme.onSurface} />
            <Text style={styles.menuText}>Về chúng tôi</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.onSurfaceVariant} />
          </Pressable>
        </View>

        {/* Logout */}
        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={theme.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// Dynamic styles based on theme - Material You Design
const createStyles = (theme) => StyleSheet.create({
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
