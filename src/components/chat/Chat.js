import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveMessageAction, saveImageAction } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import RenderBubble from './RenderBubble.js';
import RenderInputToolbar from './RenderInputToolbar.js';
import RenderSend from './RenderSend.js';
import RenderCustomView from './RenderCustomView.js';
import moment from 'moment-timezone';


class Chat extends Component {

  // Send new message and store to redux
  _sendMessage = (messages) => {
    const newMessage = {
      ...messages[0],
      dateCreated: moment().format(),
      createdAt: null,
    };
    this.props.saveMessageAction(newMessage);
  }

  _renderBubble = props => <RenderBubble {...props}/>

  _renderInputToolbar = props => <RenderInputToolbar {...props}/>

  _renderSend = props => <RenderSend {...props}/>

  _renderCustomView = props => <RenderCustomView {...props} />




  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Chat</Text>
        </View>
        <GiftedChat
          messages={this.props.messages}
          onSend={messages => this._sendMessage(messages)}
          renderAvatar={null}
          alwaysShowSend={true}
          showUserAvatar={false}
          user={{
            _id: 1,
          }}
          textInputProps={{
            multiline: false
          }}
          renderBubble={this._renderBubble}
          renderInputToolbar={this._renderInputToolbar}
          renderSend={this._renderSend}
          renderCustomView={this._renderCustomView}
        />
      </View>
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
    flex: 1,
  },
  headerContainer: {
    marginTop: 45,
    marginLeft: 20,
    height: 40,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'avenir-black',
    color: colors.primary
  },
});
