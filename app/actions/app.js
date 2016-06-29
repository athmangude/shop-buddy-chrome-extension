import * as types from '../constants/appActionTypes';

export function beginCheckout() {
  return { type: types.BEGIN_CHECKOUT };
}

export function cancelCheckout() {
  return { type: types.CANCEL_CHECKOUT };
}

export function endCheckout() {
  return { type: types.END_CHECKOUT };
}

export function sendCart() {
  return { type: types.SEND_CART };
}

export function receiveCartSendingResponse() {
  return { type: types.RECEIVE_CART_SENDING_RESPONSE };
}
