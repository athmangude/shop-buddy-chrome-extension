import * as AppActionTypes from '../constants/appActionTypes';

const initialState = {
    isCheckingOut: false,
    isCheckoutComplete: false,
    isSendingCart: false,
    isCartSendingResponseReceived: false,
    lastSuccessfulCheckout: false,
};

const actionsMap = {
  [AppActionTypes.BEGIN_CHECKOUT](state, action) {
    return Object.assign({}, state, { isCheckingOut: true, isCheckoutComplete: false, });
  },
  [AppActionTypes.SEND_CART](state, action) {
    return Object.assign({}, state, { isSendingCart: true, isCartSendingResponseReceived: false, });
  },
  [AppActionTypes.RECEIVE_CART_SENDING_RESPONSE](state, action) {
    return Object.assign({}, state, { isSendingCart: false, isCartSendingResponseReceived: true, });
  },
  [AppActionTypes.CANCEL_CHECKOUT](state, action) {
    return Object.assign({}, state, { isCheckingOut: false, isSendingCart: false, isCartSendingResponseReceived: false, isCheckoutComplete: false, isCheckoutComplete: false, })
  },
  [AppActionTypes.END_CHECKOUT](state, action) {
    return Object.assign({}, state, { isCheckingOut: false, isCheckoutComplete: true, lastSuccessfulCheckout: new Date(), })
  },
};

export default function app(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
