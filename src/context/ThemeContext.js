// Theme Context - Material Design 3 (Material You)
import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

// Material Design 3 Color Palette - Cyan Theme
const theme = {
    // Primary colors - Cyan Gradient Base
    primary: "#00BCD4", // Cyan
    primaryGradientEnd: "#26C6DA", // Light Cyan
    onPrimary: "#FFFFFF",
    primaryContainer: "#B2EBF2",
    onPrimaryContainer: "#001F24",

    // Secondary colors - Teal variants
    secondary: "#4DD0E1",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#B2EBF2",
    onSecondaryContainer: "#001F24",

    // Tertiary colors - Blue accent
    tertiary: "#4FC3F7",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#BBDEFB",
    onTertiaryContainer: "#001B3A",

    // Error colors
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    // Surface colors - Clean whites
    surface: "#FFFBFF",
    onSurface: "#1A1C1E",
    surfaceVariant: "#DBE4E6",
    onSurfaceVariant: "#3E494A",

    // Background colors
    background: "#FAFDFC",
    onBackground: "#1A1C1E",

    // Outline colors
    outline: "#6F797A",
    outlineVariant: "#BEC8CA",

    // Other colors
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2E3132",
    inverseOnSurface: "#F0F1F1",
    inversePrimary: "#00BCD4",

    // Elevation levels (for shadows)
    elevation: {
        level0: 0, // No shadow
        level1: 1, // Low
        level2: 3, // Medium
        level3: 6, // High
        level4: 8, // Very high
        level5: 12, // Highest
    },

    // Border radius - Modern rounded corners
    radius: {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 32,
        xl: 40,
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
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};
