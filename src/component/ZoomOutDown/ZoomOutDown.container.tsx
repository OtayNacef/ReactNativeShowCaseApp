/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  Constant,
  IZoomOutDownContainerProps,
  ZoomOutDownPresentation,
} from '.';

export const ZoomOutDown: React.FC<IZoomOutDownContainerProps> = ({
  children,
  delayInMS = Constant.DEFAULT_DELAY_IN_MS,
  durationInMS = Constant.DEFAULT_DURATION_IN_MS,
}) => {
  const opacity = useSharedValue(Constant.MAX_OPACITY);
  const scale = useSharedValue(Constant.MAX_SCALE);
  const translateY = useSharedValue(Constant.INITIAL_POSITION_Y);

  const animatedStyle = useAnimatedStyle<Reanimated.AnimateStyle<ViewStyle>>(
    () => {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }, { translateY: translateY.value }],
      };
    },
  );

  useEffect(() => {
    opacity.value = withDelay(
      delayInMS,
      withTiming(Constant.MIN_OPACITY, {
        duration: durationInMS,
      }),
    );

    scale.value = withDelay(
      delayInMS,
      withTiming(Constant.MIN_SCALE, {
        duration: durationInMS,
      }),
    );

    translateY.value = withDelay(
      delayInMS,
      withTiming(Constant.FINAL_POSITION_Y, {
        duration: durationInMS,
      }),
    );
  }, []);

  return (
    <ZoomOutDownPresentation containerStyle={animatedStyle}>
      {children}
    </ZoomOutDownPresentation>
  );
};
