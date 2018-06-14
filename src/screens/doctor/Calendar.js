import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Constants } from 'expo';
import { Header, Icon } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import moment from 'moment';

import Error from '../../components/Error';
import { Loading, TextLine } from '../../components/common';
import { TURQUOISE, WHITE, GREY, LIGHT_TURQUOISE, DARK_GREY } from '../../../assets/colors';

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
  }

  state = {
    // eslint-disable-next-line
    doctorAppointments: [],
    markedDates: {},
    selectedDay: {},
    selected: false,
    loading: false
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.selected) {
      const dates = {};

      if (props.doctorAppointments.length > 0) {
        for (const appointment of props.doctorAppointments) {
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

    if (props.doctorAppointments !== state.doctorAppointments) {
      const dates = {};

      if (props.doctorAppointments.length > 0) {
        for (const appointment of props.doctorAppointments) {
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

    if (props.doctorAppointments.length > 0) {
      const dates = {};

      for (const appointment of props.doctorAppointments) {
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

  onDayPress(day) {
    this.setState({ selectedDay: day, selected: true });
  }

  renderAppointments() {
    const { selectedDay, selected } = this.state;
    const { doctorAppointments } = this.props;

    let exists = false;
    if (selectedDay) {
      const selectedAppointments = [];
      for (const appointment of doctorAppointments) {
        if (
          appointment.date.day === String(selectedDay.day) &&
          appointment.date.month === String(selectedDay.month) &&
          appointment.date.year === String(selectedDay.year)
        ) {
          selectedAppointments.push(appointment);
          exists = true;
        }
      }

      selectedAppointments.sort((x, y) => {
        const a = moment(`${x.start}`, 'HH:mm');
        const b = moment(`${y.start}`, 'HH:mm');

        if (a.isAfter(b)) {
          return 1;
        } else if (a.isBefore(b)) {
          return -1;
        }
        return 0;
      });

      if (selected && exists) {
        return (
          <FlatList
            data={selectedAppointments}
            keyExtractor={item => item._id}
            initialNumToRender={1}
            renderItem={({ item }) => this.renderItem({ item })}
            contentContainerStyle={{ paddingTop: 15 }}
          />
        );
      }
    }

    return null;
  }

  renderItem({ item }) {
    const constructedDate = moment(
      `${item.date.day}-${item.date.month}-${item.date.year}`,
      'DD-MM-YYYY'
    )
      .format('DD-MM-YYYY')
      .toString();

    return (
      <View style={styles.appointmentContainer}>
        <View style={{ width: '50%' }}>
          <View style={styles.leftRow}>
            <Icon
              name="user"
              type="font-awesome"
              color={TURQUOISE}
              containerStyle={styles.iconContainer}
            />
            <TextLine type="PTregular" size={14} color="#000">
              {item.patient}
            </TextLine>
          </View>
          <View style={styles.leftRow}>
            <Icon
              name="calendar"
              type="font-awesome"
              size={20}
              color={TURQUOISE}
              containerStyle={styles.iconContainer}
            />
            <TextLine type="PTregular" size={14} color="#000">
              {item.weekDay}, {constructedDate}
            </TextLine>
          </View>
        </View>
        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <View style={styles.rightRow}>
            <Icon
              name="timer"
              type="material-community"
              size={22}
              color={TURQUOISE}
              containerStyle={styles.iconContainer}
            />
            <TextLine type="PTregular" size={14} color="#000">
              {item.start}
            </TextLine>
          </View>
          <View style={styles.rightRow}>
            <Icon
              name="timer-off"
              type="material-community"
              size={22}
              color={TURQUOISE}
              containerStyle={styles.iconContainer}
            />
            <TextLine type="PTregular" size={14} color="#000">
              {item.end}
            </TextLine>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <Error />
        <Header
          backgroundColor={TURQUOISE}
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
        {this.renderAppointments()}
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
  iconContainer: {
    marginRight: 10
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5,
    left: 20
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5,
    right: 20
  },
  appointmentContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    width: SCREEN_WIDTH,
    borderBottomWidth: 1,
    borderColor: GREY,
    paddingVertical: 2.5
  }
});

const mapStateToProps = state => {
  return {
    doctorAppointments: state.appointments.doctorAppointments,
    sections: state.sectionsArray.sections
  };
};

export default connect(mapStateToProps)(Calendars);
