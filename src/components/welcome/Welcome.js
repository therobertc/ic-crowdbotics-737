import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { metrics, colors, fonts } from '../../theme/index.js';

const Welcome = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>We are happy to help you</Text>
        <Text style={styles.description}>
          Built like a hedgefund, we invest your money
          for the long term in what we believe to be
          outstanding companies.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account</Text>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerButtonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 30
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
  }
});

export default Welcome;
