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

export function receiveCartSendingResponseNoError() {
  console.log('receiveCartSendingResponseNoError');
  return { type: types.RECEIVE_CART_SENDING_RESPONSE_NO_ERROR };
}

export function receiveCartSendingResponseWithError() {
  return { type: types.RECEIVE_CART_SENDING_RESPONSE_WITH_ERROR }
}

export function resetCheckout() {
  return { type: types.RESET_CHECKOUT }
}
