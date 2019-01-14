// Actions
const SAVE_EMAIL = 'signup/SAVE_EMAIL';
const SAVE_PHONE_NUMBER = 'signup/SAVE_PHONE_NUMBER';

// Initial State
const initialState = {
  email: '',
  phoneNumber: '',
};

// Reducer
const signupReducer = (state = initialState, action) =>
  action.type === SAVE_EMAIL ? ({ ...state, email: action.email }) :
  action.type === SAVE_PHONE_NUMBER ? ({ ...state, phoneNumber: action.number }) :
  state;

// Action Creators
export const saveEmailAction = email => ({ type: SAVE_EMAIL, email });
export const savePhoneNumberAction = number => ({ type: SAVE_PHONE_NUMBER, number });

export default signupReducer;
