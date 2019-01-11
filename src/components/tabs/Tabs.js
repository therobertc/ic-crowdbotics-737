import React from 'react';
import { createBottomTabNavigator, createA } from 'react-navigation';
import { colors, fonts } from '../../theme/index.js';
import { Ionicons } from '@expo/vector-icons';
import Home from '../home/Home.js';
import About from '../about/About.js';

const navigationConfig = {
  showIcon: true,
  tabBarOptions: styles,
  swipeEnabled: true
};

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Ionicons name="md-home" size={24} color={tintColor} />
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      title: 'About',
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Ionicons name="ios-information-circle" size={24} color={tintColor} />
    }
  }
}, navigationConfig);

const styles = {
  inactiveTintColor: colors.white,
  activeTintColor: colors.red,
  labelStyle: {
    fontSize: fonts.size.small,
  },
  style: {
    backgroundColor: colors.black
  },
};

export default Tabs;
