// loginActions.js

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginSuccess = (userDetails) => ({
  type: LOGIN_SUCCESS,
  payload: userDetails,
});

export const logout = () => ({
  type: LOGOUT,
});
