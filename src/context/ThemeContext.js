// Theme Context - Material Design 3 (Material You)
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Material Design 3 Color Palette
const theme = {
    // Primary colors - Light Blue
    primary: '#87CEEB', // Sky Blue (Light Blue)
    onPrimary: '#FFFFFF',
    primaryContainer: '#E0F6FF',
    onPrimaryContainer: '#003D5C',

    // Secondary colors - Light Blue variants
    secondary: '#B0E0E6', // Powder Blue
    onSecondary: '#003D5C',
    secondaryContainer: '#D4F0F5',
    onSecondaryContainer: '#003D5C',

    // Tertiary colors - Light Blue variants
    tertiary: '#ADD8E6', // Light Blue
    onTertiary: '#003D5C',
    tertiaryContainer: '#E6F4FE',
    onTertiaryContainer: '#003D5C',

    // Error colors
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',

    // Surface colors
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',

    // Background colors
    background: '#FFFBFE',
    onBackground: '#1C1B1F',

    // Outline colors
    outline: '#79747E',
    outlineVariant: '#CAC4D0',

    // Other colors
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: '#B0E0E6', // Light Blue inverse

    // Elevation levels (for shadows)
    elevation: {
        level0: 0, // No shadow
        level1: 1, // Low
        level2: 3, // Medium
        level3: 6, // High
        level4: 8, // Very high
        level5: 12, // Highest
    },

    // Border radius - Bo cong mềm mại hơn
    radius: {
        xs: 10,
        sm: 14,
        md: 18,
        lg: 28,
        xl: 36,
        full: 9999,
    },

    // Spacing scale
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
    },
};

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
