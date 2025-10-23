// Component: Cart Item
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CartItemCard({
    id,
    name,
    imageIcon,
    special_ingredient,
    roasted,
    prices,
    type,
    incrementHandler,
    decrementHandler,
    theme,
}) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={
                    theme?.mode === 'dark'
                        ? ['#252A32', '#0C0F14']
                        : ['#FFFFFF', '#F7F8FB']
                }
                style={styles.card}
            >
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Text style={styles.imageIcon}>{imageIcon || '☕'}</Text>
                </View>

                {/* Product Info */}
                <View style={styles.infoSection}>
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.name,
                                { color: theme?.onSurface || '#1c1c1e' },
                            ]}
                        >
                            {name}
                        </Text>
                        <Text
                            style={[
                                styles.ingredient,
                                { color: theme?.onSurfaceVariant || '#8e8e93' },
                            ]}
                        >
                            {special_ingredient}
                        </Text>
                        {roasted && (
                            <Text
                                style={[
                                    styles.roasted,
                                    {
                                        color:
                                            theme?.onSurfaceVariant ||
                                            '#8e8e93',
                                    },
                                ]}
                            >
                                {roasted}
                            </Text>
                        )}
                    </View>

                    {/* Sizes and Quantities */}
                    {prices.map((item, index) => (
                        <View key={index} style={styles.priceRow}>
                            <View style={styles.sizeContainer}>
                                <View
                                    style={[
                                        styles.sizeBox,
                                        {
                                            backgroundColor:
                                                theme?.mode === 'dark'
                                                    ? '#0C0F14'
                                                    : '#F0F0F0',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            {
                                                color:
                                                    theme?.onSurface ||
                                                    '#1c1c1e',
                                            },
                                        ]}
                                    >
                                        {item.size}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.priceText,
                                        {
                                            color: theme?.primary || '#D17842',
                                        },
                                    ]}
                                >
                                    {parseInt(item.price).toLocaleString(
                                        'vi-VN',
                                    )}{' '}
                                    đ
                                </Text>
                            </View>

                            {/* Quantity Controls */}
                            <View style={styles.quantityContainer}>
                                <Pressable
                                    style={[
                                        styles.quantityButton,
                                        {
                                            backgroundColor:
                                                theme?.primary || '#D17842',
                                        },
                                    ]}
                                    onPress={() =>
                                        decrementHandler(id, item.size)
                                    }
                                >
                                    <Ionicons
                                        name="remove"
                                        size={16}
                                        color="#FFF"
                                    />
                                </Pressable>

                                <View
                                    style={[
                                        styles.quantityBox,
                                        {
                                            borderColor:
                                                theme?.primary || '#D17842',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.quantityText,
                                            {
                                                color:
                                                    theme?.onSurface ||
                                                    '#1c1c1e',
                                            },
                                        ]}
                                    >
                                        {item.quantity}
                                    </Text>
                                </View>

                                <Pressable
                                    style={[
                                        styles.quantityButton,
                                        {
                                            backgroundColor:
                                                theme?.primary || '#D17842',
                                        },
                                    ]}
                                    onPress={() =>
                                        incrementHandler(id, item.size)
                                    }
                                >
                                    <Ionicons
                                        name="add"
                                        size={16}
                                        color="#FFF"
                                    />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    card: {
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        gap: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: 'rgba(209, 120, 66, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        fontSize: 48,
    },
    infoSection: {
        flex: 1,
        gap: 8,
    },
    header: {
        gap: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
    },
    ingredient: {
        fontSize: 12,
    },
    roasted: {
        fontSize: 11,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    sizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sizeBox: {
        width: 50,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizeText: {
        fontSize: 14,
        fontWeight: '600',
    },
    priceText: {
        fontSize: 15,
        fontWeight: '700',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityBox: {
        width: 40,
        height: 28,
        borderRadius: 8,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
