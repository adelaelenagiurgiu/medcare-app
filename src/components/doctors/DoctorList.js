import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import DoctorDetail from './DoctorDetail';

export default class DoctorList extends Component {
  renderDoctors() {
    const { doctors } = this.props;
    return doctors.map(doctor => <DoctorDetail key={doctor._id} doctor={doctor} />);
  }

  render() {
    return <View>{this.renderDoctors()}</View>;
  }
}

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired
};
