import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SectionList from '../components/sections/SectionList';
import { GREY } from '../../assets/colors';

export default class Sections extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: GREY
  }
});
