import * as types from '../constants/orderActionTypes';

export function addOrderItem(orderItem) {
  return { type: types.ADD_ORDER_ITEM, orderItem };
}

export function deleteOrderItem(orderItem) {
  return { type: types.DELETE_ORDER_ITEM, orderItem };
}

export function updateOrderItem(orderItem) {
  return { type: types.UPDATE_ORDER_ITEM, orderItem };
}

export function emptyOrder() {
  return {
    type: types.EMPTY_ORDER,
  }
}
