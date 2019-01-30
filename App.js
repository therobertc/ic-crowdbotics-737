import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';

import store from './src/store/store.js';
import AppNavigator from './src/components/navigator/Navigator.js';

class App extends Component {

  state = {
    isReady: false,
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/app.png'),
        require('./assets/images/loading.png'),
        require('./assets/images/intro_phone.png'),
        require('./assets/images/logo.png'),
        require('./assets/images/background.png')
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,

        'avenir-black': require('./assets/fonts/AvenirLTStd-Black.otf'),
        'avenir-book': require('./assets/fonts/AvenirLTStd-Book.otf'),
        'avenir-roman': require('./assets/fonts/AvenirLTStd-Roman.otf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    this.setState({ isReady: true });
  };

  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        {
          Platform.OS === 'ios' && <StatusBar barStyle="default" />
        }
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

export default App;
