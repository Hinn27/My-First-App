// Screen: Register
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

export default function RegisterScreen() {
    const { theme } = useTheme();
    const router = useRouter();
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

            await AsyncStorage.setItem('user', JSON.stringify(userData));

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
                        <Text style={styles.title}>Đăng ký</Text>
                        <Text style={styles.subtitle}>
                            Tạo tài khoản mới để bắt đầu
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Họ và tên"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

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
                                name="call-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
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

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Xác nhận mật khẩu"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <Pressable
                                onPress={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={
                                        showConfirmPassword ? 'eye-off' : 'eye'
                                    }
                                    size={20}
                                    color={theme.onSurfaceVariant}
                                />
                            </Pressable>
                        </View>

                        <Pressable
                            style={[
                                styles.registerButton,
                                loading && styles.registerButtonDisabled,
                            ]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text style={styles.registerButtonText}>
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                            </Text>
                        </Pressable>

                        <Text style={styles.termsText}>
                            Bằng cách đăng ký, bạn đồng ý với{' '}
                            <Text style={styles.termsLink}>Điều khoản</Text> và{' '}
                            <Text style={styles.termsLink}>
                                Chính sách bảo mật
                            </Text>
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Đã có tài khoản? </Text>
                        <Pressable onPress={() => router.back()}>
                            <Text style={styles.footerLink}>
                                Đăng nhập ngay
                            </Text>
                        </Pressable>
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
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.onBackground,
            marginTop: 16,
        },
        subtitle: {
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginTop: 8,
            textAlign: 'center',
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
        registerButton: {
            backgroundColor: theme.primary,
            borderRadius: 12,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 16,
        },
        registerButtonDisabled: {
            opacity: 0.6,
        },
        registerButtonText: {
            color: theme.onPrimary,
            fontSize: 16,
            fontWeight: 'bold',
        },
        termsText: {
            color: theme.onSurfaceVariant,
            fontSize: 12,
            textAlign: 'center',
            lineHeight: 18,
        },
        termsLink: {
            color: theme.primary,
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
            fontSize: 14,
        },
        footerLink: {
            color: theme.primary,
            fontSize: 14,
            fontWeight: 'bold',
        },
    });
