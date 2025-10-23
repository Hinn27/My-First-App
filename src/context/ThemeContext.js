// Theme Context - Material Design 3 (Material You)
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Material Design 3 Color Palette
const theme = {
    // Primary colors
    primary: '#006A6A', // Cyan (Material You Primary)
    onPrimary: '#FFFFFF',
    primaryContainer: '#6FF7F7',
    onPrimaryContainer: '#002020',

    // Secondary colors
    secondary: '#4A6363', // Teal-gray
    onSecondary: '#FFFFFF',
    secondaryContainer: '#CCE8E7',
    onSecondaryContainer: '#051F1F',

    // Tertiary colors
    tertiary: '#4B607C', // Blue-gray
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#D3E4FF',
    onTertiaryContainer: '#041C35',

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
    inversePrimary: '#4FD8D8', // Cyan inverse

    // Elevation levels (for shadows)
    elevation: {
        level0: 0, // No shadow
        level1: 1, // Low
        level2: 3, // Medium
        level3: 6, // High
        level4: 8, // Very high
        level5: 12, // Highest
    },

    // Border radius (Material Design 3)
    radius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
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
