import * as CartItemsActionTypes from '../constants/cartActionTypes';

const initialState = [];

const actionsMap = {
  [CartItemsActionTypes.ADD_CART_ITEM](state, action) {
    return [Object.assign(action.cartItem, {
      id: state.reduce((maxId, cartItem) => Math.max(cartItem.id, maxId), -1) + 1,
    }), ...state];
  },
  [CartItemsActionTypes.DELETE_CART_ITEM](state, action) {
    return state.filter(cartItem =>
      cartItem.id !== action.cartItem.id
    );
  },
  [CartItemsActionTypes.UPDATE_CART_ITEM](state, action) {
    return state.map(cartItem =>
      (cartItem.id === action.cartItem.id ?
        Object.assign({}, cartItem, action.cartItem) :
        cartItem)
    );
  },
  [CartItemsActionTypes.EMPTY_CART](state, action) {
    return state.filter(cartItem =>
      false
    );
  },
};

export default function cartItems(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
