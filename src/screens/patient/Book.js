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
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import StoreProvider from '../../store/StoreProvider';
import Error from '../../components/Error';
import { ArrowBack, Button, Loading } from '../../components/common';
import { GREY, DARK_GREY, LIGHT_TURQUOISE, TURQUOISE, WHITE } from '../../../assets/colors';
import { deleteBookedHour, clearAvailableHours } from '../../actions';

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
    this.month = moment().format('M');
    this.year = moment().format('YYYY');
    this.minDate = moment()
      .startOf('year')
      .format('YYYY-MM-DD');
    this.maxDate = moment()
      .endOf('year')
      .format('YYYY-MM-DD');

    this.onBook = this.onBook.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.getMarkedDays = this.getMarkedDays.bind(this);
  }

  state = {
    focusIndex: 0,
    date: {},
    markedDates: {},
    dateSelected: false,
    loading: false
  };

  componentDidMount() {
    if (!this.state.dateSelected) {
      this.getMarkedDays(this.month - 2, this.month, this.year, 'Sunday');
    }
  }

  async onBook() {
    const doctor = this.props.navigation.getParam('doctor');
    const doctorImage = this.props.navigation.getParam('doctorImage');
    const dayInEnglish = moment(this.state.date.dateString, 'YYYY-MM-DD').format('dddd');
    const dayParam = this.transformDay(dayInEnglish);

    const { availableHours, patientProp } = this.props;
    const patient = patientProp.patientName;

    const appointment = {
      patient,
      doctor,
      doctorImage,
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
    await StoreProvider.getAppointmentsForPatient(patient);
    this.props.deleteBookedHour(this.state.focusIndex);
  }

  async onButtonPress() {
    if (this.state.dateSelected) {
      this.setState({ loading: true });
      await this.onBook();
      this.setState({ loading: false });
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
    const { markedDates } = this.state;
    const selected = { selected: true };
    const object = {
      [day.dateString]: selected
    };

    if (!(day.dateString in markedDates)) {
      this.setState(prevState => {
        Object.keys(prevState.markedDates).forEach(key => {
          if (prevState.markedDates[key].selected) {
            delete markedDates[key];
          }
        });
        return {
          date: day,
          dateSelected: true,
          loading: true,
          markedDates: Object.assign({}, markedDates, object)
        };
      });

      const doctor = this.props.navigation.getParam('doctor');
      const doctorParam = encodeURIComponent(doctor);
      const dayInEnglish = moment(day.dateString, 'YYYY-MM-DD').format('dddd');
      const dayParam = this.transformDay(dayInEnglish);
      const dateParam = moment(day.dateString, 'YYYY-MM-DD').format('D-M-YYYY');
      await StoreProvider.getAvailableHours(doctorParam, dayParam, dateParam);
      this.setState({ loading: false });
    } else {
      const { availableHours } = this.props;
      if (availableHours.length > 0) {
        this.props.clearAvailableHours();
        this.setState(prevState => {
          Object.keys(prevState.markedDates).forEach(key => {
            if (prevState.markedDates[key].selected) {
              delete markedDates[key];
            }
          });
          return {
            markedDates: Object.assign({}, markedDates)
          };
        });
      }
    }
  }

  getMarkedDays(startMonth, endMonth, year, sunday) {
    const start = moment()
      .month(startMonth)
      .year(year)
      .startOf('month');
    const end = moment()
      .month(endMonth)
      .year(year)
      .endOf('month');

    const dates = {};
    const disabled = { disabled: true };
    // const now = moment();
    while (start.isBefore(end)) {
      // if (start.isBefore(now)) {
      // dates[start.format('YYYY-MM-DD')] = disabled;
      // start.add(1, 'day');
      // } else {
      dates[start.day(sunday).format('YYYY-MM-DD')] = disabled;
      start.add(7, 'days');
      // }
    }
    this.setState({ markedDates: dates });
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
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <Error />
        {this.state.loading ? <Loading /> : null}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Calendar
            theme={{
              backgroundColor: GREY,
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
            minDate={this.minDate}
            maxDate={this.maxDate}
            onDayPress={day => {
              this.onDayPress(day);
            }}
            onMonthChange={date => {
              this.getMarkedDays(date.month - 2, date.month, date.year, 'Sunday');
            }}
            monthFormat="MMMM"
            disableMonthChange
            firstDay={1}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            markedDates={this.state.markedDates}
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
    paddingBottom: 10,
    paddingTop: Constants.statusBarHeight
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
    availableHours: state.appointments.availableHours,
    patientProp: state.patient.patient
  };
};

export default connect(
  mapStateToProps,
  { deleteBookedHour, clearAvailableHours }
)(Book);
