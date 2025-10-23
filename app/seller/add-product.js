// Screen: Add Product (Seller only)
/* Vai trò:
 * Màn hình đăng sản phẩm cho seller đã được duyệt
 * Route: /seller/add-product
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';

export default function AddProductScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Form state
    const [productData, setProductData] = useState({
        name: '',
        type: 'Food', // Food or Drink
        category: '',
        imageIcon: '🍜', // Default emoji
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

    // Categories based on type
    const foodCategories = ['Món khô', 'Món ướt', 'Ăn vặt'];
    const drinkCategories = [
        'Cà phê',
        'Trà',
        'Trà sữa',
        'Sinh tố',
        'Nước ép',
        'Soda',
    ];

    const currentCategories =
        productData.type === 'Food' ? foodCategories : drinkCategories;

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
    const handlePickEmoji = () => {
        const emojis = [
            '🍜',
            '🥢',
            '🍖',
            '🥖',
            '🍲',
            '🥗',
            '🥞',
            '🌶️',
            '☕',
            '🧋',
            '🍵',
            '🍑',
            '🥑',
            '🍊',
            '🥤',
            '🍰',
            '🍕',
            '🍔',
            '🍱',
            '🍛',
        ];
        Alert.alert(
            'Chọn icon',
            'Chọn emoji cho sản phẩm',
            emojis
                .map((emoji) => ({
                    text: emoji,
                    onPress: () => handleChange('imageIcon', emoji),
                }))
                .concat([{ text: 'Hủy', style: 'cancel' }]),
        );
    };

    // Validate form
    const validateForm = () => {
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
            imageIcon: productData.imageIcon,
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

        // TODO: Save to store or API
        console.log('New Product:', newProduct);

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

                {/* Icon Picker */}
                <View style={styles.section}>
                    <Text style={styles.label}>Icon sản phẩm *</Text>
                    <Pressable
                        style={styles.iconPicker}
                        onPress={handlePickEmoji}
                    >
                        <Text style={styles.iconEmoji}>
                            {productData.imageIcon}
                        </Text>
                        <Text style={styles.iconText}>Nhấn để chọn icon</Text>
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
                            style={[
                                styles.typeButton,
                                productData.type === 'Food' &&
                                    styles.typeButtonActive,
                            ]}
                            onPress={() => {
                                handleChange('type', 'Food');
                                handleChange('category', '');
                            }}
                        >
                            <Ionicons
                                name="restaurant"
                                size={20}
                                color={
                                    productData.type === 'Food'
                                        ? '#FFFFFF'
                                        : theme.onSurface
                                }
                            />
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    productData.type === 'Food' &&
                                        styles.typeButtonTextActive,
                                ]}
                            >
                                Đồ ăn
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.typeButton,
                                productData.type === 'Drink' &&
                                    styles.typeButtonActive,
                            ]}
                            onPress={() => {
                                handleChange('type', 'Drink');
                                handleChange('category', '');
                            }}
                        >
                            <Ionicons
                                name="cafe"
                                size={20}
                                color={
                                    productData.type === 'Drink'
                                        ? '#FFFFFF'
                                        : theme.onSurface
                                }
                            />
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    productData.type === 'Drink' &&
                                        styles.typeButtonTextActive,
                                ]}
                            >
                                Đồ uống
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
        iconPicker: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.outline,
        },
        iconEmoji: {
            fontSize: 64,
            marginBottom: 8,
        },
        iconText: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
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
