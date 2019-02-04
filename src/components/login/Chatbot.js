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
import { fetchResponseFromAuthBot } from '../../../config/api.js';
import { _validateEmail, _showAlert } from '../../../config/util.js';
import { _loginAPI, _sendResetPasswordEmail } from '../../../config/firebase.js';
import { metrics, colors, fonts } from '../../theme/index.js';


class LoginChatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_buttons: false,
      intent_name: '',
      keyboardType: 'default',
      is_encrypt: false
    }

    this._renderBubble = this._renderBubble.bind(this);
    this._renderInputToolbar = this._renderInputToolbar.bind(this);
    this._send = this._send.bind(this);
  } 

  componentDidMount() {
    this._fetchResponse('I already have an account')
  }

  _processResponse = (res) => {
    const payload = res.result.fulfillment.messages[0].payload;
    const intent_name = res.result.metadata.intentName;

    if (intent_name.toLowerCase().includes('loginpassword')) {
      _loginAPI(this.state.email.trim().toLowerCase(), this.state.password)
      .then((res) => {
        console.log(res);
        if (res.includes('verify')) {
          _showAlert(res);
        } else {
          this.props.navigation.navigate('Tabs')
        }
      }).catch((err) => {
        _showAlert(err)
      });
      
    } else if (intent_name.toLowerCase().includes('forgotpassword')) {
      _sendResetPasswordEmail(this.state.email.trim().toLowerCase())
    }

    const message = {
      _id: Math.random() * 1000000,
      text: payload.messages.join('\n\n'),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'bot'
      },
      data: payload.data
    }
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message),
        intent_name: intent_name,
        has_buttons: payload.data.type == 'button',
        is_encrypt: intent_name.toLowerCase().includes('loginemail')
      };
    });
  }

  _storeInfo = (msg) => {
    const { intent_name } = this.state;
    const intentName = intent_name.toLowerCase();
    if (intentName == 'loginintent') {
      this.setState({
        email: msg
      })
      msg = 'Login Email is ' + msg;
    } else if (intentName.includes('loginemail') && !msg.includes('Forgot password?')) {
      this.setState({
        password: msg
      })
      msg = 'Login Password is ' + msg;
    }
    
    return msg
  }

  _fetchResponse = (msg) => {
    msg = this._storeInfo(msg)

    fetchResponseFromAuthBot(msg)
    .then((res) => {
      this._processResponse(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  _handleText = (event) => {
    const { contentSize, text} = event.nativeEvent;
    this.setState({
      user_msg: text,
      textinput_height: contentSize.height > 100 ? 100 : contentSize.height
    })
  }

  _send = (msg = []) => {
    if (msg[0].text.trim() == '' || msg[0].text == undefined) {
      _showAlert('You can\'t put the empty string as answer');
      return
    }

    if (this.state.intent_name.toLowerCase() == 'loginintent' && _validateEmail(msg[0].text) == false) {
      _showAlert('Please enter the valid email address');
      return
    }

    if(!this.state.intent_name.toLowerCase().includes('loginemail') || 
    (this.state.intent_name.toLowerCase().includes('loginemail') && msg[0].text.trim().includes('Forgot password'))) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, msg)
        };
      });
    }

    this._fetchResponse(msg[0].text)
  }

  send = (msg) => {
    const message = {
      _id: Math.random() * 1000000,
      text: msg,
      createdAt: new Date(),
      user: {
        _id: 1
      }
    }
    var messages = [];
    messages.push(message);
    this._send(messages);
  }

  _renderBubble = (props) => {
    const { currentMessage } = props;
    if (currentMessage.user._id != 2)
      return <Bubble {...props}/>
    return (
      <View>
        <View style={styles.messageWrapper}>
          <Text>{currentMessage.text}</Text>
          <Time {...props} containerStyle={{left: {marginLeft: 0, marginTop: 5, marginBottom: 0}}}/>
        </View>

        {
          (currentMessage.data.buttons && currentMessage.data.buttons.length > 0) && <View style={{alignItems: 'center', marginBottom: 30, marginTop: 10}}>
            {
              currentMessage.data.buttons.map((buttonText, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.buttonContainer} onPress={() => this.send(buttonText)}>
                    <Text>{buttonText}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        }
      </View>
    )
  }

  _renderInputToolbar = (props) => {
    return (
      <InputToolbar {...props} containerStyle={{borderTopWidth: 0}} primaryStyle={styles.footContainer}/>
    )
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
    )
  }

  render(){
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

export default connect(stateToProps, dispatchToProps)(LoginChatbot);


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
    height: 45,
    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
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
