import { combineReducers } from 'redux';
import welcomeReducer from '../components/welcome/WelcomeContainer.js';
// import signupReducer from '../components/signup/SignupContainer.js';
import chatReducer from '../components/chat/ChatContainer.js';
import signupReducer from './signup.js';


export default combineReducers({
  welcomeReducer,
  chatReducer,
  signupReducer,
});
