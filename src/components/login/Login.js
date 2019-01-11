import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { metrics, colors, fonts } from '../../theme/index.js';
import PropTypes from 'prop-types';


class Login extends Component {

  state = {
    email: '',
    password: ''
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
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <Text style={styles.newUserText}>New user?</Text>

        <Text style={styles.descriptionText}>
          Let's explore the world of finance
          with us. And get to know with
          lots of useful things.
        </Text>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerButtonText}>SIGNUP</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Login;

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
  }
});
