import * as types from '../constants/authenticationActionTypes';

export function beginSigningIn() {
  return { type: types.BEGIN_SIGNING_IN };
}

export function endSigningIn() {
  return { type: types.END_SIGNING_IN };
}

export function signOut() {
  return { type: types.SIGN_OUT };
}
