import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class DoctorDetail extends Component {
  renderSchedule() {
    const { doctorSchedule } = this.props.doctor;
    return doctorSchedule.map(schedule => {
      return (
        <Text key={schedule._id}>
          {schedule.day} {schedule.timeFrame}
        </Text>
      );
    });
  }

  render() {
    const {
      doctorName,
      doctorSpecialization,
      doctorProfessionalGrade,
      doctorImage,
      doctorTelephone,
      doctorEmail
    } = this.props.doctor;
    return (
      <View>
        <Text>{doctorName}</Text>
        <Text>{doctorSpecialization}</Text>
        <Text>{doctorProfessionalGrade}</Text>
        <Image source={{ uri: doctorImage }} />
        <Text>{doctorTelephone}</Text>
        <Text>{doctorEmail}</Text>
        {this.renderSchedule()}
      </View>
    );
  }
}

DoctorDetail.propTypes = {
  doctor: PropTypes.object.isRequired
};
