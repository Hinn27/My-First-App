// Component: Cart Item
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Text,
    Card,
    IconButton,
    Chip,
} from 'react-native-paper';

import PropTypes from 'prop-types';

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
}) {
    return (
        <Card style={styles.container} mode="elevated">
            <Card.Content style={styles.cardContent}>
                <View style={styles.row}>
                    {/* Product Image */}
                    <View style={styles.imageContainer}>
                        <Text style={styles.imageIcon}>{imageIcon || '☕'}</Text>
                    </View>

                    {/* Product Info */}
                    <View style={styles.infoSection}>
                        <View style={styles.header}>
                            <Text variant="titleMedium" style={styles.name}>
                                {name}
                            </Text>
                            <Text variant="bodySmall" style={styles.ingredient}>
                                {special_ingredient}
                            </Text>
                            {roasted && (
                                <Text variant="bodySmall" style={styles.roasted}>
                                    {roasted}
                                </Text>
                            )}
                        </View>

                        {/* Sizes and Quantities */}
                        {prices.map((item, index) => (
                            <View key={item.size || item.id || index} style={styles.priceRow}>
                                <View style={styles.sizeContainer}>
                                    <Chip
                                        style={styles.sizeChip}
                                        textStyle={styles.sizeText}
                                    >
                                        {item.size}
                                    </Chip>
                                    <Text variant="titleSmall" style={styles.priceText}>
                                        {Number.parseInt(item.price).toLocaleString('vi-VN')}{' '}
                                        đ
                                    </Text>
                                </View>

                                {/* Quantity Controls */}
                                <View style={styles.quantityContainer}>
                                    <IconButton
                                        icon="minus"
                                        size={20}
                                        iconColor="#FFF"
                                        style={[
                                            styles.quantityButton,
                                            { backgroundColor: '#D17842' },
                                        ]}
                                        onPress={() =>
                                            decrementHandler(id, item.size)
                                        }
                                    />

                                    <View
                                        style={[
                                            styles.quantityBox,
                                            { borderColor: '#D17842' },
                                        ]}
                                    >
                                        <Text variant="bodyMedium" style={styles.quantityText}>
                                            {item.quantity}
                                        </Text>
                                    </View>

                                    <IconButton
                                        icon="plus"
                                        size={20}
                                        iconColor="#FFF"
                                        style={[
                                            styles.quantityButton,
                                            { backgroundColor: '#D17842' },
                                        ]}
                                        onPress={() =>
                                            incrementHandler(id, item.size)
                                        }
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 16,
    },
    cardContent: {
        padding: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: 'rgba(135, 206, 235, 0.1)',
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
        fontWeight: '700',
        fontSize: 16,
    },
    ingredient: {
        opacity: 0.7,
        fontSize: 12,
    },
    roasted: {
        opacity: 0.6,
        fontSize: 11,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: StyleSheet.hairlineWidth, // Dùng nét mảnh nhất của màn hình
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    sizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sizeChip: {
        height: 28,
    },
    sizeText: {
        fontSize: 12,
        lineHeight: 16,
    },
    priceText: {
        fontWeight: '700',
        fontSize: 14,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        margin: 0,
    },
    quantityBox: {
        width: 36,
        height: 28,
        borderRadius: 8,
        borderWidth: 0.5, // Giảm tiếp xuống 0.5
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    quantityText: {
        fontWeight: '600',
        fontSize: 14,
    },
});

CartItemCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    special_ingredient: PropTypes.string,
    roasted: PropTypes.string,
    prices: PropTypes.array.isRequired,
    type: PropTypes.string,
    incrementHandler: PropTypes.func.isRequired,
    decrementHandler: PropTypes.func.isRequired,
};
