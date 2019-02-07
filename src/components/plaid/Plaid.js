import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlaidAuthenticator from './PlaidAuthenticator.js';
import { plaidConfig } from '../../../config/plaid.js';

export default class Plaid extends Component {
  state = {
    data: {},
    status: 'LOGIN_BUTTON'
  };

  render() {
    switch (this.state.status) {
      case 'CONNECTED':
        return this.renderDetails();
      case 'LOGIN_BUTTON':
      case 'EXIT':
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderButton = () => {
    return <View style={styles.container}>
      <TouchableOpacity onPress={() => this.setState({status: ''})}>
        <Text style={styles.paragraph}>Login with Plaid</Text>
      </TouchableOpacity>
    </View>;
  }

  onLoadStart = props => {
    console.log('onLoadStart', props);
  };

  onLoad = props => {
    console.log('onLoad', props);
  };

  onLoadEnd = props => {
    console.log('onLoadEnd', props);
  };

  renderLogin() {
    // console.log(plaidConfig);
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey={plaidConfig.publicKey}
        env={plaidConfig.env}
        product={plaidConfig.products}
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    );
  }

  renderDetails() {
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Institution</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.name}
        </Text>
        <Text style={styles.paragraph}>Institution ID</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.institution_id}
        </Text>
        <Text style={styles.paragraph}>Token</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.public_token}
        </Text>
      </View>
    );
  }

  onMessage = data => {
    // console.log(data)
    /*
      Response example for success
      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */

    this.setState({ data, status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
});





// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { AuthSession, Linking, WebBrowser, Constants } from 'expo';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { increaseValue } from './PlaidContainer';
// import { metrics, colors, fonts } from '../../theme/index.js';
// import * as firebase from 'firebase';
// import { plaidConfig } from '../../../config/plaid.js';
// import PlaidAuthenticator from './PlaidAuthenticator.js';
//
//
// class Plaid extends Component {
//
//   state = {
//     data: null
//   }
//
//   onMessage = (data) => {
//     this.setState({ data: data });
//   }
//
//   render() {
//     console.log(this.state.data);
//
//     // console.log(plaidConfig);
//
//     return (
//       <PlaidAuthenticator
//         useWebKit
//         onMessage={this.onMessage}
//         publicKey={plaidConfig.publicKey}
//         env={plaidConfig.env}
//         product={plaidConfig.products}
//         clientName="Emma app"
//       />
//     );
//   }
// }
//
// const stateToProps = state => ({
//   value: state.homeReducer.value,
// });
//
// const dispatchToProps = dispatch => ({
//   increaseValue: bindActionCreators(increaseValue, dispatch),
// });
//
// // export default connect(stateToProps, dispatchToProps)(Plaid);
// export default Plaid;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   text: {
//     fontSize: fonts.size.medium
//   },
// });
