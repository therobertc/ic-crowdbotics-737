import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveLikeAction } from './LikesContainer';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Icon } from 'expo';
// import * as firebase from 'firebase';
import moment from 'moment-timezone';
import CustomHeader from '../header/Header.js';


const _renderLikes = (item, index) => (
  <View key={item.id} style={styles.itemContainer}>
    <View style={styles.infoContainer}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar}/>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.date} />
    </View>
  </View>
);


class Likes extends Component {

  state = {
    text: ''
  }

  render() {
    const { likes } = this.props;

    return (
      <View style={styles.container}>

        <CustomHeader navigation={this.props.navigation} />

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {
            likes.map(_renderLikes)
          }
        </ScrollView>
      </View>
    );
  }
}

const stateToProps = state => ({
  likes: state.likesReducer.likes,
});

const dispatchToProps = dispatch => ({
  saveLikeAction: bindActionCreators(saveLikeAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Likes);

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
    color: colors.textMedium,
  },
  date: {
    textAlign: 'right',
    marginHorizontal: metrics.medium,
    fontSize: fonts.size.small,
    fontFamily: 'avenir-roman',
    color: colors.textMedium,
  }
});
