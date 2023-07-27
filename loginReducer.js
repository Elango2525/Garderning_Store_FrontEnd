// loginReducer.js
const initialState = {
    isLoggedIn: false,
    userDetails: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          userDetails: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          userDetails: null,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  