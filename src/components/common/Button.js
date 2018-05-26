import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { WHITE, TURQUOISE } from '../../../assets/colors';

export const Button = ({ onPress, children, buttonStyle }) => {
  const { button, text } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[button, buttonStyle]}>
      <Text style={text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: TURQUOISE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: TURQUOISE,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  text: {
    alignSelf: 'center',
    color: WHITE,
    fontSize: 16,
    fontFamily: 'PTbold',
    paddingTop: 10,
    paddingBottom: 10
  }
};
