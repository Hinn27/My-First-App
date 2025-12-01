// Screen: Add Product - Đăng sản phẩm (Seller)
/* Chức năng:
 * - Form đăng sản phẩm mới cho seller
 * - Upload ảnh sản phẩm (expo-image-picker)
 * - Nhập tên, mô tả, category, giá theo size
 * - Validation form
 * - Lưu vào Zustand store
 * - Chỉ seller đã được approve mới truy cập được
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Pressable,
    Alert,
    Switch,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../src/context/ThemeContext';
import { useProductStore } from '../../src/store/productStore';

export default function AddProductScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const addProduct = useProductStore((state) => state.addProduct);

    // Form state
    const [productData, setProductData] = useState({
        name: '',
        type: 'Food', // Chỉ còn Food
        category: '',
        productImage: null, // Product image
        special_ingredient: '',
        description: '',
        roasted: '',
        ingredients: '',
        prices: {
            S: { enabled: false, price: '' },
            M: { enabled: true, price: '' },
            L: { enabled: false, price: '' },
        },
    });

    // Categories (chỉ còn món ăn)
    const foodCategories = ['Cơm', 'Bún, mì, phở', 'Bánh mì'];
    const currentCategories = foodCategories;

    // Handle form change
    const handleChange = (field, value) => {
        setProductData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle price change
    const handlePriceChange = (size, field, value) => {
        setProductData((prev) => ({
            ...prev,
            prices: {
                ...prev.prices,
                [size]: {
                    ...prev.prices[size],
                    [field]: value,
                },
            },
        }));
    };

    // Pick emoji as icon
    const handlePickImage = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert(
                    'Thông báo',
                    'Bạn cần cấp quyền truy cập thư viện ảnh!',
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                handleChange('productImage', result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
        }
    };

    // Validate form
    const validateForm = () => {
        if (!productData.productImage) {
            Alert.alert('Lỗi', 'Vui lòng chọn ảnh sản phẩm');
            return false;
        }
        if (!productData.name.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm');
            return false;
        }
        if (!productData.category) {
            Alert.alert('Lỗi', 'Vui lòng chọn danh mục');
            return false;
        }
        if (!productData.special_ingredient.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập mô tả ngắn');
            return false;
        }
        if (!productData.description.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập mô tả chi tiết');
            return false;
        }

        // Check at least one price
        const hasPrice = Object.values(productData.prices).some(
            (p) => p.enabled && p.price && parseFloat(p.price) > 0,
        );
        if (!hasPrice) {
            Alert.alert('Lỗi', 'Vui lòng nhập ít nhất 1 giá cho sản phẩm');
            return false;
        }

        return true;
    };

    // Submit product
    const handleSubmit = () => {
        if (!validateForm()) return;

        // Build prices array
        const prices = [];
        Object.entries(productData.prices).forEach(([size, data]) => {
            if (data.enabled && data.price && parseFloat(data.price) > 0) {
                prices.push({
                    size,
                    price: data.price,
                    currency: 'đ',
                    quantity: 1,
                });
            }
        });

        const newProduct = {
            id: `${productData.type[0]}${Date.now()}`,
            name: productData.name,
            description: productData.description,
            roasted: productData.roasted || 'Đặc biệt',
            imagelink_square: productData.productImage,
            imagelink_portrait: productData.productImage,
            special_ingredient: productData.special_ingredient,
            ingredients: productData.ingredients,
            prices,
            average_rating: 0,
            ratings_count: '0',
            favourite: false,
            type: productData.type,
            category: productData.category,
            index: Date.now(),
        };

        // Save to store
        addProduct(newProduct);

        Alert.alert('Thành công', 'Sản phẩm đã được đăng thành công!', [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={theme.onBackground}
                        />
                    </Pressable>
                    <Text style={styles.title}>Đăng sản phẩm mới</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Product Image */}
                <View style={styles.section}>
                    <Text style={styles.label}>Ảnh sản phẩm *</Text>
                    <Pressable
                        style={styles.imagePicker}
                        onPress={handlePickImage}
                    >
                        {productData.productImage ? (
                            <Image
                                source={{ uri: productData.productImage }}
                                style={styles.productImagePreview}
                            />
                        ) : (
                            <View style={styles.imagePickerPlaceholder}>
                                <Ionicons
                                    name="camera-outline"
                                    size={48}
                                    color={theme.onSurfaceVariant}
                                />
                                <Text style={styles.imagePickerText}>
                                    Nhấn để chọn ảnh
                                </Text>
                            </View>
                        )}
                    </Pressable>
                </View>

                {/* Product Name */}
                <View style={styles.section}>
                    <Text style={styles.label}>Tên sản phẩm *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD: Phở Bò, Cà Phê Sữa Đá..."
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={productData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                </View>

                {/* Product Type */}
                <View style={styles.section}>
                    <Text style={styles.label}>Loại sản phẩm *</Text>
                    <View style={styles.typeSelector}>
                        <Pressable
                            style={[styles.typeButton, styles.typeButtonActive]}
                        >
                            <Ionicons
                                name="restaurant"
                                size={20}
                                color={'#FFFFFF'}
                            />
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    styles.typeButtonTextActive,
                                ]}
                            >
                                Đồ ăn
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Category */}
                <View style={styles.section}>
                    <Text style={styles.label}>Danh mục *</Text>
                    <View style={styles.categoryGrid}>
                        {currentCategories.map((cat) => (
                            <Pressable
                                key={cat}
                                style={[
                                    styles.categoryChip,
                                    productData.category === cat &&
                                        styles.categoryChipActive,
                                ]}
                                onPress={() => handleChange('category', cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryChipText,
                                        productData.category === cat &&
                                            styles.categoryChipTextActive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Special Ingredient (Mô tả ngắn) */}
                <View style={styles.section}>
                    <Text style={styles.label}>Mô tả ngắn *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD: Với sữa đặc, Nước dùng xương hầm..."
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={productData.special_ingredient}
                        onChangeText={(text) =>
                            handleChange('special_ingredient', text)
                        }
                    />
                </View>

                {/* Description (Mô tả chi tiết) */}
                <View style={styles.section}>
                    <Text style={styles.label}>Mô tả chi tiết *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Mô tả đầy đủ về món ăn, nguyên liệu, hương vị..."
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={productData.description}
                        onChangeText={(text) =>
                            handleChange('description', text)
                        }
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Roasted/Đặc điểm */}
                <View style={styles.section}>
                    <Text style={styles.label}>Đặc điểm (tùy chọn)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD: Món nóng, Medium roasted, Món cay..."
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={productData.roasted}
                        onChangeText={(text) => handleChange('roasted', text)}
                    />
                </View>

                {/* Ingredients */}
                <View style={styles.section}>
                    <Text style={styles.label}>Nguyên liệu (tùy chọn)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD: Bánh phở, Thịt bò, Hành lá, Ngò"
                        placeholderTextColor={theme.onSurfaceVariant}
                        value={productData.ingredients}
                        onChangeText={(text) =>
                            handleChange('ingredients', text)
                        }
                    />
                </View>

                {/* Prices */}
                <View style={styles.section}>
                    <Text style={styles.label}>Giá sản phẩm *</Text>
                    {['S', 'M', 'L'].map((size) => (
                        <View key={size} style={styles.priceRow}>
                            <Switch
                                value={productData.prices[size].enabled}
                                onValueChange={(val) =>
                                    handlePriceChange(size, 'enabled', val)
                                }
                                trackColor={{
                                    false: theme.outline,
                                    true: theme.primary,
                                }}
                                thumbColor="#FFFFFF"
                            />
                            <Text style={styles.sizeLabel}>Size {size}</Text>
                            <TextInput
                                style={[
                                    styles.priceInput,
                                    !productData.prices[size].enabled &&
                                        styles.priceInputDisabled,
                                ]}
                                placeholder="0"
                                placeholderTextColor={theme.onSurfaceVariant}
                                keyboardType="numeric"
                                value={productData.prices[size].price}
                                onChangeText={(text) =>
                                    handlePriceChange(size, 'price', text)
                                }
                                editable={productData.prices[size].enabled}
                            />
                            <Text style={styles.currency}>đ</Text>
                        </View>
                    ))}
                </View>

                {/* Submit Button */}
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <Ionicons name="add-circle" size={24} color="#FFFFFF" />
                    <Text style={styles.submitButtonText}>Đăng sản phẩm</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

// Dynamic styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContent: {
            padding: 20,
            paddingBottom: 40,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.surface,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: '700',
            color: theme.onBackground,
        },
        section: {
            marginBottom: 20,
        },
        label: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onBackground,
            marginBottom: 8,
        },
        input: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 15,
            color: theme.onSurface,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        textArea: {
            minHeight: 100,
            paddingTop: 14,
        },
        imagePicker: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.outline,
            overflow: 'hidden',
        },
        imagePickerPlaceholder: {
            alignItems: 'center',
            gap: 8,
        },
        imagePickerText: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
        },
        productImagePreview: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        typeSelector: {
            flexDirection: 'row',
            gap: 12,
        },
        typeButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        typeButtonActive: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        typeButtonText: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurface,
        },
        typeButtonTextActive: {
            color: '#FFFFFF',
        },
        categoryGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        categoryChip: {
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.outline,
        },
        categoryChipActive: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        categoryChipText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.onSurface,
        },
        categoryChipTextActive: {
            color: '#FFFFFF',
        },
        priceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 12,
        },
        sizeLabel: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onBackground,
            width: 60,
        },
        priceInput: {
            flex: 1,
            backgroundColor: theme.surface,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 15,
            color: theme.onSurface,
            borderWidth: 1,
            borderColor: theme.outline,
            textAlign: 'right',
        },
        priceInputDisabled: {
            backgroundColor: theme.surfaceVariant,
            opacity: 0.5,
        },
        currency: {
            fontSize: 15,
            fontWeight: '600',
            color: theme.onSurfaceVariant,
            width: 20,
        },
        submitButton: {
            flexDirection: 'row',
            backgroundColor: theme.primary,
            paddingVertical: 16,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
        },
        submitButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
        },
    });
