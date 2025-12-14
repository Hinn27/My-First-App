// Screen: Register
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useTheme } from "../../src/context/ThemeContext";
import { useUserStore } from "../../src/store/userStore";
import Logger from "../../src/utils/logger";

export default function RegisterScreen() {
    const { theme } = useTheme();
    // paperTheme not used
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const styles = createStyles(theme);

    const handleRegister = async () => {
        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }

        if (phone.length < 10) {
            Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
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
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            Alert.alert("Thành công", "Đăng ký thành công!", [
                {
                    text: "OK",
                    onPress: () => router.replace("/(tabs)/profile"),
                },
            ]);
        } catch (_error) {
            Logger.error("Error registering", _error);
            Alert.alert("Lỗi", "Không thể đăng ký. Vui lòng thử lại.");
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={[theme.primary, theme.primaryGradientEnd]}
            style={styles.gradientContainer}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Ionicons
                                    name="restaurant"
                                    size={80}
                                    color={theme.onPrimary}
                                />
                            </View>
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
                                    left={
                                        <TextInput.Icon icon="account-outline" />
                                    }
                                    style={styles.input}
                                    theme={{
                                        colors: { primary: theme.primary },
                                    }}
                                />

                                <TextInput
                                    label="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    mode="outlined"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    left={
                                        <TextInput.Icon icon="email-outline" />
                                    }
                                    style={styles.input}
                                    theme={{
                                        colors: { primary: theme.primary },
                                    }}
                                />

                                <TextInput
                                    label="Số điện thoại"
                                    value={phone}
                                    onChangeText={setPhone}
                                    mode="outlined"
                                    keyboardType="phone-pad"
                                    left={
                                        <TextInput.Icon icon="phone-outline" />
                                    }
                                    style={styles.input}
                                    theme={{
                                        colors: { primary: theme.primary },
                                    }}
                                />

                                <TextInput
                                    label="Mật khẩu"
                                    value={password}
                                    onChangeText={setPassword}
                                    mode="outlined"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    left={
                                        <TextInput.Icon icon="lock-outline" />
                                    }
                                    right={
                                        <TextInput.Icon
                                            icon={
                                                showPassword ? "eye-off" : "eye"
                                            }
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    }
                                    style={styles.input}
                                    theme={{
                                        colors: { primary: theme.primary },
                                    }}
                                />

                                <TextInput
                                    label="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    mode="outlined"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    left={
                                        <TextInput.Icon icon="lock-outline" />
                                    }
                                    right={
                                        <TextInput.Icon
                                            icon={
                                                showConfirmPassword
                                                    ? "eye-off"
                                                    : "eye"
                                            }
                                            onPress={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    }
                                    style={styles.input}
                                    theme={{
                                        colors: { primary: theme.primary },
                                    }}
                                />

                                <Button
                                    mode="contained"
                                    onPress={handleRegister}
                                    loading={loading}
                                    disabled={loading}
                                    style={styles.registerButton}
                                    contentStyle={styles.registerButtonContent}
                                    buttonColor={theme.primary}
                                >
                                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                                </Button>

                                <Text
                                    variant="bodySmall"
                                    style={styles.termsText}
                                >
                                    Bằng cách đăng ký, bạn đồng ý với{" "}
                                    <Text style={styles.termsLink}>
                                        Điều khoản
                                    </Text>{" "}
                                    và{" "}
                                    <Text style={styles.termsLink}>
                                        Chính sách bảo mật
                                    </Text>
                                </Text>
                            </Card.Content>
                        </Card>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text
                                variant="bodyMedium"
                                style={styles.footerText}
                            >
                                Đã có tài khoản?{" "}
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
        </LinearGradient>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        gradientContainer: {
            flex: 1,
        },
        container: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: "center",
        },
        content: {
            flex: 1,
            padding: 20,
            justifyContent: "center",
        },
        header: {
            alignItems: "center",
            marginBottom: 32,
        },
        logoContainer: {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 50,
            padding: 20,
            marginBottom: 16,
        },
        title: {
            marginTop: 16,
            textAlign: "center",
            color: theme.onPrimary,
            fontWeight: "bold",
        },
        subtitle: {
            marginTop: 8,
            textAlign: "center",
            color: theme.onPrimary,
            opacity: 0.9,
        },
        card: {
            marginBottom: 24,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.surface,
            elevation: 8,
        },
        cardContent: {
            paddingVertical: 24,
            paddingHorizontal: 20,
        },
        input: {
            marginBottom: 16,
            backgroundColor: theme.surface,
        },
        registerButton: {
            marginTop: 12,
            marginBottom: 20,
            borderRadius: theme.radius.lg,
            elevation: 4,
        },
        registerButtonContent: {
            paddingVertical: 8,
        },
        termsText: {
            textAlign: "center",
            marginTop: 8,
            color: theme.onSurfaceVariant,
        },
        termsLink: {
            fontWeight: "600",
            color: theme.primary,
        },
        footer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
        },
        footerText: {
            color: theme.onPrimary,
        },
        footerLink: {
            fontSize: 16,
            fontWeight: "bold",
            color: theme.onPrimary,
        },
    });
