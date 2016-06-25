import * as types from '../constants/cartActionTypes';

export function addCartItem(cartItem) {
  return { type: types.ADD_CART_ITEM, cartItem };
}

export function deleteCartItem(cartItem) {
  return { type: types.DELETE_CART_ITEM, cartItem };
}

export function updateCartItem(cartItem) {
  return { type: types.UPDATE_CART_ITEM, cartItem };
}

export function emptyCart() {
  return {
    type: types.EMPTY_CART,
  }
}
