import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { Provider } from 'react-redux';

import AppStack from './src/navigation';
import StoreProvider from './src/store/StoreProvider';
import { store } from './src/store';

export default class App extends Component {
  state = {
    isReady: false
  };

  async loadAssetsAsync() {
    await StoreProvider.getSections();
    await StoreProvider.getAppointmentsForPatient('Vasile%20Baciu');

    await Font.loadAsync({
      enrBold: require('./assets/fonts/Enriqueta-Bold.ttf'),
      enrRegular: require('./assets/fonts/Enriqueta-Regular.ttf'),
      light: require('./assets/fonts/open-sans.light.ttf'),
      'semi-bold': require('./assets/fonts/open-sans.semibold.ttf'),
      regular: require('./assets/fonts/open-sans.regular.ttf'),
      PTregular: require('./assets/fonts/PT_Serif-Web-Regular.ttf'),
      PTbold: require('./assets/fonts/PT_Serif-Web-Bold.ttf')
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}

// Provider tag take our redux state of the app and passed to our different components
