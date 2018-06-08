import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';

import { TextLine, Input, Button } from '../components/common';
import { WHITE, TURQUOISE, LIGHT_TURQUOISE } from '../../assets/colors';
import Logo from '../../assets/icon.png';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    gender: '',
    name: '',
    identityCard: '',
    telephone: '',
    country: '',
    city: '',
    street: '',
    postalCode: '',
    weight: '',
    height: ''
  };
  render() {
    return (
      <ScrollView style={styles.container}>
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
            placeholder="Sexul dumneavostra"
            width={SCREEN_WIDTH - 60}
            icon="gender-male-female"
            iconType="material-community"
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
            value={this.state.identityCard}
            onChangeText={identityCard => this.setState({ identityCard })}
            underlineColorAndroid="transparent"
            placeholder="CNP"
            width={SCREEN_WIDTH - 60}
            icon="id-card"
            iconType="font-awesome"
          />
          <Input
            value={this.state.telephone}
            onChangeText={telephone => this.setState({ telephone })}
            underlineColorAndroid="transparent"
            placeholder="Numar de telefon"
            width={SCREEN_WIDTH - 60}
            icon="phone"
            iconType="font-awesome"
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
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
            underlineColorAndroid="transparent"
            placeholder="Oras"
            width={SCREEN_WIDTH - 60}
            icon="location-city"
          />
          <Input
            value={this.state.street}
            onChangeText={street => this.setState({ street })}
            underlineColorAndroid="transparent"
            placeholder="Strada"
            width={SCREEN_WIDTH - 60}
            icon="address"
            iconType="entypo"
          />
          <Input
            value={this.state.postalCode}
            onChangeText={postalCode => this.setState({ postalCode })}
            underlineColorAndroid="transparent"
            placeholder="Cod postal"
            keyboardType="numeric"
            width={SCREEN_WIDTH - 60}
            icon="local-post-office"
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
            onPress={() => this.props.navigation.navigate('Home')}
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
