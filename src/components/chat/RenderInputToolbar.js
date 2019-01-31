import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { increaseValue } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import { InputToolbar } from 'react-native-gifted-chat';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';


const RenderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{ borderTopWidth: 0 }}
      primaryStyle={styles.footContainer}
    />
  );
};

export default RenderInputToolbar;

const styles = StyleSheet.create({
  footContainer: {
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    alignItems: 'center',
    margin: metrics.large,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    backgroundColor : colors.white
  },
});
