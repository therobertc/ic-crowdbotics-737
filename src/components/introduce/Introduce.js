import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCurrentUserAction,  } from '../profile/ProfileContainer.js';
import { updateLoadingAction } from '../welcome/WelcomeContainer.js';
import { layouts, colors, fonts } from '../../theme/index.js';

const items = [0, 1, 2, 3, 4];

class Introduce extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected_index: 0
    }
  }

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/intro_phone.png')} style={styles.phoneContainer}/>

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Welcome to the future of Investing</Text>
          <Text style={styles.description}>
            Built like a hedgefund, we invest your money
            for the long term in what we believe to be
            outstanding companies.
          </Text>

          <View style={styles.paginationContainer}>
            {
              items.map((item, index) => {
                return <View key={index} style={this.state.selected_index == item ? styles.selectDotStyle: styles.dotStyle}/>
              })
            }
          </View>

          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.footerButtonText}>skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const stateToProps = state => ({
  currentUser: state.profileReducer.currentUser,
  phoneNumber: state.signupReducer.phoneNumber,
  isLoading: state.welcomeReducer.isLoading,
});

const dispatchToProps = dispatch => ({
  saveCurrentUserAction: bindActionCreators(saveCurrentUserAction, dispatch),
  updateLoadingAction: bindActionCreators(updateLoadingAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Introduce);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90DBD7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneContainer: {
    width: layouts.window.width * 0.9,
    resizeMode: 'contain'
  },
  bodyContainer: {
    height: layouts.window.height * 0.5,
    width: layouts.window.width,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 30,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  title: {
    color: colors.textDark,
    fontWeight: 'bold'
  },
  description: {
    color: colors.textMedium,
    textAlign: 'center'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonText: {
    color: colors.primary
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectDotStyle: {
    width: 32,
    height: 4,
    backgroundColor: '#52CBC2',
    borderRadius: 2,
    marginLeft: 4
  },
  dotStyle: {
    width: 32,
    height: 4,
    backgroundColor: '#ECF1F8',
    borderRadius: 2,
    marginLeft: 4
  }
});
