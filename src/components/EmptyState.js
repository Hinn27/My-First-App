// Empty State Component
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState({
    icon = 'file-tray-outline',
    title = 'Không có dữ liệu',
    message = 'Dữ liệu sẽ hiển thị ở đây',
    buttonText,
    onButtonPress,
    theme,
}) {
    return (
        <View style={styles.container}>
            <Ionicons
                name={icon}
                size={80}
                color={theme?.onSurfaceVariant || '#8e8e93'}
            />
            <Text
                style={[
                    styles.title,
                    { color: theme?.onBackground || '#1c1c1e' },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.message,
                    { color: theme?.onSurfaceVariant || '#8e8e93' },
                ]}
            >
                {message}
            </Text>
            {buttonText && onButtonPress && (
                <Pressable
                    style={[
                        styles.button,
                        { backgroundColor: theme?.primary || '#D17842' },
                    ]}
                    onPress={onButtonPress}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 32,
    },
    button: {
        marginTop: 24,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
