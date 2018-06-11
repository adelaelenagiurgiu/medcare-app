import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import StoreProvider from '../store/StoreProvider';
import Error from '../components/Error';
import { Button, TextLine, Input, Loading } from '../components/common';
import { addError } from '../actions';
import { login } from '../actions/auth';
import { WHITE, TURQUOISE, LIGHT_TURQUOISE } from '../../assets/colors';
import Logo from '../../assets/icon.png';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  state = {
    email: '',
    password: '',
    loading: false
  };

  static getDerivedStateFromProps(props) {
    const { user, patient } = props;
    if (user.token && user.role === 'patient') {
      StoreProvider.getAppointmentsForPatient(patient.name);
      //StoreProvider.getPatientHistory(patient.name);
      props.navigation.navigate('Home');
      return {
        loading: false
      };
    }

    if (props.error !== '') {
      return {
        loading: false
      };
    }

    return null;
  }

  onLogin() {
    const { email, password } = this.state;
    if (email.length === 0 || password.length === 0) {
      this.props.addError('Campurile nu pot fi goale');
    } else {
      const user = {
        email,
        password
      };
      this.props.login(user);
      this.setState({ loading: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <Error />
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
        <View style={styles.containerStyle}>
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            underlineColorAndroid="transparent"
            placeholder="Email"
            keyboardType="email-address"
            width={SCREEN_WIDTH - 60}
            icon="email"
            iconType="zocial"
          />
          <Input
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            underlineColorAndroid="transparent"
            placeholder="**********"
            secureTextEntry
            width={SCREEN_WIDTH - 60}
            icon="lock"
            iconType="font-awesome"
          />
          <Button
            title="INTRA IN CONT"
            textColor={WHITE}
            buttonStyle={styles.button}
            onPress={this.onLogin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingBottom: 15
  },
  containerStyle: {
    flex: 2,
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 20
  },
  logoStyle: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 60,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    patient: state.patient.patient,
    error: state.errors.error
  };
};

export default connect(
  mapStateToProps,
  { addError, login }
)(Login);
