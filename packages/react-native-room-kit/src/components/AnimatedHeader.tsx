import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { useHeaderHeight } from './Header';
import { useIsHLSViewer } from '../hooks-util';

export interface AnimatedHeaderProps {
  offset: SharedValue<number>;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  children,
  offset,
}) => {
  const isHLSViewer = useIsHLSViewer();
  const headerHeight = useHeaderHeight();

  const animatedStyles = useAnimatedStyle(() => {
    if (isHLSViewer) {
      return {
        opacity: offset.value,
        transform: [{ translateY: 0 }],
      };
    }
    return {
      opacity: interpolate(offset.value, [0, 0.3, 1], [0, 0.7, 1]),
      transform: [
        { translateY: interpolate(offset.value, [0, 1], [-headerHeight, 0]) },
      ],
    };
  }, [headerHeight, isHLSViewer]);

  const animatedProps = useAnimatedProps((): {
    pointerEvents: 'none' | 'auto';
  } => {
    return {
      pointerEvents: offset.value === 0 ? 'none' : 'auto',
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container, animatedStyles]}
      animatedProps={animatedProps}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});
