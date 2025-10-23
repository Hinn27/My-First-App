// Material Design 3 - Elevation & Shadow Helper
import { Platform } from 'react-native';

/**
 * Get elevation style for Material Design 3
 * @param {number} level - Elevation level (0-5)
 * @param {string} shadowColor - Shadow color (default: #000000)
 * @returns {Object} Style object with elevation/shadow
 */
export const getElevation = (level = 1, shadowColor = '#000000') => {
    if (Platform.OS === 'android') {
        return {
            elevation: level * 2,
        };
    }

    // iOS shadow based on elevation level
    const elevationStyles = {
        0: {
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        1: {
            shadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
        },
        2: {
            shadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
        },
        3: {
            shadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
        },
        4: {
            shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
        },
        5: {
            shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
    };

    return elevationStyles[level] || elevationStyles[1];
};

/**
 * Material Design 3 - Filled Button Style
 */
export const getFilledButtonStyle = (theme) => ({
    backgroundColor: theme.primary,
    borderRadius: theme.radius.full,
    paddingVertical: 10,
    paddingHorizontal: 24,
    ...getElevation(0),
});

/**
 * Material Design 3 - Outlined Button Style
 */
export const getOutlinedButtonStyle = (theme) => ({
    backgroundColor: 'transparent',
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.outline,
    paddingVertical: 10,
    paddingHorizontal: 24,
});

/**
 * Material Design 3 - Text Button Style
 */
export const getTextButtonStyle = (theme) => ({
    backgroundColor: 'transparent',
    borderRadius: theme.radius.full,
    paddingVertical: 10,
    paddingHorizontal: 12,
});

/**
 * Material Design 3 - FAB (Floating Action Button) Style
 */
export const getFABStyle = (theme, size = 'medium') => {
    const sizes = {
        small: 40,
        medium: 56,
        large: 96,
    };

    return {
        width: sizes[size],
        height: sizes[size],
        borderRadius: theme.radius.lg,
        backgroundColor: theme.primaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        ...getElevation(3, theme.shadow),
    };
};

/**
 * Material Design 3 - Card Style
 */
export const getCardStyle = (theme, variant = 'elevated') => {
    const baseStyle = {
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        backgroundColor: theme.surface,
    };

    if (variant === 'elevated') {
        return {
            ...baseStyle,
            ...getElevation(1, theme.shadow),
        };
    }

    if (variant === 'filled') {
        return {
            ...baseStyle,
            backgroundColor: theme.surfaceVariant,
        };
    }

    if (variant === 'outlined') {
        return {
            ...baseStyle,
            borderWidth: 1,
            borderColor: theme.outlineVariant,
        };
    }

    return baseStyle;
};
