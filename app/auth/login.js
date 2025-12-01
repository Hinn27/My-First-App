// Screen: Login
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Button, Card, TextInput, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import { useUserStore } from "../../src/store/userStore";

export default function LoginScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const styles = createStyles(theme);

    const handleLogin = async () => {
        // Validation
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Save user data (Fake data for testing)
            const userData = {
                email,
                name: email.split("@")[0], // Use part before @ as name
                isLoggedIn: true,
                loginTime: new Date().toISOString(),
            };

            // Save to both AsyncStorage and Zustand store
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            Alert.alert("Thành công", "Đăng nhập thành công!", [
                {
                    text: "OK",
                    onPress: () => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace("/(tabs)");
                        }
                    },
                },
            ]);
        } catch (_error) {
            console.error("Error logging in:", _error);
            setLoading(false);
            setAuthError("Không thể đăng nhập");
        } finally {
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
                                    left={
                                        <TextInput.Icon icon="email-outline" />
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

                                <Button
                                    mode="text"
                                    onPress={() =>
                                        Alert.alert(
                                            "Thông báo",
                                            "Tính năng đang phát triển"
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
                                    buttonColor={theme.primary}
                                >
                                    {loading
                                        ? "Đang đăng nhập..."
                                        : "Đăng nhập"}
                                </Button>

                                {authError ? (
                                    <Text
                                        variant="bodySmall"
                                        style={{
                                            color: theme.error,
                                            marginTop: 8,
                                            textAlign: "center",
                                        }}
                                    >
                                        {authError}
                                    </Text>
                                ) : null}

                                <Divider style={styles.divider} />

                                <Button
                                    mode="outlined"
                                    onPress={() =>
                                        Alert.alert(
                                            "Thông báo",
                                            "Tính năng đang phát triển"
                                        )
                                    }
                                    icon="google"
                                    style={styles.socialButton}
                                    contentStyle={styles.socialButtonContent}
                                    textColor={theme.primary}
                                >
                                    Đăng nhập với Google
                                </Button>

                                <Button
                                    mode="outlined"
                                    onPress={() =>
                                        Alert.alert(
                                            "Thông báo",
                                            "Tính năng đang phát triển"
                                        )
                                    }
                                    icon="facebook"
                                    style={styles.socialButton}
                                    contentStyle={styles.socialButtonContent}
                                    textColor={theme.primary}
                                >
                                    Đăng nhập với Facebook
                                </Button>
                            </Card.Content>
                        </Card>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text
                                variant="bodyMedium"
                                style={styles.footerText}
                            >
                                Chưa có tài khoản?{" "}
                            </Text>
                            <Button
                                mode="text"
                                onPress={() => router.push("/auth/register")}
                                labelStyle={styles.footerLink}
                            >
                                Đăng ký ngay
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
        forgotPassword: {
            alignSelf: "flex-end",
            marginTop: -8,
            marginBottom: 20,
        },
        forgotPasswordText: {
            fontSize: 14,
            color: theme.primary,
        },
        loginButton: {
            marginTop: 12,
            marginBottom: 20,
            borderRadius: theme.radius.lg,
            elevation: 4,
        },
        loginButtonContent: {
            paddingVertical: 8,
        },
        divider: {
            marginVertical: 20,
        },
        socialButton: {
            marginBottom: 12,
            borderRadius: theme.radius.lg,
            borderColor: theme.primary,
        },
        socialButtonContent: {
            paddingVertical: 8,
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
