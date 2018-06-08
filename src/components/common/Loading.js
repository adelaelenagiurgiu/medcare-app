import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { WHITE, DARK_GREY } from '../../../assets/colors';

export const Loading = () => {
  return (
    <View style={styles.screenOverlay}>
      <View style={styles.container}>
        <ActivityIndicator color={WHITE} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 3
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 150,
    backgroundColor: DARK_GREY,
    borderRadius: 10,
    opacity: 0.8
  }
});
