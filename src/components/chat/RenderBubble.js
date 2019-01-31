import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { increaseValue } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Bubble } from 'react-native-gifted-chat';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';


const RenderBubble = props => {
  return (
    <View style={styles.container}>
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: colors.white,
            fontSize: fonts.size.medium,
            fontFamily: 'avenir-roman',
          },
          left: {
            color: colors.textDark,
            fontSize: fonts.size.medium,
            fontFamily: 'avenir-roman',
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: colors.greyMedium,
            margin: metrics.medium,
            borderRadius: 5,
          },
          right: {
            backgroundColor: colors.secondary,
            margin: metrics.medium,
            borderRadius: 5,
          }
        }}
        touchableProps={{
          onLongPress: null,
          onPress: () => {
            console.log('bubble pressed');
          },
        }}
      />
      <Text style={props.currentMessage.user._id === 1 ? styles.dateRight : styles.dateLeft}>
        {moment(props.currentMessage.dateCreated).format('hh:mm A')}
      </Text>
    </View>
  );
};

export default RenderBubble;

const styles = StyleSheet.create({
  dateLeft: {
    fontFamily: 'avenir-roman',
    color: colors.textMedium,
    fontSize: fonts.size.tiny,
    marginHorizontal: metrics.medium,
    marginBottom: 3
  },
  dateRight: {
    fontFamily: 'avenir-roman',
    alignSelf: 'flex-end',
    color: colors.textMedium,
    fontSize: fonts.size.tiny,
    marginHorizontal: metrics.medium,
    marginBottom: 3
  }
});
