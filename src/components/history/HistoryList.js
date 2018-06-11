import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import HistoryDetail from './HistoryDetail';

export default class HistoryList extends Component {
  renderAppointments() {
    const { appointments } = this.props;

    if (appointments.length > 0) {
      return appointments.map(appointment => {
        return <HistoryDetail key={appointment._id} appointment={appointment} />;
      });
    }

    return null;
  }

  render() {
    return <View style={styles.container}>{this.renderAppointments()}</View>;
  }
}

HistoryList.propTypes = {
  appointments: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
