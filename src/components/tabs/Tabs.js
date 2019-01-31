import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { colors, fonts, icons, metrics } from '../../theme/index.js';
import { Ionicons } from '@expo/vector-icons';
import Chat from '../chat/Chat.js';
import Feed from '../feed/Feed.js';

const navigationConfig = {
  initialRoute: 'Feed',
  showIcon: true,
  tabBarOptions: {
    inactiveTintColor: colors.tabIcon,
    activeTintColor: 'red',
    inactiveBackgroundColor: colors.background,
    activeBackgroundColor: colors.background,
    showLabel: false,
    showIcon: true,
    style: {
      borderTopColor: colors.greyMedium,
      height: 55,
    },
    labelStyle: {
      fontSize: fonts.size.small,
    },
    tabStyle: {
      // backgroundColor: colors.tabBackground
    },
  },
  swipeEnabled: true
};

const Tabs = createBottomTabNavigator({
  // TODO
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
      tabBarLabel: 'Feed',
      tabBarIcon: ({ inactiveTintColor, activeTintColor }) =>
        <Image source={icons.feed} style={{ width: 22, height: 19 }}/>
    }
  },
  // TODO
  Portfolio: {
    screen: Chat,
    navigationOptions: {
      title: 'Portfolio',
      tabBarLabel: 'Portfolio',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Image source={icons.portfolio} style={{ width: 22, height: 22 }}/>
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: 'Chat',
      tabBarLabel: 'Chat',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Image source={icons.chat} style={{ position: 'absolute', width: 70, height: 70, top: -15 }}/>
    }
  },
  // TODO
  Profile: {
    screen: Chat,
    navigationOptions: {
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Image source={icons.profile} style={{ width: 18, height: 22 }}/>
    }
  },
  // TODO
  More: {
    screen: Chat,
    navigationOptions: {
      title: 'More',
      tabBarLabel: 'More',
      tabBarIcon: ({ tintColor, activeTintColor }) =>
        <Image source={icons.more} style={{ width: 27, height: 6 }}/>
    }
  }
}, navigationConfig);


export default Tabs;
