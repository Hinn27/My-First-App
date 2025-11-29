// Screen: Login
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text,
    TextInput,
    Button,
    Card,
    IconButton,
    Divider,
    useTheme as usePaperTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useUserStore } from '../../src/store/userStore';

export default function LoginScreen() {
    const { theme } = useTheme();
    const paperTheme = usePaperTheme();
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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Save user data (Fake data for testing)
            const userData = {
                email,
                name: email.split('@')[0], // Use part before @ as name
                isLoggedIn: true,
                loginTime: new Date().toISOString(),
            };

            // Save to both AsyncStorage and Zustand store
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            Alert.alert('Thành công', 'Đăng nhập thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/(tabs)/home'),
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
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Ionicons name="cafe" size={80} color={theme.primary} />
                        <Text variant="headlineLarge" style={styles.title}>
                            Đăng nhập
                        </Text>
                        <Text variant="bodyLarge" style={styles.subtitle}>
                            Chào mừng bạn quay trở lại!
                        </Text>
                    </View>

                    {/* Form Card */}
                    <Card style={styles.card} mode="elevated">
                        <Card.Content style={styles.cardContent}>
                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                left={<TextInput.Icon icon="email-outline" />}
                                style={styles.input}
                            />

                            <TextInput
                                label="Mật khẩu"
                                value={password}
                                onChangeText={setPassword}
                                mode="outlined"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                left={<TextInput.Icon icon="lock-outline" />}
                                right={
                                    <TextInput.Icon
                                        icon={showPassword ? 'eye-off' : 'eye'}
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                }
                                style={styles.input}
                            />

                            <Button
                                mode="text"
                                onPress={() =>
                                    Alert.alert(
                                        'Thông báo',
                                        'Tính năng đang phát triển',
                                    )
                                }
                                style={styles.forgotPassword}
                                labelStyle={styles.forgotPasswordText}
                            >
                                Quên mật khẩu?
                            </Button>

                            <Button
                                mode="contained"
                                onPress={handleLogin}
                                loading={loading}
                                disabled={loading}
                                style={styles.loginButton}
                                contentStyle={styles.loginButtonContent}
                            >
                                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </Button>

                            <Divider style={styles.divider} />

                            <Button
                                mode="outlined"
                                onPress={() =>
                                    Alert.alert(
                                        'Thông báo',
                                        'Tính năng đang phát triển',
                                    )
                                }
                                icon="google"
                                style={styles.socialButton}
                                contentStyle={styles.socialButtonContent}
                            >
                                Đăng nhập với Google
                            </Button>

                            <Button
                                mode="outlined"
                                onPress={() =>
                                    Alert.alert(
                                        'Thông báo',
                                        'Tính năng đang phát triển',
                                    )
                                }
                                icon="facebook"
                                style={styles.socialButton}
                                contentStyle={styles.socialButtonContent}
                            >
                                Đăng nhập với Facebook
                            </Button>
                        </Card.Content>
                    </Card>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text variant="bodyMedium" style={styles.footerText}>
                            Chưa có tài khoản?{' '}
                        </Text>
                        <Button
                            mode="text"
                            onPress={() => router.push('/auth/register')}
                            labelStyle={styles.footerLink}
                        >
                            Đăng ký ngay
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContent: {
            flexGrow: 1,
        },
        content: {
            flex: 1,
            padding: 24,
            justifyContent: 'center',
        },
        header: {
            alignItems: 'center',
            marginBottom: 32,
        },
        title: {
            marginTop: 16,
            textAlign: 'center',
        },
        subtitle: {
            marginTop: 8,
            textAlign: 'center',
        },
        card: {
            marginBottom: 24,
        },
        cardContent: {
            paddingTop: 8,
        },
        input: {
            marginBottom: 16,
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            marginTop: -8,
            marginBottom: 16,
        },
        forgotPasswordText: {
            fontSize: 14,
        },
        loginButton: {
            marginTop: 8,
            marginBottom: 16,
        },
        loginButtonContent: {
            paddingVertical: 8,
        },
        divider: {
            marginVertical: 24,
        },
        socialButton: {
            marginBottom: 12,
        },
        socialButtonContent: {
            paddingVertical: 8,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
        },
        footerText: {
            color: theme.onSurfaceVariant,
        },
        footerLink: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    });
