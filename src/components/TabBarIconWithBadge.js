import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import AnimatedTabIcon from "./AnimatedTabIcon";

function formatBadge(n) {
    if (!n) return "";
    if (n > 99) return "99+";
    return String(n);
}

export default function TabBarIconWithBadge({
    iconName,
    color,
    size,
    focused,
    badge,
}) {
    const scale = useSharedValue(0.8);

    // pop when badge changes from/to >0
    useEffect(() => {
        if (badge && badge > 0) {
            scale.value = withSpring(1.05, { damping: 12, stiffness: 200 });
            const t = setTimeout(() => {
                scale.value = withTiming(1, { duration: 180 });
            }, 180);
            return () => clearTimeout(t);
        } else {
            scale.value = withTiming(0.8, { duration: 120 });
        }
    }, [badge, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View
            style={{
                width: size + 8,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <AnimatedTabIcon
                focused={focused}
                iconName={iconName}
                color={color}
                size={size}
            />
            {badge > 0 && (
                <Animated.View
                    style={[
                        { position: "absolute", top: -6, right: -8 },
                        animatedStyle,
                    ]}
                >
                    <Badge
                        style={{
                            minWidth: 16,
                            height: 18,
                            paddingHorizontal: 4,
                            justifyContent: "center",
                        }}
                        size={18}
                    >
                        {formatBadge(badge)}
                    </Badge>
                </Animated.View>
            )}
        </View>
    );
}

TabBarIconWithBadge.propTypes = {
    iconName: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool,
    badge: PropTypes.number,
};

TabBarIconWithBadge.defaultProps = {
    color: "#000",
    size: 24,
    focused: false,
    badge: 0,
};
