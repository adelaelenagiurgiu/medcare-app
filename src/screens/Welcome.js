import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import { TURQUOISE, LIGHT_TURQUOISE, WHITE } from '../../assets/colors';
import Logo from '../../assets/icon.png';
import { TextLine, Button } from '../components/common';

// const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logoStyle} />
          <View style={styles.textContainer}>
            <TextLine type="PTbold" color={TURQUOISE} size={24}>
              Med
            </TextLine>
            <TextLine type="PTregular" color={LIGHT_TURQUOISE} size={24}>
              Care
            </TextLine>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Sunt doctor"
            textColor={TURQUOISE}
            icon="user-md"
            iconType="font-awesome"
            iconColor={TURQUOISE}
            buttonStyle={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Doctor')}
          />
          <Button
            title="Sunt pacient"
            textColor={WHITE}
            icon="user"
            iconType="font-awesome"
            iconColor={WHITE}
            buttonStyle={[styles.buttonStyle, { backgroundColor: LIGHT_TURQUOISE, borderWidth: 0 }]}
            onPress={() => this.props.navigation.navigate('Patient')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15
  },
  logoStyle: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    height: 60,
    width: SCREEN_WIDTH - 50,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: LIGHT_TURQUOISE
  }
});
