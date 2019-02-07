import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { colors, fonts } from '../../theme/index.js';
import HeaderLeft from './HeaderLeft.js';
import HeaderRight from './HeaderRight.js';
import Introduce from '../introduce/Introduce.js';
import Welcome from '../welcome/Welcome.js';
import Login from '../login/Login.js';
import Signup from '../signup/Signup.js';
import SignupChatbot from '../signup/Chatbot.js';
import LoginChatbot from '../login/Chatbot.js';
import Tabs from '../tabs/Tabs.js';
import Comments from '../comments/Comments.js';
import Tradeit from '../tradeit/Tradeit.js';


const navigationConfig = {
  initialRouteName: 'Tradeit',
  headerMode: 'float',
  defaultNavigationOptions: ({ navigation }) => ({
    headerLeft: <HeaderLeft navigation={navigation} />,
    headerRight: <HeaderRight navigation={navigation} />,
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      fontSize: fonts.size.large,
      color: colors.white,
    },
  }),
};

const AppNavigator = createStackNavigator({
  Introduce: {
    screen: Introduce,
    navigationOptions: {
      header: null
    }
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  },
  SignupBot: {
    screen: SignupChatbot,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  LoginBot: {
    screen: LoginChatbot,
    navigationOptions: {
      header: null
    }
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Comments: {
    screen: Comments,
    navigationOptions: {
      header: null
    }
  },
  Tradeit: {
    screen: Tradeit,
    navigationOptions: {
      header: null
    }
  },

}, navigationConfig);

export default createAppContainer(AppNavigator);
