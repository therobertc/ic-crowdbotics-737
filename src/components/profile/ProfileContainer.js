// Actions
const SAVE_CURRENT_USER = 'profile/SAVE_CURRENT_USER';
const LOGOUT = 'profile/LOGOUT';

// Initial State
const initialState = {
  currentUser: {},
};

// Reducer
const profileReducer = (state = initialState, action) =>
  action.type === SAVE_CURRENT_USER ? ({ ...state, currentUser: action.currentUser }) :
  action.type === LOGOUT ? ({ ...state, currentUser: {}, profileUser: {}, imageMessages: [] }) :
  state;

// Action Creators
export const saveCurrentUserAction = currentUser => ({ type: SAVE_CURRENT_USER, currentUser });
export const logoutAction = () => ({ type: LOGOUT });

export default profileReducer;
