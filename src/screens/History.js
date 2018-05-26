import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import { ArrowBack } from '../components/common';
import { TURQUOISE, WHITE, GREY } from '../../assets/colors';

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Istoric', style: { color: WHITE } }}
        />
        <View style={styles.textstyle}>
          <Text>Istoric</Text>
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
