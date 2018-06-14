import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';

import { Input } from '../../components/common';
import { TURQUOISE, WHITE, GREY } from '../../../assets/colors';
import HistoryList from '../../components/history/HistoryList';

const SCREEN_WIDTH = Dimensions.get('window').width;

class History extends Component {
  constructor(props) {
    super(props);

    this.now = moment();
  }

  state = {
    appointments: [],
    search: ''
  };

  static getDerivedStateFromProps(props) {
    const appointments = [];
    if (props.doctorAppointments.length > 0) {
      for (const app of props.doctorAppointments) {
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

  search(name) {
    const { doctorAppointments } = this.props;
    const copy = doctorAppointments.slice();
    const newAppointments = copy.filter(app => app.patient.toLowerCase().includes(name));

    this.setState({ search: name, appointments: newAppointments });
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
        <View style={styles.searchContainer}>
          <Input
            value={this.state.search}
            onChangeText={name => this.search(name)}
            underlineColorAndroid="transparent"
            placeholder="Nume"
            width={SCREEN_WIDTH - 20}
            mainColor={TURQUOISE}
            textColor={TURQUOISE}
            icon="search"
            iconType="octicon"
          />
        </View>
        <HistoryList type="doctor" appointments={this.state.appointments} />
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
  searchContainer: {
    alignItems: 'center',
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    doctorAppointments: state.appointments.doctorAppointments
  };
};

export default connect(mapStateToProps)(History);
