import * as OrderItemsActionTypes from '../constants/orderActionTypes';

const initialState = [];

const actionsMap = {
  [OrderItemsActionTypes.ADD_ORDER_ITEM](state, action) {
    return [Object.assign(action.orderItem, {
      id: state.reduce((maxId, orderItem) => Math.max(orderItem.id, maxId), -1) + 1,
    }), ...state];
  },
  [OrderItemsActionTypes.ADD_ORDERS](state, action) {
    return action.orders.concat(state);
  },
  [OrderItemsActionTypes.DELETE_ORDER_ITEM](state, action) {
    return state.filter(orderItem =>
      orderItem.id !== action.orderItem.id
    );
  },
  [OrderItemsActionTypes.UPDATE_ORDER_ITEM](state, action) {
    return state.map(orderItem =>
      (orderItem.id === action.orderItem.id ?
        Object.assign({}, orderItem, action.orderItem) :
        orderItem)
    );
  },
  [OrderItemsActionTypes.DELETE_ORDERS](state, action) {
    return state.filter(orderItem =>
      false
    );
  },
};

export default function orderItems(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
