import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCurrentUserAction,  } from '../profile/ProfileContainer.js';
import { updateLoadingAction } from '../welcome/WelcomeContainer.js';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';

class Welcome extends Component {

  componentDidMount = () => {
    this.props.updateLoadingAction(true);
    this.setAuthListener();
  }

  setAuthListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.updateLoadingAction(true);
      if (user != null) {
        // check for existing user
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.once('value')
          .then(snapshot => {
            // if user doesn't exist
            if (snapshot.val() === null || snapshot.val() === undefined){
              const currentUser = {
                email: user.email,
                phoneNumber: this.props.phoneNumber,
                uid: user.uid,
              };
              // save current user
              this.saveUserData(currentUser);
            }
            // if user exists
            else {
              // TODO: check if timeout is needed
              this.props.saveCurrentUserAction(snapshot.val());
              this.props.updateLoadingAction(false);
              this.props.navigation.navigate('Home');
            }
          })
          .catch(error => {
            console.log(error.message);
            this.props.updateLoadingAction(false);
          });
      } else {
        console.log('You are not authenticated');
        this.props.updateLoadingAction(false);
      }
    });
  }

  saveUserData = (user) => {
    const userRef = firebase.database().ref('users/' + user.uid);
    userRef.set(user)
      .then(snapshot => this.props.saveCurrentUserAction(snapshot.val()))
      .then(this.props.updateLoadingAction(false))
      .then(this.props.navigation.navigate('Home'))
      .catch(error => {
        console.log(error);
        this.props.updateLoadingAction(false);
      });
  }

  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage}/>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>We are happy to help you</Text>
          <Text style={styles.description}>
            Built like a hedgefund, we invest your money
            for the long term in what we believe to be
            outstanding companies.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account</Text>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerButtonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

        </View>

        {
          this.props.isLoading &&
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="small" color={colors.grey} />
            </View>
        }

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

export default connect(stateToProps, dispatchToProps)(Welcome);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  topContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: 100,
    resizeMode: 'contain'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: metrics.large,
    borderRadius: 5
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerText: {
    color: colors.textMedium
  },
  footerButton: {

  },
  footerButtonText: {
    marginLeft: metrics.small,
    color: colors.primary
  },
  activityIndicatorContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white
  }
});
