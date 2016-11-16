import * as types from '../constants/orderActionTypes';

export function addOrderItem(orderItem) {
  return { type: types.ADD_ORDER_ITEM, orderItem };
}

export function addOrders (orders) {
  return { type: types.ADD_ORDERS, orders };
}

export function deleteOrderItem(orderItem) {
  return { type: types.DELETE_ORDER_ITEM, orderItem };
}

export function updateOrderItem(orderItem) {
  return { type: types.UPDATE_ORDER_ITEM, orderItem };
}

export function deleteOrders() {
  return {
    type: types.DELETE_ORDERS,
  }
}
