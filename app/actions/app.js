import * as types from '../constants/appActionTypes';

export function beginCheckout() {
  return { type: types.BEGIN_CHECKOUT };
}

export function endCheckout() {
  return { type: types.END_CHECKOUT };
}
