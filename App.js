import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Provider } from 'react-redux';
import { Asset, SplashScreen } from 'expo';
import store from './src/store/store.js';
import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import Drawer from './src/components/drawer/Drawer.js';

class App extends Component {

  state = {
    isReady: false,
  };

  componentDidMount() {
    SplashScreen.preventAutoHide();
    firebase.initializeApp(firebaseConfig);
  }

  cacheSplashResourcesAsync = async () => {
    const img = require('./assets/images/splash.png');
    return Asset.fromModule(img).downloadAsync();
  }

  cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('./assets/images/app.png'),
      require('./assets/images/loading.png'),
      require('./assets/images/intro_phone.png'),
      require('./assets/images/logo.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isReady: true });
  }

  render(){
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/images/splash.png')}
            onLoad={this.cacheResourcesAsync}
          />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <Drawer />
      </Provider>
    );
  }
}

export default App;
