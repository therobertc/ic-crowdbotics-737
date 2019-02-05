import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { increaseValue } from './ChatContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Bubble } from 'react-native-gifted-chat';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';
import Card from '../feed/Card.js';


const _renderComments = (item, index) => (
  <View key={item.id} style={styles.itemContainer}>
    <View style={item.infoContainer}>
      {/* <Image source={}> */}
    </View>
    <Text>adada</Text>
  </View>
);


const Comments = (props) => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 15 }} horizontal showsVerticalScrollIndicator={false}>
      {
        props.feedMessages.map(_renderComments)
      }
    </ScrollView>
  );
};

const stateToProps = state => ({
  feedMessages: state.feedReducer.feedMessages,
});

const dispatchToProps = dispatch => ({
  // saveFeedAction: bindActionCreators(saveFeedAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Comments);

const styles = StyleSheet.create({
  itemContainer: {
    width: 300
  }
});
