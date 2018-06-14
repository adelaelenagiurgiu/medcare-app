import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Header, Avatar } from 'react-native-elements';

import Error from '../../components/Error';
import { persistor } from '../../store';
import { logout, addError } from '../../actions';
import { Button, TextLine } from '../../components/common';
import { TURQUOISE, WHITE, GREY } from '../../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Account extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();
    persistor.purge();
    AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  }

  render() {
    const { doctor } = this.props;
    return (
      <View style={styles.container}>
        <Error />
        <Header
          backgroundColor={TURQUOISE}
          centerComponent={{ text: 'Profilul meu', style: { color: WHITE } }}
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <View style={styles.contentContainer}>
          <TextLine type="semi-bold" size={16} color={TURQUOISE} style={{ marginBottom: 15 }}>
            {this.props.doctor.doctorName}
          </TextLine>
          <Avatar width={130} height={130} rounded source={{ uri: doctor.doctorImage }} />
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
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    doctor: state.doctor.doctor
  };
};

export default connect(
  mapStateToProps,
  { logout, addError }
)(Account);
