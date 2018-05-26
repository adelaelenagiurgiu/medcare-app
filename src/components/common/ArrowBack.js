import React from 'react';
import { Icon } from 'react-native-elements';

import { WHITE } from '../../../assets/colors';

export const ArrowBack = ({ onPress }) => {
  return <Icon color={WHITE} name="arrow-back" onPress={onPress} />;
};
