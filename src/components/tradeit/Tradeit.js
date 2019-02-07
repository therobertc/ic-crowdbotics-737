import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthSession, Linking, WebBrowser, Constants } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseValue } from './TradeitContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';
import { tradeitConfig } from '../../../config/tradeit.js';


class TradeIt extends Component {

  state = {
    brokerList: [],
    oAuthURL: null,
    oAuthResponse: null,
    result: null
  }

  componentDidMount = () => {
    this.getBrokerList();
  }

  getBrokerList = () => {
    return (
      fetch(`${tradeitConfig.baseUrl}preference/getBrokerList`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: tradeitConfig.apiKey
        }),
      })
      .then(res => res.json())
      .then(data => this.setState({ brokerList: data.brokerList }))
      .catch(err => console.log(err))
    );
  }

  getOAuthLoginPopupUrlForWebApp = async (item) => {
    fetch(`${tradeitConfig.baseUrl}user/getOAuthLoginPopupUrlForWebApp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: tradeitConfig.apiKey,
        broker: item.shortName
      }),
    })
    .then(res => res.json())
    .then(data => this.setState({ oAuthURL: data.oAuthURL }, () => {
      this.openOauthPopupAsync(data.oAuthURL);
    }))
    .catch(err => console.log(err));
  };

  openOauthPopupAsync = async (oAuthURL) => {
    Linking.addEventListener('url', (res) => console.log(res));

    // const redirectUrl = AuthSession.getRedirectUrl();
    // console.log(redirectUrl);
    // const result = await AuthSession.startAsync({
    //   authUrl:
    //     `${oAuthURL}` +
    //     `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    // });
    // this.setState({ oAuthResponse: result });


    const redirectUrl = Linking.makeUrl();
    console.log(redirectUrl);
    const redirectUrl2 = Constants.linkingUrl;
    console.log(redirectUrl2);
    const result = await WebBrowser.openAuthSessionAsync(`${oAuthURL}`, redirectUrl );
    this.setState({ result });
  };

  renderBrokerList = (item) => (
    <TouchableOpacity key={item.longName} onPress={() => this.getOAuthLoginPopupUrlForWebApp(item)}>
      <Text>{item.longName}</Text>
      <Text>{item.shortName}</Text>
      <Text>{item.userName}</Text>
    </TouchableOpacity>
  )

  render() {
    console.log(this.state.brokerList);
    console.log(this.state.oAuthURL);
    console.log(this.state.oAuthResponse);
    console.log(this.state.result);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Test</Text>
        {
          this.state.brokerList.map(this.renderBrokerList)
        }
      </View>
    );
  }
}

const stateToProps = state => ({
  value: state.homeReducer.value,
});

const dispatchToProps = dispatch => ({
  increaseValue: bindActionCreators(increaseValue, dispatch),
});

// export default connect(stateToProps, dispatchToProps)(TradeIt);
export default TradeIt;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: fonts.size.medium
  },
});
