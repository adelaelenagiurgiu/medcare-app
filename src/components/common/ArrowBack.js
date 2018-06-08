import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { WHITE } from '../../../assets/colors';

export const ArrowBack = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon color={WHITE} name="arrow-back" />
    </TouchableOpacity>
  );
};
