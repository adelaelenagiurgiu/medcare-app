import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { TextLine } from './TextLine';
import { GREY, TURQUOISE } from '../../../assets/colors';

export const Line = ({ text, textSize, textColor, lineStyle, containerStyle }) => {
  const { container, textStyle, line } = styles;
  if (text) {
    return (
      <View style={[container, containerStyle]}>
        <View style={[line, lineStyle]} />
        <TextLine
          type="regular"
          size={textSize || 16}
          color={textColor || TURQUOISE}
          style={textStyle}
        >
          {text}
        </TextLine>
        <View style={[line, lineStyle]} />
      </View>
    );
  }

  return (
    <View style={[container, containerStyle]}>
      <View style={[line, lineStyle]} />
    </View>
  );
};

Line.propTypes = {
  text: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.string,
  lineStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    padding: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: GREY
  }
});
