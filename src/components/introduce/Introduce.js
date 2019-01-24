import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { layouts, colors, images } from '../../theme/index.js';

const items = [0, 1, 2, 3, 4];

export default class Introduce extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected_index: 0
    }
  }

  render(){
    const { navigation } = this.props;
    return (
      <ImageBackground source={images.background} style={styles.container}>
        <Image source={images.intro_phone} style={styles.phoneContainer}/>

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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    backgroundColor: colors.activeDot,
    borderRadius: 2,
    marginLeft: 4
  },
  dotStyle: {
    width: 32,
    height: 4,
    backgroundColor: colors.dot,
    borderRadius: 2,
    marginLeft: 4
  }
});
