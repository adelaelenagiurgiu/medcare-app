import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { Header, Card, Icon, Avatar } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import moment from 'moment';

import { ArrowBack } from '../components/common';
import {
  TURQUOISE,
  WHITE,
  GREY,
  LIGHT_TURQUOISE,
  DARK_GREY,
  MEDIUM_GREY
} from '../../assets/colors';

// const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

LocaleConfig.locales['ro'] = {
  monthNames: [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie'
  ],
  dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
  dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam']
};

LocaleConfig.defaultLocale = 'ro';

class Calendars extends Component {
  constructor(props) {
    super(props);

    this.minDate = moment()
      .startOf('year')
      .format('YYYY-MM-DD');
    this.maxDate = moment()
      .endOf('year')
      .format('YYYY-MM-DD');
  }

  state = {
    // eslint-disable-next-line
    patientAppointments: [],
    markedDates: {},
    selectedDay: {},
    selected: false,
    doctors: []
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.selected) {
      const doctors = [];
      const dates = {};

      if (props.patientAppointments.length > 0) {
        for (const appointment of props.patientAppointments) {
          const doctorObject = {
            doctorName: '',
            doctorImage: ''
          };
          doctorObject.doctorName = appointment.doctor;
          doctors.push(doctorObject);

          const dateString = moment(
            `${appointment.date.year}-${appointment.date.month}-${appointment.date.day}`,
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');
          dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
        }
      }

      props.sections.map(section => {
        section.doctors.map(sectionDoctor => {
          for (const doctor of doctors) {
            if (doctor.doctorName === sectionDoctor.doctorName) {
              doctor.doctorImage = sectionDoctor.doctorImage;
            }
          }
        });
      });

      return {
        doctors,
        markedDates: dates
      };
    }

    if (props.patientAppointments !== state.patientAppointments) {
      const doctors = [];
      const dates = {};

      if (props.patientAppointments.length > 0) {
        for (const appointment of props.patientAppointments) {
          const doctorObject = {
            doctorName: '',
            doctorImage: ''
          };
          doctorObject.doctorName = appointment.doctor;
          doctors.push(doctorObject);

          const dateString = moment(
            `${appointment.date.year}-${appointment.date.month}-${appointment.date.day}`,
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');
          dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
        }
      }

      props.sections.map(section => {
        section.doctors.map(sectionDoctor => {
          for (const doctor of doctors) {
            if (doctor.doctorName === sectionDoctor.doctorName) {
              doctor.doctorImage = sectionDoctor.doctorImage;
            }
          }
        });
      });

      return {
        doctors,
        markedDates: dates
      };
    }

    if (props.patientAppointments.length > 0) {
      const dates = {};

      for (const appointment of props.patientAppointments) {
        const dateString = moment(
          `${appointment.date.year}-${appointment.date.month}-${appointment.date.day}`,
          'YYYY-MM-DD'
        ).format('YYYY-MM-DD');
        dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
      }
      return {
        markedDates: dates
      };
    }

    return null;
  }

  onDayPress(day) {
    this.setState({ selectedDay: day, selected: true });
  }

  renderAppointment() {
    const { selectedDay, selected, doctors } = this.state;

    let exists = false;
    if (selectedDay) {
      let selectedAppointment = {};
      for (const appointment of this.props.patientAppointments) {
        if (
          appointment.date.day === String(selectedDay.day) &&
          appointment.date.month === String(selectedDay.month) &&
          appointment.date.year === String(selectedDay.year)
        ) {
          selectedAppointment = appointment;
          exists = true;
        }
      }

      if (selected && exists) {
        const constructedDate = moment(
          `${selectedAppointment.date.day}-${selectedAppointment.date.month}-${
            selectedAppointment.date.year
          }`,
          'DD-MM-YYYY'
        )
          .format('DD-MM-YYYY')
          .toString();

        let doctorImage = '';
        for (const doctor of doctors) {
          if (doctor.doctorName === selectedAppointment.doctor) {
            doctorImage = doctor.doctorImage;
            break;
          }
        }

        return (
          <Card style={styles.cardStyle} wrapperStyle={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Avatar width={95} height={95} rounded source={{ uri: doctorImage }} />
            </View>
            <View style={{ flex: 2, marginLeft: 15 }}>
              <View style={styles.row}>
                <Icon
                  name="user-md"
                  type="font-awesome"
                  color={TURQUOISE}
                  containerStyle={{ marginLeft: 2 }}
                />
                <Text style={[styles.appointmentTextStyle, { marginLeft: 14 }]}>
                  {selectedAppointment.doctor}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="calendar" type="font-awesome" color={TURQUOISE} />
                <Text style={[styles.appointmentTextStyle, { marginLeft: 13 }]}>
                  {selectedAppointment.weekDay}, {constructedDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="access-time" color={TURQUOISE} />
                <Text style={styles.appointmentTextStyle}>{selectedAppointment.start}</Text>
              </View>
            </View>
          </Card>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Calendar', style: { color: WHITE } }}
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <Calendar
          theme={{
            backgroundColor: GREY,
            textSectionTitleColor: LIGHT_TURQUOISE,
            selectedDayBackgroundColor: LIGHT_TURQUOISE,
            selectedDayTextColor: WHITE,
            todayTextColor: DARK_GREY,
            dayTextColor: DARK_GREY,
            textDisabledColor: GREY,
            arrowColor: TURQUOISE,
            monthTextColor: TURQUOISE,
            textDayFontFamily: 'PTbold',
            textMonthFontFamily: 'PTbold',
            textDayHeaderFontFamily: 'PTbold',
            textMonthFontWeight: 'bold',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14
          }}
          minDate={this.minDate}
          maxDate={this.maxDate}
          onDayPress={day => {
            this.onDayPress(day);
          }}
          onMonthChange={() => {
            this.setState({ selectedDay: {}, selected: false });
          }}
          monthFormat="MMMM"
          disableMonthChange
          firstDay={1}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          markedDates={this.state.markedDates}
        />
        {this.renderAppointment()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY,
    paddingTop: Constants.statusBarHeight
  },
  textstyle: {
    marginTop: 29,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appointmentTextStyle: {
    fontFamily: 'PTregular',
    fontSize: 14,
    marginLeft: 10
  },
  cardStyle: {
    marginBottom: 10,
    borderColor: MEDIUM_GREY,
    borderRadius: 4,
    width: SCREEN_WIDTH - 10,
    height: 300
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5
  }
});

const mapStateToProps = state => {
  return {
    patientAppointments: state.appointments.patientAppointments,
    sections: state.sectionsArray.sections
  };
};

export default connect(mapStateToProps)(Calendars);
