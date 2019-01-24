import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { saveEmailAction, savePhoneNumberAction  } from '../../reducer/signup.js';
import { metrics, colors, fonts } from '../../theme/index.js';



class SignupChatbot extends Component {

  state = {
    user_msg: '',
    termsAccepted: false,
    textinput_height: 25
  }

  _handleText = (event) => {
    const { contentSize, text} = event.nativeEvent;
    this.setState({
      user_msg: text,
      textinput_height: contentSize.height > 100 ? 100 : contentSize.height
    })
  }

  render(){
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Hi I am Emma</Text>
        </View>

        {/* <GiftedChat
          messages={this.state.messages}
          onSend={this._send}
          renderBubble={this.renderBubble}
        /> */}

        <View style={styles.footContainer}>
          <TextInput
            multiline
            placeholder={'Write something here'}
            value={this.state.user_msg}
            onContentSizeChange={this._handleText.bind(this)}
            style={[styles.chatInput, {height: this.state.textinput_height}]}
          />
          <TouchableOpacity>
            <Icon.Ionicons
              name={'md-send'}
              color={colors.send}
              size={26}
            />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 10,
  },
  chatInput: {
    flex: 1,
    marginRight: 10,
  }
});
