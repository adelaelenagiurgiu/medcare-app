import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class DoctorDetail extends Component {
  render() {
    const { doctorName } = this.props.doctor;
    return (
      <View>
        <Text>{doctorName}</Text>
      </View>
    );
  }
}

DoctorDetail.propTypes = {
  doctor: PropTypes.object.isRequired
};
