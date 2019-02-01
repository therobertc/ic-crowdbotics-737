// Actions
const SAVE_FEED = 'feed/SAVE_FEED';

// Initial State
const initialState = {
  feedMessages: [
    {
      id: 1,
      title: 'Apple is no longer the biggest company',
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      likes: 3,
      shares: 1
    },
    {
      id: 2,
      title: 'Apple is no longer the biggest company',
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      likes: 5,
      shares: 2
    },
    {
      id: 3,
      title: 'Apple is no longer the biggest company',
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      likes: 3,
      shares: 3
    },
    {
      id: 4,
      title: 'Apple is no longer the biggest company',
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      likes: 3,
      shares: 3
    },
  ],
};

// Reducer
const feedReducer = (state = initialState, action) =>
  action.type === SAVE_FEED ? ({ ...state, feedMessages: [ action.feedMessage, ...state.feedMessages] }) :
  state;

// Action Creators
export const saveFeedAction = feedMessage => ({ type: SAVE_FEED, feedMessage });

export default feedReducer;
