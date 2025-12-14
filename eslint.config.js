// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ["dist/*", "node_modules/*", "coverage/*"],
    },
    {
        rules: {
            // Enforce best practices
            "no-console": [
                "warn",
                { allow: ["warn", "error", "log", "debug"] },
            ],
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "prefer-const": "warn",
            "no-var": "error",

            // React specific
            "react/prop-types": "off", // We're using TypeScript
            "react/react-in-jsx-scope": "off", // Not needed in React Native

            // Code style
            semi: ["error", "always"],
            quotes: ["warn", "double", { avoidEscape: true }],
        },
    },
]);
