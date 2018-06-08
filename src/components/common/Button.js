import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { TURQUOISE } from '../../../assets/colors';
import { TextLine } from '.';

export const Button = ({
  onPress,
  title,
  buttonStyle,
  textColor,
  textType,
  icon,
  iconType,
  iconColor
}) => {
  const { button, iconContainer } = styles;

  if (icon) {
    return (
      <TouchableOpacity onPress={onPress} style={[button, buttonStyle]}>
        <View style={iconContainer}>
          <Icon name={icon} type={iconType} color={iconColor} size={30} />
          <TextLine type="PTbold" size={20} color={textColor} style={{ paddingLeft: 10 }}>
            {title}
          </TextLine>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[button, buttonStyle]}>
      <TextLine type={textType || 'PTbold'} size={16} color={textColor}>
        {title}
      </TextLine>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
