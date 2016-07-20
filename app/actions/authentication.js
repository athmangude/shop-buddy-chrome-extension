import * as types from '../constants/authenticationActionTypes';

export function beginSigningIn() {
  return { type: types.BEGIN_SIGNING_IN };
}

export function endSigningIn(user) {
  return { type: types.END_SIGNING_IN, user };
}

export function signOut() {
  return { type: types.SIGN_OUT };
}


export function setAuthToken(authToken) {
  return {
    type: types.SET_AUTH_TOKEN,
    authToken,
  }
}

export function setChromeUser(chromeUser) {
  return {
    type: types.SET_CHROME_USER,
    chromeUser,
  }
}

export function setGplusProfile(gplusProfile) {
  return {
    type: types.SET_GPLUS_PROFILE,
    gplusProfile,
  }
}
