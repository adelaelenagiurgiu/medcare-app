import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import HistoryDetail from './HistoryDetail';
import { Loading } from '../common';

export default class HistoryList extends Component {
  state = {
    loading: false,
    lastItem: false
  };

  renderItem(item, index) {
    const { appointments, type, navigation } = this.props;

    if (index === appointments.length - 1) {
      return (
        <HistoryDetail
          type={type}
          navigation={navigation}
          appointment={item}
          lastItem
          setLoading={bool => this.setState({ loading: bool })}
          setLastItem={bool => this.setState({ lastItem: bool })}
        />
      );
    }

    return (
      <HistoryDetail
        type={type}
        navigation={navigation}
        appointment={item}
        setLoading={bool => this.setState({ loading: bool })}
        setLastItem={bool => this.setState({ lastItem: bool })}
      />
    );
  }

  render() {
    const { appointments } = this.props;

    appointments.sort((x, y) => {
      const a = moment(
        `${x.date.day}-${x.date.month}-${x.date.year} ${x.start}`,
        'DD-MM-YYYY HH:mm'
      );
      const b = moment(
        `${y.date.day}-${y.date.month}-${y.date.year} ${y.start}`,
        'DD-MM-YYYY HH:mm'
      );

      if (a.isAfter(b)) {
        return -1;
      } else if (a.isBefore(b)) {
        return 1;
      }
      return 0;
    });

    return (
      <View style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        {appointments.length > 0 ? (
          <FlatList
            ref={ref => (this.flatList = ref)}
            data={appointments}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            contentContainerStyle={{ paddingBottom: 15 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              if (this.state.lastItem) {
                this.flatList.scrollToEnd({ animated: true });
              }
            }}
          />
        ) : null}
      </View>
    );
  }
}

HistoryList.propTypes = {
  type: PropTypes.string.isRequired,
  appointments: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
