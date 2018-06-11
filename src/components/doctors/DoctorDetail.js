import React, { PureComponent } from 'react';
import { Text, Dimensions, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements';

import { TURQUOISE, WHITE } from '../../../assets/colors';
import { Line, Button } from '../common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class DoctorDetail extends PureComponent {
  renderSchedule() {
    const { doctorSchedule } = this.props.doctor;
    return doctorSchedule.map(schedule => {
      return (
        <View style={{ flexDirection: 'row' }} key={schedule._id}>
          <Text style={styles.scheduleDayText}>{schedule.day}</Text>
          <Text style={styles.scheduleTimeText}>{schedule.timeFrame}</Text>
        </View>
      );
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      doctorName,
      doctorSpecialization,
      doctorProfessionalGrade,
      doctorImage,
      doctorTelephone,
      doctorEmail
    } = this.props.doctor;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={{ uri: doctorImage }} style={styles.image} />
        <Card containerStyle={styles.container}>
          <Text style={styles.DoctorTextStyle}>{doctorName}</Text>
          <Line />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              color={TURQUOISE}
              type="simple-line-icon"
              name="graduation"
              iconStyle={{ marginTop: 5 }}
            />
            <Text style={styles.SpecializationStyle}> {doctorSpecialization}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Icon color={TURQUOISE} type="simple-line-icon" name="badge" />
            <Text style={styles.TextStyle}>{doctorProfessionalGrade}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon color={TURQUOISE} type="simple-line-icon" name="phone" />
            <Text style={styles.TextStyle}>{doctorTelephone}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon color={TURQUOISE} type="simple-line-icon" name="envelope" />
            <Text style={styles.TextStyle}>{doctorEmail}</Text>
          </View>
          <Line text="ORAR" />
          {this.renderSchedule()}
          <Button
            title="Vreau o programare!"
            textColor={WHITE}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('Book', { doctor: doctorName, doctorImage })}
          />
        </Card>
      </View>
    );
  }
}

DoctorDetail.propTypes = {
  doctor: PropTypes.object.isRequired
};

const styles = {
  container: {
    width: SCREEN_WIDTH - 30,
    marginTop: 0,
    marginBottom: 8
  },
  DoctorTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PTbold',
    marginBottom: 3
  },
  SpecializationStyle: {
    fontSize: 14,
    fontFamily: 'PTregular',
    marginBottom: 3,
    marginTop: 8,
    marginLeft: 10
  },
  TextStyle: {
    fontSize: 14,
    fontFamily: 'PTregular',
    marginBottom: 3,
    marginLeft: 10
  },
  scheduleDayText: {
    fontSize: 14,
    fontFamily: 'PTbold',
    marginRight: 8
  },
  scheduleTimeText: {
    fontSize: 14,
    fontFamily: 'PTregular'
  },
  image: {
    width: SCREEN_WIDTH - 30,
    height: SCREEN_HEIGHT / 3,
    marginTop: 8
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 70,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
