import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { metrics, colors, fonts } from '../../theme/index.js';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';


class Signup extends Component {

  state = {
    email: '',
    phoneNumber: '',
    password: '',
    termsAccepted: false
  }

  acceptTerms = () => this.setState({ termsAccepted: !this.state.termsAccepted })

  render(){
    const { navigation } = this.props;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Create your account</Text>

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
            onChangeText={(text) => this.setState({ phoneNumber: text })}
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
            this.state.termsAccepted
            ? <TouchableOpacity style={styles.checkbox} onPress={this.acceptTerms}/>
            : <TouchableOpacity style={styles.checkboxAccepted} onPress={this.acceptTerms}>
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

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity>

        <Text style={styles.newUserText}>Already a user?</Text>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerButtonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Signup;

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
  }
});
