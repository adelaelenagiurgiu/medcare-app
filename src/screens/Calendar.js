import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { Constants } from 'expo';
import { Header, Card, Icon, Avatar } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import moment from 'moment';

import StoreProvider from '../store/StoreProvider';
import Error from '../components/Error';
import { ArrowBack, Loading } from '../components/common';
import { TURQUOISE, WHITE, GREY, LIGHT_TURQUOISE, DARK_GREY } from '../../assets/colors';

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

    this.now = moment();
    this.minDate = moment()
      .startOf('year')
      .format('YYYY-MM-DD');
    this.maxDate = moment()
      .endOf('year')
      .format('YYYY-MM-DD');

    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  state = {
    // eslint-disable-next-line
    patientAppointments: [],
    markedDates: {},
    selectedDay: {},
    selected: false,
    loading: false
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.selected) {
      const dates = {};

      if (props.patientAppointments.length > 0) {
        for (const appointment of props.patientAppointments) {
          const dateString = moment(
            `${appointment.date.year}-${appointment.date.month}-${appointment.date.day}`,
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');

          if (moment(dateString).isSameOrAfter(this.now)) {
            dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
          }
        }
      }

      return {
        markedDates: dates
      };
    }

    if (props.patientAppointments !== state.patientAppointments) {
      const dates = {};

      if (props.patientAppointments.length > 0) {
        for (const appointment of props.patientAppointments) {
          const dateString = moment(
            `${appointment.date.year}-${appointment.date.month}-${appointment.date.day}`,
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');

          if (moment(dateString).isSameOrAfter(this.now)) {
            dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
          }
        }
      }

      return {
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
        if (moment(dateString).isSameOrAfter(this.now)) {
          dates[dateString] = { selected: true, marked: true, selectedColor: TURQUOISE };
        }
      }
      return {
        markedDates: dates
      };
    }

    return null;
  }

  onCancel() {
    Alert.alert(
      'Confirmare',
      'Sigur doriti sa stergeti programarea?',
      [{ text: 'Nu', style: 'cancel' }, { text: 'Da', onPress: this.onConfirm }],
      { cancelable: false }
    );
  }

  async onConfirm() {
    this.setState({ loading: true });
    await StoreProvider.deleteAppointment(this.appointmentId);
    this.setState({ loading: false });
  }

  onDayPress(day) {
    this.setState({ selectedDay: day, selected: true });
  }

  renderAppointment() {
    const { selectedDay, selected } = this.state;

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
          this.appointmentId = appointment._id;
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

        return (
          <View style={{ alignItems: 'center' }}>
            <Card containerStyle={styles.cardStyle} wrapperStyle={{ flexDirection: 'row' }}>
              <View style={{ flex: 3, marginRight: 15, justifyContent: 'center' }}>
                <Avatar
                  width={90}
                  height={90}
                  rounded
                  source={{ uri: selectedAppointment.doctorImage }}
                />
              </View>
              <View style={{ flex: 8, marginLeft: 15 }}>
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
              <View style={styles.crossContainer}>
                <Icon
                  name="cross"
                  type="entypo"
                  color="red"
                  underlayColor="transparent"
                  size={30}
                  onPress={this.onCancel}
                />
              </View>
            </Card>
          </View>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <Error />
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
  appointmentTextStyle: {
    fontFamily: 'PTregular',
    fontSize: 14,
    marginLeft: 10
  },
  cardStyle: {
    width: SCREEN_WIDTH - 20,
    height: 125,
    padding: 10,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5
  },
  crossContainer: {
    flex: 1,
    transform: [{ translateY: -7.8 }]
  }
});

const mapStateToProps = state => {
  return {
    patientAppointments: state.appointments.patientAppointments,
    sections: state.sectionsArray.sections,
    patient: state.patient.patient
  };
};

export default connect(mapStateToProps)(Calendars);
