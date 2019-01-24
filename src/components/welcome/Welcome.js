import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { metrics, colors, images } from '../../theme/index.js';

export default class Welcome extends Component {

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={images.background} style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={images.logo} style={styles.logoImage}/>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>We are happy to help you</Text>
          <Text style={styles.description}>
            Built like a hedgefund, we invest your money
            for the long term in what we believe to be
            outstanding companies.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupBot')}>
            <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account</Text>
            <TouchableOpacity style={styles.footerButton}>
            {/* <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}> */}
              <Text style={styles.footerButtonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  topContainer: {
    flex: 1,
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
