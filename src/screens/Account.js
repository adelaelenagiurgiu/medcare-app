import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';

import Error from '../components/Error';
import { clearUser, clearPatientAppointments, addError } from '../actions';
import { ArrowBack, Button } from '../components/common';
import { TURQUOISE, WHITE, GREY } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Account extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.clearUser();
    this.props.clearPatientAppointments();
    const keys = ['token', 'persist:root'];
    // eslint-disable-next-line
    AsyncStorage.multiRemove(keys, error => {
      if (error) {
        this.props.addError('Nu v-am putut deconecta');
      }
      this.props.navigation.navigate('Welcome');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Error />
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: 'Profilul meu', style: { color: WHITE } }}
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <View style={styles.contentContainer}>
          <Button
            title="Deconecteaza-te"
            textColor={WHITE}
            buttonStyle={styles.button}
            onPress={this.onLogout}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY,
    paddingTop: Constants.statusBarHeight
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 60,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center'
  }
});

export default connect(
  null,
  { clearUser, clearPatientAppointments, addError }
)(Account);
