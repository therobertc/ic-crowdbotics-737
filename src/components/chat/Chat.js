import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveMessageAction, saveImageAction } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import RenderBubble from './Bubble.js';
import moment from 'moment-timezone';


class Chat extends Component {

  // Send new message and store to redux
  sendMessage = (messages) => {
    const newMessage = {
      ...messages[0],
      dateCreated: moment().format(),
      createdAt: null,
    };
    this.props.saveMessageAction(newMessage);
  }

  renderBubble = props => <RenderBubble {...props}/>

  render() {
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={messages => this.sendMessage(messages)}
        renderAvatar={null}
        showUserAvatar={false}
        user={{
          _id: 1,
        }}
        renderBubble={this.renderBubble}
      />
    );
  }
}

const stateToProps = state => ({
  messages: state.chatReducer.messages,
});

const dispatchToProps = dispatch => ({
  saveMessageAction: bindActionCreators(saveMessageAction, dispatch),
  saveImageAction: bindActionCreators(saveImageAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: fonts.size.medium
  },
});
