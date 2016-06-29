import * as AppActionTypes from '../constants/appActionTypes';

const initialState = {
    isCheckingOut: false,
};

const actionsMap = {
  [AppActionTypes.BEGIN_CHECKOUT](state, action) {
    return Object.assign({}, state, { isCheckingOut: true });
  },
  [AppActionTypes.END_CHECKOUT](state, action) {
    return Object.assign({}, state, { isCheckingOut: false })
  },
};

export default function cartItems(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
