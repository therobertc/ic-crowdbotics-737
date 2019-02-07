import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, Platform, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as firebase from 'firebase';
import moment from 'moment';
import { metrics, colors, fonts, images } from '../../theme/index.js';
import Icon from '@expo/vector-icons';


const CustomHeader = (props) => {

  return (
    <ImageBackground
      style={styles.container}
      source={images.header}
    >
      {
        props.navigation.state.routeName === 'Comments' ||
        props.navigation.state.routeName === 'Likes'
        ? <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
            <Icon.Ionicons name="ios-arrow-round-back" size={50} color={colors.white} />
          </TouchableOpacity>
        :  <TouchableOpacity style={styles.button} onPress={() => false}>
            <Icon.Ionicons name="md-menu" size={32} color={colors.white} />
          </TouchableOpacity>
      }
      <Text style={styles.title}>Comments</Text>

      <View style={styles.rightContainer} />

    </ImageBackground>
  );
};

const stateToProps = state => ({
  // currentUser: state.profileReducer.currentUser,
});

const dispatchToProps = dispatch => ({
  // saveProfileUserAction: bindActionCreators(saveProfileUserAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(CustomHeader);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  button: {
    flex: 1,
    paddingLeft: metrics.medium,
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    flex: 3,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.size.huge,
    fontWeight: fonts.weight.mediumToLarge,
    fontFamily: 'avenir-roman',
    letterSpacing: 1
  },
  rightContainer: {
    flex: 1
  }
});
