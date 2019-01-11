import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { metrics, colors, fonts } from '../../theme/index.js';
import Login from '../login/Login.js';
import Tabs from '../tabs/Tabs.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';


const navigationConfig = {
  initialRouteName: 'Tabs',
  headerMode: 'float',
  defaultNavigationOptions: ({ navigation }) => ({
    headerLeft: <HeaderLeft navigation={navigation} />,
    headerRight: <HeaderRight navigation={navigation} />,
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.black,
    },
    headerTitleStyle: {
      fontSize: fonts.size.large,
      color: colors.white,
    },
  }),
};

const Navigator = createStackNavigator({
  Tabs: { screen: Tabs },
  Login: { screen: Login },
}, navigationConfig);

export default createAppContainer(Navigator);
