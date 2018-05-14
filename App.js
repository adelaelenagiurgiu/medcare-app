import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/common/Header';
import SectionList from './src/components/sections/SectionList';

// eslint-disable-next-line
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Changes" />
        <SectionList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e1f7'
  }
});
