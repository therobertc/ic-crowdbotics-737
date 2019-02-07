import { combineReducers } from 'redux';
import welcomeReducer from '../components/welcome/WelcomeContainer.js';
import feedReducer from '../components/feed/FeedContainer.js';
import chatReducer from '../components/chat/ChatContainer.js';
import commentsReducer from '../components/comments/CommentsContainer.js';
import tradeitReducer from '../components/tradeit/TradeitContainer.js';
import signupReducer from './signup.js';


export default combineReducers({
  welcomeReducer,
  chatReducer,
  signupReducer,
  feedReducer,
  commentsReducer,
  tradeitReducer
});
