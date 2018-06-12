import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';

import { TURQUOISE } from '../../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.onExpand = this.onExpand.bind(this);
  }

  state = {
    expanded: false,
    cardHeight: 125,
    justifyContent: 'center'
  };

  onExpand() {
    const { cardHeight } = this.state;
    if (cardHeight === 125) {
      this.setState({ expanded: true, cardHeight: 330, justifyContent: 'flex-start' });
    } else {
      this.setState({ expanded: false, cardHeight: 125, justifyContent: 'center' });
    }
  }

  renderResults(results) {
    return results.map(result => {
      return (
        <Text style={styles.text} key={result._id}>
          {result.result}
        </Text>
      );
    });
  }

  renderAnalysis(appointment) {
    const { expanded } = this.state;
    if (expanded) {
      return (
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle}>Serviciu: </Text>
            <Text style={styles.text}> {appointment.analysis} </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle}>Diagnostic: </Text>
            <Text style={styles.text}>{appointment.disease}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle}>Tratament: </Text>
            <Text style={styles.text}>{appointment.medication}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle}>Rezultate: </Text>
            <Text style={styles.text}>{this.renderResults(appointment.results)}</Text>
          </View>
        </View>
      );
    }

    return null;
  }

  render() {
    const { appointment } = this.props;
    const { cardHeight, justifyContent } = this.state;
    const { cardStyle, appointmentTextStyle, row, arrowsContainer } = styles;

    const constructedDate = moment(
      `${appointment.date.day}-${appointment.date.month}-${appointment.date.year}`,
      'DD-MM-YYYY'
    )
      .format('DD-MM-YYYY')
      .toString();
    return (
      <TouchableOpacity
        key={appointment._id}
        style={{ alignItems: 'center' }}
        onPress={this.onExpand}
      >
        <Card containerStyle={[cardStyle, { height: cardHeight, justifyContent }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, marginRight: 15, justifyContent: 'center' }}>
              <Avatar width={90} height={90} rounded source={{ uri: appointment.doctorImage }} />
            </View>
            <View style={{ flex: 8, marginLeft: 15 }}>
              <View style={row}>
                <Icon
                  name="user-md"
                  type="font-awesome"
                  color={TURQUOISE}
                  containerStyle={{ marginLeft: 2 }}
                />
                <Text style={[appointmentTextStyle, { marginLeft: 14 }]}>{appointment.doctor}</Text>
              </View>
              <View style={row}>
                <Icon name="calendar" type="font-awesome" color={TURQUOISE} />
                <Text style={[appointmentTextStyle, { marginLeft: 13 }]}>
                  {appointment.weekDay}, {constructedDate}
                </Text>
              </View>
              <View style={row}>
                <Icon name="access-time" color={TURQUOISE} />
                <Text style={appointmentTextStyle}>{appointment.start}</Text>
              </View>
            </View>
            <View style={arrowsContainer}>
              <Icon
                name="chevron-double-down"
                type="material-community"
                color={TURQUOISE}
                underlayColor="transparent"
                size={30}
              />
            </View>
          </View>
          {this.renderAnalysis(appointment)}
        </Card>
      </TouchableOpacity>
    );
  }
}

HistoryDetail.propTypes = {
  appointment: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardStyle: {
    width: SCREEN_WIDTH - 20,
    padding: 10
  },
  appointmentTextStyle: {
    fontFamily: 'PTregular',
    fontSize: 14,
    marginLeft: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5
  },
  arrowsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'PTregular',
    fontSize: 14
  },
  textStyle: {
    fontFamily: 'PTbold',
    fontSize: 14,
    color: TURQUOISE
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 7
  }
});

export default HistoryDetail;
