import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseValue } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends Component {

  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'We are here to help you... Feel free to ask for any questions or queries!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Welcome to Emma Ai',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: 'Hello John',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const stateToProps = state => ({
  value: state.homeReducer.value,
});

const dispatchToProps = dispatch => ({
  increaseValue: bindActionCreators(increaseValue, dispatch),
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
