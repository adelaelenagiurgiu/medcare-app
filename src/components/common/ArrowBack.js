import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import { WHITE } from '../../../assets/colors';

export default class ArrowBack extends Component {
  render() {
    return <Icon color={WHITE} name="arrow-back" onPress={this.props.onPress} />;
  }
}
