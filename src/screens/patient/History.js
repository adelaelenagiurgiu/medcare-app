import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';

import { TURQUOISE, WHITE, GREY } from '../../../assets/colors';
import HistoryList from '../../components/history/HistoryList';

// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;

class History extends Component {
  constructor(props) {
    super(props);

    this.now = moment();
  }

  state = {
    appointments: []
  };

  static getDerivedStateFromProps(props) {
    const appointments = [];
    if (props.patientAppointments.length > 0) {
      for (const app of props.patientAppointments) {
        const appDate = moment(
          `${app.date.year}-${app.date.month}-${app.date.day}`,
          'YYYY-MM-DD'
        ).format('YYYY-MM-DD');

        if (moment(appDate).isBefore(this.now)) {
          appointments.push(app);
        }
      }

      return {
        appointments
      };
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          centerComponent={{ text: 'Istoric', style: { color: WHITE } }}
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <HistoryList type="patient" appointments={this.state.appointments} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY,
    paddingTop: Constants.statusBarHeight
  }
});

const mapStateToProps = state => {
  return {
    patientAppointments: state.appointments.patientAppointments
  };
};

export default connect(mapStateToProps)(History);
