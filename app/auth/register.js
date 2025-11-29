// Screen: Register
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
    useTheme as usePaperTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useUserStore } from '../../src/store/userStore';

export default function RegisterScreen() {
    const { theme } = useTheme();
    const paperTheme = usePaperTheme();
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const styles = createStyles(theme);

    const handleRegister = async () => {
        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Lỗi', 'Email không hợp lệ');
            return;
        }

        if (phone.length < 10) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Save user data
            const userData = {
                name,
                email,
                phone,
                isLoggedIn: true,
                registerTime: new Date().toISOString(),
                isSeller: false,
            };

            // Save to both AsyncStorage and Zustand store
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            Alert.alert('Thành công', 'Đăng ký thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/(tabs)/profile'),
                },
            ]);
        } catch (error) {
            Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
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
                            Đăng ký
                        </Text>
                        <Text variant="bodyLarge" style={styles.subtitle}>
                            Tạo tài khoản mới để bắt đầu
                        </Text>
                    </View>

                    {/* Form Card */}
                    <Card style={styles.card} mode="elevated">
                        <Card.Content style={styles.cardContent}>
                            <TextInput
                                label="Họ và tên"
                                value={name}
                                onChangeText={setName}
                                mode="outlined"
                                autoCapitalize="words"
                                left={<TextInput.Icon icon="account-outline" />}
                                style={styles.input}
                            />

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
                                label="Số điện thoại"
                                value={phone}
                                onChangeText={setPhone}
                                mode="outlined"
                                keyboardType="phone-pad"
                                left={<TextInput.Icon icon="phone-outline" />}
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

                            <TextInput
                                label="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                mode="outlined"
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                                left={<TextInput.Icon icon="lock-outline" />}
                                right={
                                    <TextInput.Icon
                                        icon={
                                            showConfirmPassword
                                                ? 'eye-off'
                                                : 'eye'
                                        }
                                        onPress={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }
                                    />
                                }
                                style={styles.input}
                            />

                            <Button
                                mode="contained"
                                onPress={handleRegister}
                                loading={loading}
                                disabled={loading}
                                style={styles.registerButton}
                                contentStyle={styles.registerButtonContent}
                            >
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                            </Button>

                            <Text variant="bodySmall" style={styles.termsText}>
                                Bằng cách đăng ký, bạn đồng ý với{' '}
                                <Text style={styles.termsLink}>
                                    Điều khoản
                                </Text>{' '}
                                và{' '}
                                <Text style={styles.termsLink}>
                                    Chính sách bảo mật
                                </Text>
                            </Text>
                        </Card.Content>
                    </Card>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text variant="bodyMedium" style={styles.footerText}>
                            Đã có tài khoản?{' '}
                        </Text>
                        <Button
                            mode="text"
                            onPress={() => router.back()}
                            labelStyle={styles.footerLink}
                        >
                            Đăng nhập ngay
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
        registerButton: {
            marginTop: 8,
            marginBottom: 16,
        },
        registerButtonContent: {
            paddingVertical: 8,
        },
        termsText: {
            textAlign: 'center',
            marginTop: 8,
        },
        termsLink: {
            fontWeight: '600',
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
