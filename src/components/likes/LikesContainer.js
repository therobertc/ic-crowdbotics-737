// Actions
const SAVE_LIKE = 'likes/SAVE_LIKE';

// Initial State
const initialState = {
  likes: [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',

    },
    {
      id: 2,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',
    },
    {
      id: 3,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
    },
    {
      id: 4,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',

    },
    {
      id: 5,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',
    },
    {
      id: 6,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
    }
  ],
};

// Reducer
const likesReducer = (state = initialState, action) =>
  action.type === SAVE_LIKE ? ({ ...state, likes: [ action.comment, ...state.likes] }) :
  state;

// Action Creators
export const saveLikeAction = comment => ({ type: SAVE_LIKE, comment });

export default likesReducer;
