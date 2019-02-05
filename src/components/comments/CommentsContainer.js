// Actions
const SAVE_COMMENT = 'comments/SAVE_COMMENT';

// Initial State
const initialState = {
  comments: [
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
      text: 'We are here to help you... Feel free to ask for any questions or queries! We are here to help you... Feel free to ask for any questions or queries! Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
    },
    {
      id: 3,
      name: 'John Doe',
      text: 'We are here to help you... Feel free to ask for any questions or queries!',
      image: 'https://placeimg.com/140/140/any',
      dateCreated: new Date(),
    }
  ],
};

// Reducer
const commentsReducer = (state = initialState, action) =>
  action.type === SAVE_COMMENT ? ({ ...state, comments: [ action.comment, ...state.comments] }) :
  state;

// Action Creators
export const saveCommentAction = comment => ({ type: SAVE_COMMENT, comment });

export default commentsReducer;
