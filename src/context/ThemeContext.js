// Theme Context - Material You Design với AMOLED Dark Mode
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

// Material You Color Palette
const lightTheme = {
    mode: 'light',

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

const darkTheme = {
    mode: 'dark',

    // Primary colors
    primary: '#A8C7FF',
    onPrimary: '#003062',
    primaryContainer: '#00468A',
    onPrimaryContainer: '#D6E7FF',

    // Secondary colors
    secondary: '#FFB84D',
    onSecondary: '#4A2800',
    secondaryContainer: '#6A3A00',
    onSecondaryContainer: '#FFE0B2',

    // Tertiary colors
    tertiary: '#6FDB8C',
    onTertiary: '#00390F',
    tertiaryContainer: '#005317',
    onTertiaryContainer: '#C8F7D3',

    // Error colors
    error: '#FF8A80',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFE5E5',

    // Surface colors (AMOLED - Pure Black)
    surface: '#000000',
    onSurface: '#E6E6E6',
    surfaceVariant: '#121212',
    onSurfaceVariant: '#C4C4C4',

    // Background colors (AMOLED - Pure Black)
    background: '#000000',
    onBackground: '#E6E6E6',

    // Outline colors
    outline: '#2C2C2E',
    outlineVariant: '#1C1C1E',

    // Other colors
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E6E6E6',
    inverseOnSurface: '#1C1C1E',
    inversePrimary: '#0A84FF',

    // Rating & special
    rating: '#FFD700',

    // Card backgrounds (darker versions)
    cardFood: '#0A1F3D',
    cardDrink: '#2D1F0A',
    cardPromo: '#2D0A0A',
    cardFavorite: '#0A2D12',
};

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

    const theme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
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
