import React from 'react';
import {} from 'react-native';
import Reanimated from 'react-native-reanimated';
import { IFlipOutYPresentationProps } from './';

export const FlipOutYPresentation: React.FC<IFlipOutYPresentationProps> = (
  props,
) => {
  return (
    <Reanimated.View style={props.containerStyle}>
      {props.children}
    </Reanimated.View>
  );
};
