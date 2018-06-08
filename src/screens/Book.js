import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import StoreProvider from '../store/StoreProvider';
import { ArrowBack, Button } from '../components/common';
import { GREY, DARK_GREY, LIGHT_TURQUOISE, TURQUOISE, WHITE } from '../../assets/colors';
import { deleteBookedHour } from '../actions';

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

class Book extends Component {
  constructor(props) {
    super(props);

    this.currentDate = moment().format('YYYY-MM-DD');
    this.minDate = moment()
      .startOf('week')
      .add(1, 'day')
      .format('YYYY-MM-DD');
    this.maxDate = moment()
      .endOf('week')
      .format('YYYY-MM-DD');

    this.onBook = this.onBook.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  state = {
    focusIndex: 0,
    date: {}
  };

  async onBook() {
    const doctor = this.props.navigation.getParam('doctor');
    const dayInEnglish = moment(this.state.date.dateString, 'YYYY-MM-DD').format('dddd');
    const dayParam = this.transformDay(dayInEnglish);

    const { availableHours } = this.props;

    const appointment = {
      patient: 'Vasile Baciu',
      doctor,
      weekDay: dayParam,
      date: {
        day: this.state.date.day,
        month: this.state.date.month,
        year: this.state.date.year
      },
      start: availableHours[this.state.focusIndex].start,
      end: availableHours[this.state.focusIndex].end
    };

    await StoreProvider.book(appointment);

    const patient = 'Vasile Baciu';
    const patientParam = encodeURIComponent(patient);
    await StoreProvider.getAppointmentsForPatient(patientParam);

    const updateBody = {
      doctor,
      weekDay: dayParam,
      startHour: availableHours[this.state.focusIndex].start
    };

    await StoreProvider.updateStatus(updateBody);
    this.props.deleteBookedHour(this.state.focusIndex);
  }

  async onButtonPress() {
    if (this.props.availableHours.length > 0) {
      await this.onBook();
      Alert.alert(
        'Succes',
        'Programarea a fost facuta!',
        [
          {
            text: 'OK'
          }
        ],
        { cancelable: false }
      );
    }
  }

  async onDayPress(day) {
    this.setState({ date: day });
    const doctor = this.props.navigation.getParam('doctor');
    const doctorParam = encodeURIComponent(doctor);
    const dayInEnglish = moment(day.dateString, 'YYYY-MM-DD').format('dddd');
    const dayParam = this.transformDay(dayInEnglish);
    await StoreProvider.getAvailableHours(doctorParam, dayParam);
  }

  transformDay(day) {
    switch (day) {
      case 'Monday':
        return 'Luni';
      case 'Tuesday':
        return 'Marti';
      case 'Wednesday':
        return 'Miercuri';
      case 'Thursday':
        return 'Joi';
      case 'Friday':
        return 'Vineri';
      case 'Saturday':
        return 'Sambata';
      default:
        return null;
    }
  }

  renderItem(item, index) {
    if (index === this.state.focusIndex) {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ focusIndex: index })}
          style={styles.hourContainer}
        >
          <Text style={[styles.hourStyle, { color: TURQUOISE }]}>
            {item.start} - {item.end}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => this.setState({ focusIndex: index })}
        style={styles.hourContainer}
      >
        <Text style={styles.hourStyle}>
          {item.start} - {item.end}
        </Text>
      </TouchableOpacity>
    );
  }

  renderAvailableHours() {
    const { availableHours } = this.props;
    if (availableHours.length > 0) {
      return (
        <FlatList
          data={availableHours}
          extraData={this.state.focusIndex}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          scrollEnabled={false}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Programare', style: { color: WHITE } }}
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Programarile se fac doar pe saptamana curenta</Text>
          </View>
          <Calendar
            theme={{
              backgroundColor: GREY,
              // calendarBackground: GREY,
              textSectionTitleColor: LIGHT_TURQUOISE,
              selectedDayTextColor: TURQUOISE,
              selectedDayBackgroundColor: WHITE,
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
            current={this.currentDate}
            minDate={this.minDate}
            maxDate={this.maxDate}
            onDayPress={day => {
              this.onDayPress(day);
            }}
            monthFormat="MMMM"
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            disableMonthChange
            firstDay={1}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            markedDates={{
              [this.state.date.dateString]: { selected: true }
            }}
          />
          {this.renderAvailableHours()}
          <Button
            title="Programeaza-ma!"
            textColor={WHITE}
            buttonStyle={styles.button}
            onPress={this.onButtonPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingBottom: 10
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'PTregular'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  hourContainer: {
    height: 50,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: GREY
  },
  hourStyle: {
    fontSize: 24,
    fontFamily: 'PTregular'
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    availableHours: state.appointments.availableHours
  };
};

export default connect(
  mapStateToProps,
  { deleteBookedHour }
)(Book);
