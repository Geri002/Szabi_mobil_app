import React from 'react';
import {Image, ImageProps, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/theme';

interface HandIconProps extends Omit<ImageProps, 'source'> {}

export const HandIcon: React.FC<HandIconProps> = ({style, ...restProps}) => {
  return (
    <Image
      source={require('./assets/hand.png')}
      style={[styles.icon, style]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: COLORS.SURFACE.ON_SURFACE.HIGH,
  },
});
