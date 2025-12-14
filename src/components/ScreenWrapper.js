// Screen Wrapper với fade-in animation
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export default function ScreenWrapper({ children, style }) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withTiming(1, {
            duration: 300,
            easing: Easing.out(Easing.ease),
        });
        translateY.value = withTiming(0, {
            duration: 300,
            easing: Easing.out(Easing.ease),
        });
    }, [opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle, style]}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

ScreenWrapper.propTypes = {
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
