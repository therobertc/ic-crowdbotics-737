// Actions
const SAVE_MESSAGES = 'competition/SAVE_MESSAGES';
const SAVE_IMAGES = 'competition/SAVE_IMAGES';

// Initial State
const initialState = {
  messages: [
    {
      _id: 1,
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
      dateCreated: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'Welcome to Emma Ai',
      dateCreated: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 3,
      text: 'Hello John',
      dateCreated: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ],
  images: []
};

// Reducer
const chatReducer = (state = initialState, action) =>
  action.type === SAVE_MESSAGES ? ({ ...state, messages: [ action.message, ...state.messages] }) :
  action.type === SAVE_IMAGES ? ({ ...state, images: [ action.image, ...state.images] }) :
  state;

// Action Creators
export const saveMessageAction = message => ({ type: SAVE_MESSAGES, message });
export const saveImageAction = image => ({ type: SAVE_IMAGES, image });

export default chatReducer;
