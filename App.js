import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import AppStack from './src/navigation';
import StoreProvider from './src/store/StoreProvider';
import { store, persistor } from './src/store';

export default class App extends Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={() => StoreProvider.loadAssets()}
            onFinish={() => this.setState({ isReady: true })}
          />
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppStack />
        </PersistGate>
      </Provider>
    );
  }
}

// Provider tag takes our redux state of the app and passes it to our different components
