// Component: Product Card cho Home screen
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function ProductCard({
    id,
    name,
    special_ingredient,
    imageIcon,
    imagelink_square,
    average_rating,
    prices,
    onPress,
    onAddToCart,
    onFavoritePress,
    favourite,
    theme,
}) {
    return (
        <Pressable onPress={onPress} style={styles.cardContainer}>
            <LinearGradient
                colors={
                    theme?.mode === 'dark'
                        ? ['#252A32', '#0C0F14']
                        : ['#FFFFFF', '#F7F8FB']
                }
                style={styles.card}
            >
                {/* Favorite Button */}
                <Pressable
                    style={styles.favoriteButton}
                    onPress={onFavoritePress}
                >
                    <Ionicons
                        name={favourite ? 'heart' : 'heart-outline'}
                        size={20}
                        color={favourite ? '#DC3535' : '#888'}
                    />
                </Pressable>

                {/* Image Icon */}
                <View style={styles.imageContainer}>
                    {imagelink_square ? (
                        <Image
                            source={{ uri: imagelink_square }}
                            style={styles.productImage}
                        />
                    ) : (
                        <Text style={styles.imageIcon}>
                            {imageIcon || '☕'}
                        </Text>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text
                        style={[
                            styles.name,
                            { color: theme?.onSurface || '#1c1c1e' },
                        ]}
                        numberOfLines={2}
                    >
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.ingredient,
                            { color: theme?.onSurfaceVariant || '#8e8e93' },
                        ]}
                        numberOfLines={1}
                    >
                        {special_ingredient}
                    </Text>

                    {/* Rating and Price */}
                    <View style={styles.footer}>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <Text
                                style={[
                                    styles.rating,
                                    { color: theme?.onSurface || '#1c1c1e' },
                                ]}
                            >
                                {average_rating}
                            </Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text
                                style={[
                                    styles.price,
                                    { color: theme?.primary || '#D17842' },
                                ]}
                            >
                                {parseInt(prices[0]?.price || 0).toLocaleString(
                                    'vi-VN',
                                )}
                                đ
                            </Text>
                            <Pressable
                                style={[
                                    styles.addButton,
                                    {
                                        backgroundColor:
                                            theme?.primary || '#D17842',
                                    },
                                ]}
                                onPress={onAddToCart}
                            >
                                <Ionicons name="add" size={16} color="#FFF" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH,
        marginBottom: 16,
    },
    card: {
        borderRadius: 16,
        padding: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 6,
    },
    imageContainer: {
        height: 120,
        borderRadius: 12,
        backgroundColor: 'rgba(209, 120, 66, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageIcon: {
        fontSize: 64,
    },
    infoContainer: {
        gap: 4,
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
    },
    ingredient: {
        fontSize: 11,
        marginBottom: 4,
    },
    footer: {
        marginTop: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    rating: {
        fontSize: 13,
        fontWeight: '600',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
