// Actions
const UPDATE_LOADING = 'welcome/UPDATE_LOADING';

// Initial State
const initialState = {
  isLoading: false,
};

// Reducer
const welcomeReducer = (state = initialState, action) =>
  action.type === UPDATE_LOADING ? ({ ...state, isLoading: action.bool }) :
  state;

// Action Creators
export const updateLoadingAction = bool => ({ type: UPDATE_LOADING, bool });

export default welcomeReducer;
