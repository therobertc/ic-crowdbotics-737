import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GiftedChat, Time, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';

import { saveEmailAction, savePhoneNumberAction  } from '../../reducer/signup.js';
import { fetchResponseFromEmmaBot } from '../../../config/api.js';
import { _validateEmail, _showAlert } from '../../../config/util.js';
import { _signupAPI, _updateUserInfoAPI, _saveInvestment } from '../../../config/firebase.js';
import { metrics, colors, fonts } from '../../theme/index.js';


class EmmaBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_buttons: false,
      keyboardType: 'default',
      intent_name: ''
    };

    this._renderBubble = this._renderBubble.bind(this);
    this._renderInputToolbar = this._renderInputToolbar.bind(this);
    this._send = this._send.bind(this);
  }

  componentDidMount() {
    this._fetchResponse('hi');
  }

  _processResponse = (res) => {
    const payload = res.result.fulfillment.messages[0].payload;
    const intent_name = res.result.metadata.intentName;

    const message = {
      _id: Math.random() * 1000000,
      text: payload.messages.join('\n\n'),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'bot'
      },
      data: payload.data
    };
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message),
        intent_name: intent_name,
        has_buttons: payload.data.type == 'button',
      };
    });
  }

  _storeInfo = (msg) => {
    const { intent_name } = this.state;
    const intentName = intent_name.toLowerCase();

    console.log(intentName, msg);

    if (intentName.includes('emmastart')) {
      this.setState({
        experience: msg
      });
    } else if (intentName.includes('emmaexperience')) {
      this.setState({
        income: msg
      });
    } else if (intentName.includes('emmaincome')) {
      this.setState({
        amount: msg
      })
    } else if (intentName.includes('emmasave')) {
      this.setState({
        reason: msg
      }, () => {
        const save_info = {
          'experience': this.state.experience,
          'income': this.state.income,
          'amount': this.state.amount,
          'reason': msg
        }

        _saveInvestment(save_info)
        .then((res) => {
          console.log(res);
        }).catch((err) => {
          _showAlert(err);
        })
      })
      msg = 'For ' + msg;
    }

    return msg;
  }

  _fetchResponse = (msg) => {
    msg = this._storeInfo(msg);

    fetchResponseFromEmmaBot(msg)
    .then((res) => {
      this._processResponse(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  _send = (msg = []) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, msg)
      };
    });

    this._fetchResponse(msg[0].text);
  }

  send = (msg) => {
    if (msg == 'Investment profile') {
      this.props.navigation.navigate('Investment');
      return;
    }

    const message = {
      _id: Math.random() * 1000000,
      text: msg,
      createdAt: new Date(),
      user: {
        _id: 1
      }
    };
    let messages = [];
    messages.push(message);
    this._send(messages);
  }

  _renderBubble = (props) => {
    const { currentMessage } = props;
    const intentName = this.state.intent_name.toLowerCase();
    if (currentMessage.user._id != 2)
      {return <Bubble {...props}/>;}
    return (
      <View>
        <View style={styles.messageWrapper}>
          <Text>{currentMessage.text}</Text>
          <Time {...props} containerStyle={{left: {marginLeft: 0, marginTop: 5, marginBottom: 0}}}/>
        </View>

        {
          currentMessage.data.type == 'button' && <View style={{
            flex: 1,
            alignItems: 'center', 
            marginBottom: 30, 
            marginTop: 10,
            flexWrap: 'wrap',
            flexDirection: (intentName.includes('emmaname') || intentName.includes('emmareason')) ? 'column' : 'row',
          }}>
            {
              currentMessage.data.buttons.map((buttonText, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.buttonContainer} onPress={() => this.send(buttonText)}>
                    <Text>{buttonText}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        }
      </View>
    );
  }

  _renderInputToolbar = (props) => {
    return (
      <InputToolbar {...props} containerStyle={{borderTopWidth: 0}} primaryStyle={styles.footContainer}/>
    );
  }

  _renderSend = (props) => {
    return (
      <Send {...props} disabled={this.state.has_buttons} containerStyle={styles.sendButtonContainer}>
        <Icon.Ionicons
          name={'md-send'}
          color={colors.send}
          size={26}
        />
      </Send>
    );
  }

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Hi, I am Emma</Text>
        </View>

        <GiftedChat
          messages={this.state.messages}
          user={{
            _id: 1
          }}
          alwaysShowSend={true}
          textInputProps={{
            editable: !this.state.has_buttons,
            keyboardType: this.state.keyboardType,
            secureTextEntry: this.state.is_encrypt,
            multiline: false
          }}
          onSend={this._send}
          renderAvatar={null}
          renderBubble={this._renderBubble}
          renderSend={this._renderSend}
          renderInputToolbar={this._renderInputToolbar}
        />
      </View>
    );
  }
}

const stateToProps = state => ({
  email: state.signupReducer.email,
});

const dispatchToProps = dispatch => ({
  saveEmailAction: bindActionCreators(saveEmailAction, dispatch),
  savePhoneNumberAction: bindActionCreators(savePhoneNumberAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(EmmaBot);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerContainer: {
    marginTop: 25,
    height: 40,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'avenir-black',
    color: colors.secondary
  },
  footContainer: {
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    alignItems: 'center'
  },
  chatInput: {
    flex: 1,
    marginRight: 10,
  },
  messageWrapper: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#F7F7F7',
    alignItems: 'flex-start'
  },
  buttonContainer: {
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(217, 226, 233, 0.5)',
  },
  sendButtonContainer: {
    justifyContent: 'center',
    marginRight: 10
  }
});
