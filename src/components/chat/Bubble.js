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
  console.log(props);
  return (
    <View>
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: colors.white,
            fontSize: fonts.size.small,
            // fontFamily: 'openSansSemiBold',
          },
          left: {
            color: colors.textDark,
            fontSize: fonts.size.small,
            // fontFamily: 'openSansSemiBold',
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: colors.greyMedium,
            marginBottom: metrics.small
          },
          right: {
            backgroundColor: colors.secondary,
            marginBottom: metrics.small
          }
        }}
        touchableProps={{
          onLongPress: null,
          onPress: () => {
            console.log('bubble pressed');
          },
        }}
      />
      <Text
        style={props.currentMessage.user._id === 1 ? styles.dateRight : styles.dateLeft}
      >
        {moment(props.currentMessage.dateCreated).format('hh:mm A')}
      </Text>
    </View>
  );
};

export default RenderBubble;

const styles = StyleSheet.create({
  dateLeft: {
    color: colors.textMedium,
    fontSize: fonts.size.tiny,
    marginHorizontal: 6,
    marginBottom: 3
  },
  dateRight: {
    alignSelf: 'flex-end',
    color: colors.textMedium,
    fontSize: fonts.size.tiny,
    marginHorizontal: 6,
    marginBottom: 3
  }
});
