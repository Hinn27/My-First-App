import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import PropTypes from 'prop-types';

export default function AnimatedTabIcon({ focused, iconName, color, size = 24 }) {
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(focused ? 1.15 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0.6, { duration: 200 }),
  }));

  return (
    <Animated.View style={[scaleStyle, opacityStyle]}>
      <Ionicons name={iconName} size={size} color={color} />
    </Animated.View>
  );
}

AnimatedTabIcon.propTypes = {
  focused: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

AnimatedTabIcon.defaultProps = {
  focused: false,
  color: '#000',
  size: 24,
};

