import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Error from '../components/Error';
import { addError } from '../actions';
import { register } from '../actions/auth';
import { TextLine, Input, Button, Loading } from '../components/common';
import { WHITE, TURQUOISE, LIGHT_TURQUOISE } from '../../assets/colors';
import Logo from '../../assets/icon.png';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSignUp = this.onSignUp.bind(this);
  }

  state = {
    email: '',
    password: '',
    gender: '',
    age: '',
    name: '',
    cnp: '',
    phone: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    weight: '',
    height: '',
    loading: false
  };

  static getDerivedStateFromProps(props) {
    if (props.error.length > 0) {
      return {
        loading: false
      };
    }

    if (props.user.token && props.user.role === 'patient') {
      props.navigation.navigate('Home');
      return {
        loading: false
      };
    }

    return null;
  }

  onSignUp() {
    const {
      email,
      password,
      gender,
      age,
      name,
      cnp,
      phone,
      country,
      city,
      street,
      streetNumber,
      postalCode,
      weight,
      height
    } = this.state;

    if (
      email.length === 0 ||
      password.length === 0 ||
      gender.length === 0 ||
      name.length === 0 ||
      cnp.length === 0 ||
      age.length === 0 ||
      phone.length === 0 ||
      country.length === 0 ||
      city.length === 0 ||
      street.length === 0 ||
      streetNumber.length === 0 ||
      postalCode.length === 0 ||
      weight.length === 0 ||
      height.length === 0
    ) {
      this.props.addError('Campurile nu pot fi goale');
    } else {
      const user = {
        email,
        password
      };

      const patient = {
        email,
        gender,
        name,
        cnp,
        address: {
          streetName: street,
          streetNumber,
          postalCode,
          city,
          country
        },
        age,
        phone,
        weight,
        height
      };

      this.setState({ loading: true });
      this.props.register(user, patient);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Error />
        {this.state.loading ? <Loading /> : null}
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
          <Input
            value={this.state.gender}
            onChangeText={gender => this.setState({ gender })}
            underlineColorAndroid="transparent"
            placeholder="Masculin/Feminin"
            width={SCREEN_WIDTH - 60}
            icon="gender-male-female"
            iconType="material-community"
          />
          <Input
            value={this.state.age}
            onChangeText={age => this.setState({ age })}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="Varsta"
            width={SCREEN_WIDTH - 60}
            icon="cake"
          />
          <Input
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            underlineColorAndroid="transparent"
            placeholder="Numele complet"
            width={SCREEN_WIDTH - 60}
            icon="user"
            iconType="font-awesome"
          />
          <Input
            value={this.state.cnp}
            onChangeText={cnp => this.setState({ cnp })}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            placeholder="CNP"
            width={SCREEN_WIDTH - 60}
            icon="id-card"
            iconType="font-awesome"
          />
          <View
            style={{
              flexDirection: 'row',
              width: SCREEN_WIDTH - 60,
              justifyContent: 'space-between'
            }}
          >
            <Input
              value={this.state.street}
              onChangeText={street => this.setState({ street })}
              underlineColorAndroid="transparent"
              placeholder="Strada"
              width={SCREEN_WIDTH - 130}
              icon="address"
              iconType="entypo"
            />
            <Input
              value={this.state.streetNumber}
              onChangeText={streetNumber => this.setState({ streetNumber })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder="Nr"
              width={60}
            />
          </View>
          <Input
            value={this.state.postalCode}
            onChangeText={postalCode => this.setState({ postalCode })}
            underlineColorAndroid="transparent"
            placeholder="Cod postal"
            width={SCREEN_WIDTH - 60}
            icon="local-post-office"
          />
          <Input
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            underlineColorAndroid="transparent"
            placeholder="Numar de telefon"
            keyboardType="numeric"
            width={SCREEN_WIDTH - 60}
            icon="phone"
            iconType="font-awesome"
          />
          <Input
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
            underlineColorAndroid="transparent"
            placeholder="Oras"
            width={SCREEN_WIDTH - 60}
            icon="location-city"
          />
          <Input
            value={this.state.country}
            onChangeText={country => this.setState({ country })}
            underlineColorAndroid="transparent"
            placeholder="Tara"
            width={SCREEN_WIDTH - 60}
            icon="flag"
            iconType="font-awesome"
          />
          <Input
            value={this.state.weight}
            onChangeText={weight => this.setState({ weight })}
            underlineColorAndroid="transparent"
            placeholder="Greutate (kg)"
            keyboardType="numeric"
            width={SCREEN_WIDTH - 60}
            icon="weight-kilogram"
            iconType="material-community"
          />
          <Input
            value={this.state.height}
            onChangeText={height => this.setState({ height })}
            underlineColorAndroid="transparent"
            placeholder="Inaltime (cm)"
            keyboardType="numeric"
            width={SCREEN_WIDTH - 60}
            icon="human-male"
            iconType="material-community"
          />
          <Button
            title="CREEAZA CONT"
            textColor={WHITE}
            buttonStyle={styles.button}
            onPress={this.onSignUp}
          />
        </View>
        <View style={{ height: 200 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: 20
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
    alignItems: 'center',
    backgroundColor: LIGHT_TURQUOISE
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.errors.error,
    patient: state.patient.patient
  };
};

export default connect(
  mapStateToProps,
  { addError, register }
)(SignUp);
