import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card, Avatar, Icon } from 'react-native-elements';
import moment from 'moment';
import PropTypes from 'prop-types';

import { TURQUOISE, WHITE } from '../../../assets/colors';
import { Line, TextLine, Button, Input } from '../common';
import StoreProvider from '../../store/StoreProvider';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.onExpand = this.onExpand.bind(this);
    this.onAddResult = this.onAddResult.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  state = {
    expanded: false,
    viewHeight: 0,
    analysis: '',
    disease: '',
    medication: '',
    results: [{ result: '' }]
  };

  onAddResult() {
    const { results } = this.state;
    this.setState({ results: [...results, { result: '' }] });
  }

  onChangeResultText(text, resultIndex) {
    const { results } = this.state;
    const newResults = results.map((item, index) => {
      if (index !== resultIndex) {
        return item;
      }

      return Object.assign({}, item, { result: text });
    });
    this.setState({ results: newResults });
  }

  onExpand() {
    const { lastItem, appointment } = this.props;
    if (lastItem && appointment.results.length < 1) {
      this.props.setLastItem(true);
    } else {
      this.props.setLastItem(false);
    }

    this.setState({ expanded: !this.state.expanded });
  }

  async onSave() {
    const { analysis, disease, medication, results } = this.state;
    const { _id } = this.props.appointment;
    const updatedAppointment = {
      analysis,
      disease,
      medication,
      results
    };
    this.props.setLoading(true);
    await StoreProvider.updateAppointment(_id, updatedAppointment);
    this.props.setLoading(false);
    this.props.setLastItem(false);
  }

  renderResults(results) {
    return results.map(result => {
      return (
        <View key={result._id}>
          <Line />
          <Text style={styles.text}>{result.result}</Text>
        </View>
      );
    });
  }

  renderResultsInputs() {
    const { results } = this.state;
    const { lastItem } = this.props;

    if (lastItem) {
      return results.map((item, index) => {
        return (
          <Input
            key={index}
            value={results[index].result}
            onChangeText={result => this.onChangeResultText(result, index)}
            underlineColorAndroid="transparent"
            onFocus={() => this.setState({ viewHeight: 200 })}
            onBlur={() => this.setState({ viewHeight: 0 })}
          />
        );
      });
    }

    return results.map((item, index) => {
      return (
        <Input
          key={index}
          value={results[index].result}
          onChangeText={result => this.onChangeResultText(result, index)}
          underlineColorAndroid="transparent"
        />
      );
    });
  }

  renderAnalysis(appointment) {
    const { header, text, expandIconContainer } = styles;

    const { expanded } = this.state;
    if (expanded) {
      return (
        <View>
          <Text style={header}>Serviciu</Text>
          <Line />
          <Text style={text}>{appointment.analysis} </Text>
          <Text style={header}>Diagnostic</Text>
          <Line />
          <Text style={text}>{appointment.disease}</Text>
          <Text style={header}>Tratament</Text>
          <Line />
          <Text style={text}>{appointment.medication}</Text>
          <Text style={header}>Rezultate</Text>
          {this.renderResults(appointment.results)}
          <View style={[expandIconContainer, { alignItems: 'flex-end' }]}>
            <Icon
              name="chevron-double-up"
              type="material-community"
              color={TURQUOISE}
              underlayColor="transparent"
              size={30}
              onPress={this.onExpand}
            />
          </View>
        </View>
      );
    }

    return null;
  }

  renderForm() {
    const { header, button, buttonsContainer, formLabel } = styles;

    const { expanded, viewHeight } = this.state;
    const { lastItem } = this.props;

    if (expanded && lastItem) {
      return (
        <View>
          <Text style={[header, formLabel]}>Serviciu</Text>
          <Input
            value={this.state.analysis}
            onChangeText={analysis => this.setState({ analysis })}
            underlineColorAndroid="transparent"
          />
          <Text style={[header, formLabel]}>Diagnostic</Text>
          <Input
            value={this.state.disease}
            onChangeText={disease => this.setState({ disease })}
            underlineColorAndroid="transparent"
            onFocus={() => this.setState({ viewHeight: 100 })}
            onBlur={() => this.setState({ viewHeight: 0 })}
          />
          <Text style={[header, formLabel]}>Tratament</Text>
          <Input
            value={this.state.medication}
            onChangeText={medication => this.setState({ medication })}
            underlineColorAndroid="transparent"
            onFocus={() => this.setState({ viewHeight: 150 })}
            onBlur={() => this.setState({ viewHeight: 0 })}
          />
          <Text style={[header, formLabel]}>Rezultate</Text>
          {this.renderResultsInputs()}
          <View style={buttonsContainer}>
            <Button
              title="ADAUGA UN REZULTAT"
              color={TURQUOISE}
              textColor={WHITE}
              textSize={12}
              buttonStyle={button}
              onPress={this.onAddResult}
            />
            <Button
              title="SALVEAZA"
              color={TURQUOISE}
              textColor={WHITE}
              textSize={12}
              buttonStyle={button}
              onPress={this.onSave}
            />
          </View>
          <View style={{ height: viewHeight }} />
        </View>
      );
    } else if (expanded && !lastItem) {
      return (
        <View>
          <Text style={[header, formLabel]}>Serviciu</Text>
          <Input
            value={this.state.analysis}
            onChangeText={analysis => this.setState({ analysis })}
            underlineColorAndroid="transparent"
          />
          <Text style={[header, formLabel]}>Diagnostic</Text>
          <Input
            value={this.state.disease}
            onChangeText={disease => this.setState({ disease })}
            underlineColorAndroid="transparent"
          />
          <Text style={[header, formLabel]}>Tratament</Text>
          <Input
            value={this.state.medication}
            onChangeText={medication => this.setState({ medication })}
            underlineColorAndroid="transparent"
          />
          <Text style={[header, formLabel]}>Rezultate</Text>
          {this.renderResultsInputs()}
          <View style={buttonsContainer}>
            <Button
              title="ADAUGA UN REZULTAT"
              color={TURQUOISE}
              textColor={WHITE}
              textSize={12}
              buttonStyle={button}
              onPress={this.onAddResult}
            />
            <Button
              title="SALVEAZA"
              color={TURQUOISE}
              textColor={WHITE}
              textSize={12}
              buttonStyle={button}
              onPress={this.onSave}
            />
          </View>
        </View>
      );
    }

    return null;
  }

  render() {
    const { appointment, type } = this.props;
    const { cardStyle, appointmentTextStyle, row, expandIconContainer } = styles;
    const { expanded } = this.state;

    const constructedDate = moment(
      `${appointment.date.day}-${appointment.date.month}-${appointment.date.year}`,
      'DD-MM-YYYY'
    )
      .format('DD-MM-YYYY')
      .toString();

    if (type === 'patient') {
      return (
        <Card key={appointment._id} containerStyle={cardStyle}>
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
            {appointment.results.length > 0 ? (
              <View style={expandIconContainer}>
                <Icon
                  name="chevron-double-down"
                  type="material-community"
                  color={expanded ? WHITE : TURQUOISE}
                  underlayColor="transparent"
                  size={30}
                  onPress={expanded ? null : this.onExpand}
                />
              </View>
            ) : null}
          </View>
          {this.renderAnalysis(appointment)}
        </Card>
      );
    } else if (type === 'doctor') {
      return (
        <Card key={appointment._id} containerStyle={cardStyle}>
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
                  {appointment.patient}
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
                  {appointment.weekDay}, {constructedDate}
                </TextLine>
              </View>
            </View>
            <View style={{ width: '40%', alignItems: 'center' }}>
              <View style={styles.rightRow}>
                <Icon
                  name="timer"
                  type="material-community"
                  size={22}
                  color={TURQUOISE}
                  containerStyle={styles.iconContainer}
                />
                <TextLine type="PTregular" size={14} color="#000">
                  {appointment.start}
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
                  {appointment.end}
                </TextLine>
              </View>
            </View>
            {appointment.results.length > 0 ? (
              <View style={[expandIconContainer, { justifyContent: 'center' }]}>
                <Icon
                  name="chevron-double-down"
                  type="material-community"
                  color={expanded ? WHITE : TURQUOISE}
                  underlayColor="transparent"
                  size={30}
                  onPress={expanded ? null : this.onExpand}
                />
              </View>
            ) : (
              <View style={[expandIconContainer, { justifyContent: 'center' }]}>
                <Icon
                  name="playlist-plus"
                  type="material-community"
                  color={expanded ? WHITE : TURQUOISE}
                  underlayColor="transparent"
                  size={30}
                  onPress={expanded ? null : this.onExpand}
                />
              </View>
            )}
          </View>
          {appointment.results.length > 0 ? this.renderAnalysis(appointment) : this.renderForm()}
        </Card>
      );
    }

    return null;
  }
}

HistoryDetail.propTypes = {
  type: PropTypes.string.isRequired,
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
    padding: 10,
    marginHorizontal: 10
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
  expandIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'PTregular',
    fontSize: 14,
    paddingVertical: 2.5
  },
  header: {
    fontFamily: 'PTbold',
    fontSize: 16,
    color: TURQUOISE,
    paddingBottom: 2.5,
    paddingTop: 5
  },
  formLabel: {
    padding: 0
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
    marginVertical: 2.5
  },
  appointmentContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: 2.5
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  button: {
    width: '48%',
    height: 40,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HistoryDetail;
