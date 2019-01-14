import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { metrics, colors, fonts } from '../../theme/index.js';
import * as firebase from 'firebase';


const HeaderRight = props => {

  const signout = () => {
    firebase.auth().signOut().then(function() {
      props.navigation.navigate('Welcome');
    }).catch(function(error) {
      // An error happened.
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={signout}>
        <Ionicons name="md-calendar" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
  },
  iconContainer: {
    // flex: 1,
    paddingHorizontal: metrics.medium,
  }
});
