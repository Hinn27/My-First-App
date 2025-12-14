module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    collectCoverageFrom: [
        "app/**/*.{js,jsx,ts,tsx}",
        "src/**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
        "!**/__tests__/**",
    ],
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/src/components/$1",
        "^@/context/(.*)$": "<rootDir>/src/context/$1",
        "^@/store/(.*)$": "<rootDir>/src/store/$1",
        "^@/data/(.*)$": "<rootDir>/src/data/$1",
        "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    },
};
