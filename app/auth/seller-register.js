// Screen: Seller Registration
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
    Image,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { useUserStore } from '../../src/store/userStore';

export default function SellerRegisterScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const [sellerName, setSellerName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [storeImages, setStoreImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const styles = createStyles(theme);

    const pickImage = async () => {
        // Request permission
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Lỗi',
                'Cần quyền truy cập thư viện ảnh để chọn hình ảnh',
            );
            return;
        }

        // Pick image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 0.8,
            maxHeight: 1024,
            maxWidth: 1024,
        });

        if (!result.canceled) {
            setStoreImages([...storeImages, ...result.assets]);
        }
    };

    const removeImage = (index) => {
        setStoreImages(storeImages.filter((_, i) => i !== index));
    };

    const handleRegister = async () => {
        // Validation
        if (!sellerName || !storeName || !address || !phone) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (phone.length < 10) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }

        if (storeImages.length === 0) {
            Alert.alert('Lỗi', 'Vui lòng thêm ít nhất 1 hình ảnh cửa hàng');
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Get current user data
            const userDataStr = await AsyncStorage.getItem('user');
            const userData = userDataStr ? JSON.parse(userDataStr) : {};

            // Update with seller info
            const updatedUser = {
                ...userData,
                isSeller: true,
                sellerStatus: 'pending', // Change to pending to show "Chờ duyệt 24h" message
                sellerInfo: {
                    sellerName,
                    storeName,
                    address,
                    phone,
                    storeImages: storeImages.map((img) => img.uri),
                    registrationDate: new Date().toISOString(),
                },
            };

            // Save to both AsyncStorage and Zustand store
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            Alert.alert(
                'Thành công',
                'Đăng ký bán hàng thành công! Vui lòng chờ duyệt trong 24h.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back(),
                    },
                ],
            );
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
                        <Ionicons
                            name="storefront"
                            size={80}
                            color={theme.secondary}
                        />
                        <Text style={styles.title}>Đăng ký bán hàng</Text>
                        <Text style={styles.subtitle}>
                            Trở thành người bán và phát triển kinh doanh cùng
                            chúng tôi
                        </Text>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Ionicons
                            name="information-circle"
                            size={24}
                            color={theme.primary}
                        />
                        <Text style={styles.infoText}>
                            Đăng ký ngay để bán sản phẩm của bạn. Chúng tôi sẽ
                            xem xét trong 24h.
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Text style={styles.sectionTitle}>
                            Thông tin người bán
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên người bán"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={sellerName}
                                onChangeText={setSellerName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="storefront-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên cửa hàng"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={storeName}
                                onChangeText={setStoreName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color={theme.onSurfaceVariant}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Địa chỉ cửa hàng"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={address}
                                onChangeText={setAddress}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
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
                                placeholder="Số điện thoại liên hệ"
                                placeholderTextColor={theme.onSurfaceVariant}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <Text style={styles.sectionTitle}>
                            Hình ảnh cửa hàng
                        </Text>

                        <View style={styles.imagesContainer}>
                            {storeImages.map((image, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={styles.image}
                                    />
                                    <Pressable
                                        style={styles.removeButton}
                                        onPress={() => removeImage(index)}
                                    >
                                        <Ionicons
                                            name="close-circle"
                                            size={24}
                                            color={theme.error}
                                        />
                                    </Pressable>
                                </View>
                            ))}

                            {storeImages.length < 5 && (
                                <Pressable
                                    style={styles.addImageButton}
                                    onPress={pickImage}
                                >
                                    <Ionicons
                                        name="camera"
                                        size={32}
                                        color={theme.primary}
                                    />
                                    <Text style={styles.addImageText}>
                                        Thêm ảnh
                                    </Text>
                                </Pressable>
                            )}
                        </View>

                        <Text style={styles.imageHint}>
                            Thêm 1-5 hình ảnh cửa hàng của bạn
                        </Text>

                        <Pressable
                            style={[
                                styles.registerButton,
                                loading && styles.registerButtonDisabled,
                            ]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text style={styles.registerButtonText}>
                                {loading
                                    ? 'Đang đăng ký...'
                                    : 'Gửi đăng ký bán hàng'}
                            </Text>
                        </Pressable>

                        <Text style={styles.termsText}>
                            Bằng cách đăng ký, bạn đồng ý với{' '}
                            <Text style={styles.termsLink}>
                                Điều khoản bán hàng
                            </Text>{' '}
                            và{' '}
                            <Text style={styles.termsLink}>
                                Chính sách hoa hồng
                            </Text>
                        </Text>
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
        },
        header: {
            alignItems: 'center',
            marginBottom: 24,
            marginTop: 20,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.onBackground,
            marginTop: 16,
        },
        subtitle: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
            marginTop: 8,
            textAlign: 'center',
            paddingHorizontal: 20,
        },
        infoBox: {
            flexDirection: 'row',
            backgroundColor: theme.primaryContainer,
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
            alignItems: 'center',
        },
        infoText: {
            flex: 1,
            marginLeft: 12,
            color: theme.onPrimaryContainer,
            fontSize: 14,
            lineHeight: 20,
        },
        form: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.onBackground,
            marginBottom: 16,
            marginTop: 8,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: theme.surfaceVariant,
            borderRadius: 12,
            marginBottom: 16,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        inputIcon: {
            marginRight: 12,
            marginTop: 18,
        },
        input: {
            flex: 1,
            height: 56,
            color: theme.onSurface,
            fontSize: 16,
        },
        textArea: {
            height: 100,
            paddingTop: 16,
            paddingBottom: 16,
        },
        imagesContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 8,
        },
        imageWrapper: {
            width: 100,
            height: 100,
            marginRight: 12,
            marginBottom: 12,
            borderRadius: 12,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        removeButton: {
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: theme.surface,
            borderRadius: 12,
        },
        addImageButton: {
            width: 100,
            height: 100,
            backgroundColor: theme.surfaceVariant,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme.outline,
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
        },
        addImageText: {
            color: theme.primary,
            fontSize: 12,
            marginTop: 4,
            fontWeight: '600',
        },
        imageHint: {
            color: theme.onSurfaceVariant,
            fontSize: 12,
            marginBottom: 24,
        },
        registerButton: {
            backgroundColor: theme.secondary,
            borderRadius: 12,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        registerButtonDisabled: {
            opacity: 0.6,
        },
        registerButtonText: {
            color: theme.onSecondary,
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
    });
