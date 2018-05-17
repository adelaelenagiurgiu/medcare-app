import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { clearUser } from '../actions';
import { Button } from '../components/common/Button';
import { Header } from '../components/common/Header';

class Account extends Component {
  onLogoutPress() {
    this.props.clearUser();
    // persistor.purge();
    // const keys = ['facebook_token', 'persist:root'];

    // eslint-disable-next-line
    AsyncStorage.multiRemove(keys, error => {
      if (error) {
        return (
          <Text type="regular" color="#fff" size={20}>
            Error trying to log you out!
          </Text>
        );
      }
      // this.props.navigation.navigate('Welcome');
    });
  }

  renderAccountData() {
    if (this.props.user) {
      return (
        <Text type="regular" color="#fff" size={20}>
          Hello {this.props.user.first_name} {this.props.user.last_name}!
        </Text>
      );
    }

    return (
      <Text type="regular" color="#fff" size={20}>
        Hello!
      </Text>
    );
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <Header title="Account" />
        {this.renderAccountData()}
        <Button title="LOGOUT" textColor="#d1e1f7" onPress={this.onLogoutPress.bind(this)} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { clearUser })(Account);
