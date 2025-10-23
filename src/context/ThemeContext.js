// Theme Context - Material Design 3 (Material You)
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Material Design 3 Color Palette
const theme = {
    // Primary colors
    primary: '#6750A4', // Purple (Material You Primary)
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    // Secondary colors
    secondary: '#625B71', // Purple-gray
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    // Tertiary colors
    tertiary: '#7D5260', // Pink-brown
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',

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
    inversePrimary: '#D0BCFF',

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
