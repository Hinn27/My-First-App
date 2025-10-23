// Screen: Login
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useUserStore } from '../../src/store/userStore';

export default function LoginScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const styles = createStyles(theme);

    const handleLogin = async () => {
        // Validation
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Lỗi', 'Email không hợp lệ');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with actual API call
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Save user data
            const userData = {
                email,
                name: email.split('@')[0],
                isLoggedIn: true,
                loginTime: new Date().toISOString(),
            };

            // Save to both AsyncStorage and Zustand store
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            Alert.alert('Thành công', 'Đăng nhập thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/(tabs)/profile'),
                },
            ]);
        } catch (error) {
            Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Ionicons name="cafe" size={80} color={theme.primary} />
                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={styles.subtitle}>
                        Chào mừng bạn quay trở lại!
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={theme.onSurfaceVariant}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={theme.onSurfaceVariant}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={theme.onSurfaceVariant}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            placeholderTextColor={theme.onSurfaceVariant}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color={theme.onSurfaceVariant}
                            />
                        </Pressable>
                    </View>

                    <Pressable style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>
                            Quên mật khẩu?
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.loginButton,
                            loading && styles.loginButtonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Text>
                    </Pressable>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Hoặc</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <Pressable
                        style={styles.socialButton}
                        onPress={() =>
                            Alert.alert(
                                'Thông báo',
                                'Tính năng đang phát triển',
                            )
                        }
                    >
                        <Ionicons name="logo-google" size={20} color="#fff" />
                        <Text style={styles.socialButtonText}>
                            Đăng nhập với Google
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.socialButton}
                        onPress={() =>
                            Alert.alert(
                                'Thông báo',
                                'Tính năng đang phát triển',
                            )
                        }
                    >
                        <Ionicons name="logo-facebook" size={20} color="#fff" />
                        <Text style={styles.socialButtonText}>
                            Đăng nhập với Facebook
                        </Text>
                    </Pressable>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Chưa có tài khoản? </Text>
                    <Pressable onPress={() => router.push('/auth/register')}>
                        <Text style={styles.footerLink}>Đăng ký ngay</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        content: {
            flex: 1,
            padding: 24,
            justifyContent: 'center',
        },
        header: {
            alignItems: 'center',
            marginBottom: 40,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.onBackground,
            marginTop: 16,
        },
        subtitle: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 8,
        },
        form: {
            marginBottom: 24,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surfaceVariant,
            borderRadius: 12,
            marginBottom: 16,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        inputIcon: {
            marginRight: 12,
        },
        input: {
            flex: 1,
            height: 56,
            color: theme.onSurface,
            fontSize: 16,
        },
        eyeIcon: {
            padding: 8,
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            marginBottom: 24,
        },
        forgotPasswordText: {
            color: theme.primary,
            fontSize: 14,
            fontWeight: '600',
        },
        loginButton: {
            backgroundColor: theme.primary,
            borderRadius: 12,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
        },
        loginButtonDisabled: {
            opacity: 0.6,
        },
        loginButtonText: {
            color: theme.onPrimary,
            fontSize: 16,
            fontWeight: 'bold',
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.outline,
        },
        dividerText: {
            marginHorizontal: 16,
            color: theme.onSurfaceVariant,
            fontSize: 14,
        },
        socialButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.surfaceVariant,
            borderRadius: 12,
            height: 56,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        socialButtonText: {
            color: theme.onSurface,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 12,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        footerText: {
            color: theme.onSurfaceVariant,
            fontSize: 14,
        },
        footerLink: {
            color: theme.primary,
            fontSize: 14,
            fontWeight: 'bold',
        },
    });
