import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { ArrowBack } from '../components/common';
import { TURQUOISE, WHITE, GREY, LIGHT_TURQUOISE, DARK_GREY } from '../../assets/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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

export default class Calendars extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Calendar', style: { color: WHITE } }}
        />

        <Calendar
          style={{
            height: SCREEN_HEIGHT
          }}
          theme={{
            backgroundColor: GREY,
            // calendarBackground: GREY,
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
          current="2018-06-01"
          minDate="2018-01-01"
          maxDate="2018-12-31"
          onDayPress={day => {
            console.log('selected day', day);
          }}
          onDayLongPress={day => {
            console.log('selected day', day);
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
            '2018-05-16': { selected: true, marked: true, selectedColor: TURQUOISE },
            '2018-05-17': { marked: true }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY
  },
  textstyle: {
    marginTop: 29,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
