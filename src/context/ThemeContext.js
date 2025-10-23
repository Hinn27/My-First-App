// Theme Context - Material You Design
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Material You Color Palette
const theme = {

    // Primary colors
    primary: '#0A84FF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D6E7FF',
    onPrimaryContainer: '#001C38',

    // Secondary colors
    secondary: '#FF9500',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFE0B2',
    onSecondaryContainer: '#2B1700',

    // Tertiary colors
    tertiary: '#34C759',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#C8F7D3',
    onTertiaryContainer: '#002106',

    // Error colors
    error: '#FF3B30',
    onError: '#FFFFFF',
    errorContainer: '#FFE5E5',
    onErrorContainer: '#410002',

    // Surface colors
    surface: '#FAFAFA',
    onSurface: '#1C1C1E',
    surfaceVariant: '#F2F2F7',
    onSurfaceVariant: '#48484A',

    // Background colors
    background: '#F7F8FB',
    onBackground: '#1C1C1E',

    // Outline colors
    outline: '#E5E5EA',
    outlineVariant: '#C7C7CC',

    // Other colors
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#1C1C1E',
    inverseOnSurface: '#F2F2F7',
    inversePrimary: '#A8C7FF',

    // Rating & special
    rating: '#FFD700',

    // Card backgrounds
    cardFood: '#E3F2FF',
    cardDrink: '#FFF3E0',
    cardPromo: '#FFE5E5',
    cardFavorite: '#E8F5E9',
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
