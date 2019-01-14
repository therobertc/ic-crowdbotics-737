import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCurrentUserAction,  } from '../profile/ProfileContainer.js';
import { saveEmailAction, savePhoneNumberAction  } from '../signup/SignupContainer.js';
import { updateLoadingAction } from '../welcome/WelcomeContainer.js';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';


class Signup extends Component {

  state = {
    password: '',
    termsAccepted: false,
  }

  registerUser = (email, password) => {
    if (this.state.termsAccepted) {
      this.props.updateLoadingAction(true);
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          this.props.updateLoadingAction(false);
          alert(error.message);
        });
    } else {
      alert('Please accept terms and conditions.');
    }
  }

  acceptTerms = (bool) => this.setState({ termsAccepted: bool })

  render(){
    const { navigation, currentUser } = this.props;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Create your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.props.saveEmailAction(text)}
            value={this.state.text}
            placeholder="Email address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.props.savePhoneNumberAction(text)}
            value={this.state.text}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.text}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <View style={styles.termsContainer}>
          {
            !this.state.termsAccepted
            ? <TouchableOpacity style={styles.checkbox} onPress={() => this.acceptTerms(true)}/>
            : <TouchableOpacity style={styles.checkboxAccepted} onPress={() => this.acceptTerms(false)}>
                <Ionicons name="md-checkmark-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
          }
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>I have read and accept all</Text>
            <TouchableOpacity>
              <Text style={styles.termsTextGreen}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.registerUser(this.props.email, this.state.password)}
        >
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity>

        <Text style={styles.newUserText}>Already a user?</Text>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerButtonText}>LOGIN</Text>
        </TouchableOpacity>

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
  isLoading: state.welcomeReducer.isLoading,
  email: state.signupReducer.email,
});

const dispatchToProps = dispatch => ({
  saveCurrentUserAction: bindActionCreators(saveCurrentUserAction, dispatch),
  saveEmailAction: bindActionCreators(saveEmailAction, dispatch),
  savePhoneNumberAction: bindActionCreators(savePhoneNumberAction, dispatch),
  updateLoadingAction: bindActionCreators(updateLoadingAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Signup);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: colors.primary,
    marginVertical: 30,
    marginTop: 50
  },
  inputContainer: {
    width: '100%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: metrics.large,
    borderRadius: 5
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end'
  },
  termsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary
  },
  termsText: {
    fontSize: fonts.size.small,
    marginLeft: metrics.small,
    color: colors.textMedium,
  },
  termsTextGreen: {
    fontSize: fonts.size.small,
    marginLeft: metrics.tiny,
    color: colors.primary,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center'
  },
  newUserText: {
    color: colors.textMedium,
    fontWeight: 'bold'
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
