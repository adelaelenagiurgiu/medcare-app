import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import { ArrowBack } from '../components/common';
import { TURQUOISE, WHITE, GREY } from '../../assets/colors';

export default class Calendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Calendar', style: { color: WHITE } }}
        />

        <View style={styles.textstyle}>
          <Text>Calendar</Text>
        </View>
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
