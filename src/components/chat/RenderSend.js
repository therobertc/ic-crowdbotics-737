import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { increaseValue } from './ChatContainer';
import { Icon } from 'expo';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Send } from 'react-native-gifted-chat';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';


const RenderSend = props => {
  return (
    <Send {...props} containerStyle={styles.sendButtonContainer}>
      <Icon.Ionicons
        name={'md-send'}
        color={colors.send}
        size={26}
      />
    </Send>
  );
};

export default RenderSend;

const styles = StyleSheet.create({
  sendButtonContainer: {
    justifyContent: 'center',
    marginRight: 10
  }
});
