import * as AuthenticationActionTypes from '../constants/authenticationActionTypes';

const initialState = {
    isSignedIn: false,
    isSigningIn: false,
    isSigningInComplete: false,
    signedInUser: {
      authToken: null,
      chromeUser: null,
      gplusProfile: null,
    },
    shopbuddyAPIUser: {
      token: null,
      currentUser: null,
    },
    lastSuccessfulSignIn: null,
};

const actionsMap = {
  [AuthenticationActionTypes.BEGIN_SIGNING_IN](state, action) {
    return Object.assign({}, state, { isSigningIn: true, isSigningInComplete: false, });
  },
  [AuthenticationActionTypes.SIGN_OUT](state, action) {
    return Object.assign({}, state, { isSignedIn: false, isSigningIn: false, isSigningInComplete: false, signedInUser: null, });
  },
  [AuthenticationActionTypes.END_SIGNING_IN](state, action) {
    return Object.assign({}, state, { isSignedIn: true, isSigningIn: false, isSigningInComplete: true, lastSuccessfulSignIn: new Date(), signedInUser: action.user });
  },
  [AuthenticationActionTypes.SET_SHOP_BUDDY_API_PROPERTIES](state, action) {
    return Object.assign({}, state, { shopbuddyAPIUser: { token: action.token, currentUser: action.currentUser }  });
  },
};

export default function authentication(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
