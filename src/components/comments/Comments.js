import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCommentAction } from './CommentsContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Icon } from 'expo';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';


const _renderComments = (item, index) => (
  <View key={item.id} style={styles.itemContainer}>
    <View style={styles.infoContainer}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar}/>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.date}>{moment(item.dateCreated).format('ll')}</Text>
    </View>
    <Text style={styles.text}>{item.text}</Text>
  </View>
);


class Comments extends Component {

  state = {
    text: ''
  }

  render() {
    const { comments } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {
            comments.map(_renderComments)
          }
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Type comment..."
          />
          <TouchableOpacity style={styles.buttonContainer}>
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
  comments: state.commentsReducer.comments,
});

const dispatchToProps = dispatch => ({
  saveCommentAction: bindActionCreators(saveCommentAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Comments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    flex: 1,
    marginTop: 15,
  },
  itemContainer: {
    width: Dimensions.get('window').width - (metrics.medium * 4),
    margin: metrics.small,
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    backgroundColor : colors.white,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: metrics.medium
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    marginHorizontal: metrics.medium,
    fontSize: fonts.size.medium,
    fontFamily: 'avenir-roman',
    textAlign: 'center',
    color: colors.primary,
  },
  date: {
    textAlign: 'right',
    marginHorizontal: metrics.medium,
    fontSize: fonts.size.small,
    fontFamily: 'avenir-roman',
    color: colors.textMedium,
  },
  text: {
    margin: metrics.medium,
    fontSize: fonts.size.medium,
    fontFamily: 'avenir-roman',
    textAlign: 'center',
    color: colors.textMedium,
  },
  // send input
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - (metrics.medium * 4),
    height: 50,
    margin: metrics.small,
    marginVertical: metrics.huge,
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    backgroundColor : colors.white,
  },
  input: {
    flex: 1,
    padding: metrics.small,
    fontSize: fonts.size.medium,
    fontFamily: 'avenir-roman',
    color: colors.textMedium,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50

  }
});
