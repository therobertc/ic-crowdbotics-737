import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { colors, fonts } from '../../theme/index.js';
import { Ionicons } from '@expo/vector-icons';
import Home from '../home/Home.js';
import About from '../about/About.js';

const navigationConfig = {
  initialRoute: 'About',
  showIcon: true,
  tabBarOptions: {
    inactiveTintColor: colors.secondary,
    activeTintColor: colors.primary,
    inactiveBackgroundColor: colors.background,
    activeBackgroundColor: colors.background,
    showLabel: true,
    showIcon: true,
    labelStyle: {
      fontSize: fonts.size.small,
    },
    tabStyle: {
      backgroundColor: colors.greyLight
    },
  },
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

export default Tabs;
