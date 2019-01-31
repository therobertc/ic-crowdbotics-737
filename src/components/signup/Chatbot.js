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
import { fetchResponseFromDialogflow } from '../../../config/api.js';
import { _validateEmail, _showAlert } from '../../../config/util.js';
import { _signupAPI, _updateUserInfoAPI } from '../../../config/firebase.js';
import { metrics, colors, fonts } from '../../theme/index.js';


class SignupChatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_buttons: false,
      intent_name: '',
      keyboardType: 'default',
      is_encrypt: false
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
        is_encrypt: intent_name.toLowerCase().includes('signupemail')
      };
    });
  }

  _storeInfo = (msg) => {
    const { intent_name } = this.state;
    const intentName = intent_name.toLowerCase();

    if (intentName == 'signupintent') {
      this.setState({
        name: msg
      });
    } else if (intentName.includes('signupname')) {
      this.setState({
        email: msg
      });
      msg = 'Signup Email is ' + msg;
    } else if (intentName.includes('signupemail')) {
      this.setState({
        password: msg
      });
      msg = 'Signup Password is ' + msg;
    } else if (intentName.includes('signupfurther')) {
      this.setState({
        zipcode: msg
      })
    } else if (intentName.includes('signupzipcode')) {
      this.setState({
        status: msg
      })
    } else if (intentName.includes('signupstatus')) {
      this.setState({
        job: msg
      })
      msg = 'My job is ' + msg;
    } else if (intentName.includes('signupjob')) {
      this.setState({
        salary: msg
      })
    } else if (intentName.includes('signupsalary')) {
      this.setState({
        net: msg
      })
    }

    return msg;
  }

  _fetchResponse = (msg) => {
    msg = this._storeInfo(msg);

    const intentName = this.state.intent_name.toLowerCase();

    if (intentName.includes('signuppassword')) {
      const user_info = {
        name: this.state.name.trim() || '',
        email: this.state.email.trim().toLowerCase() || '',
        password: this.state.password
      }

      _signupAPI(user_info)
      .then((res) => {
          console.log(res);
      }).catch((err) => {
          _showAlert(err);
          return;
      })
    } else if (intentName.includes('signupnet')) {
      const user_info = {
        zipcode: this.state.zipcode,
        status: this.state.status,
        job: this.state.job,
        salary: this.state.salary,
        net: this.state.net
      }

      _updateUserInfoAPI(user_info)
      .then((res) => {
          console.log(res);
      }).catch((err) => {
          _showAlert(err);
          return;
      })
    }

    fetchResponseFromDialogflow(msg)
    .then((res) => {
      this._processResponse(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  _handleText = (event) => {
    const { contentSize, text} = event.nativeEvent;
    this.setState({
      user_msg: text,
      textinput_height: contentSize.height > 100 ? 100 : contentSize.height
    });
  }

  _send = (msg = []) => {
    if (msg[0].text.trim() == 'I already have an account') {
      this.props.navigation.navigate('LoginBot');
      return;
    }

    if (msg[0].text.trim() == 'Skip for now') {
      this.props.navigation.navigate('LoginBot');
      return;
    }

    if (msg[0].text.trim().includes('Yes, log me in')) {
      this.props.navigation.navigate('LoginBot');
      return;
    }

    if (msg[0].text.trim() == '' || msg[0].text == undefined) {
      _showAlert('You can\'t put the empty string as answer');
      return;
    }

    if (this.state.intent_name.toLowerCase().includes('signupname') && _validateEmail(msg[0].text) == false) {
      _showAlert('Please enter the valid email address');
      return;
    }

    if (!this.state.intent_name.toLowerCase().includes('signupemail')) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, msg)
        };
      });
    }

    this._fetchResponse(msg[0].text);
  }

  send = (msg) => {
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
            flexDirection: (intentName.includes('welcome') || intentName.includes('signuppassword') || intentName.includes('signupsalary')) ? 'column' : 'row',
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

export default connect(stateToProps, dispatchToProps)(SignupChatbot);


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
