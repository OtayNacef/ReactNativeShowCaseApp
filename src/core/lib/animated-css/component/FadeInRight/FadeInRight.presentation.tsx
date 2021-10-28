/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { IFadeInRightPresentationProps, Constant } from './';

export const FadeInRightPresentation: React.FC<IFadeInRightPresentationProps> =
  (props) => {
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(props.startPostionX);

    const animatedStyle = useAnimatedStyle<
      Reanimated.AnimatedStyleProp<ViewStyle>
    >(() => {
      return {
        opacity: opacity.value,
        transform: [{ translateX: translateX.value }],
      };
    });

    useEffect(() => {
      opacity.value = withDelay(
        props.delayInMS,
        withTiming(Constant.MAX_OPACITY, {
          duration: Constant.DEFAULT_DURATION_IN_MS,
        }),
      );

      translateX.value = withDelay(
        props.delayInMS,
        withTiming(Constant.FINAL_POSITION_X, {
          duration: Constant.DEFAULT_DURATION_IN_MS,
        }),
      );
    }, []);

    return (
      <Reanimated.View style={animatedStyle}>{props.children}</Reanimated.View>
    );
  };
