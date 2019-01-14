import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { metrics, colors, fonts } from '../../theme/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLoadingAction } from '../welcome/WelcomeContainer.js';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';


class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  loginUser = () => {
    this.props.updateLoadingAction(true);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      alert('Username or password incorrect.');
      this.props.updateLoadingAction(false);
    });
  }

  render(){
    const { navigation } = this.props;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Sign in to your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.text}
            placeholder="Email address"
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

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.loginUser}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity>

        <Text style={styles.newUserText}>New user?</Text>

        <Text style={styles.descriptionText}>
          Let's explore the world of finance
          with us. And get to know with
          lots of useful things.
        </Text>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerButtonText}>SIGNUP</Text>
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
  isLoading: state.welcomeReducer.isLoading,
});

const dispatchToProps = dispatch => ({
  updateLoadingAction: bindActionCreators(updateLoadingAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Login);

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
  forgotPasswordText: {
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
  descriptionText: {
    width: 200,
    color: colors.textMedium,
    textAlign: 'center'
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
