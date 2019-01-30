import { combineReducers } from 'redux';
import homeReducer from '../components/home/HomeContainer.js';
import welcomeReducer from '../components/welcome/WelcomeContainer.js';
import profileReducer from '../components/profile/ProfileContainer.js';
import signupReducer from '../components/signup/SignupContainer.js';
import chatReducer from '../components/chat/ChatContainer.js';


export default combineReducers({
  homeReducer,
  profileReducer,
  signupReducer,
  welcomeReducer,
  chatReducer
});
