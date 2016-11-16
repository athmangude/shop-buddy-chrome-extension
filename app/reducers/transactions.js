import * as TransactionItemsActionTypes from '../constants/transactionActionTypes';

const initialState = [];

const actionsMap = {
  [TransactionItemsActionTypes.ADD_TRANSACTION_ITEM](state, action) {
    return [Object.assign(action.transactionItem, {
      id: state.reduce((maxId, transactionItem) => Math.max(transactionItem.id, maxId), -1) + 1,
    }), ...state];
  },
  [TransactionItemsActionTypes.DELETE_TRANSACTION_ITEM](state, action) {
    return state.filter(transactionItem =>
      transactionItem.id !== action.transactionItem.id
    );
  },
  [TransactionItemsActionTypes.UPDATE_TRANSACTION_ITEM](state, action) {
    return state.map(transactionItem =>
      (transactionItem.id === action.transactionItem.id ?
        Object.assign({}, transactionItem, action.transactionItem) :
        transactionItem)
    );
  },
  [TransactionItemsActionTypes.EMPTY_TRANSACTION](state, action) {
    return state.filter(transactionItem =>
      false
    );
  },
};

export default function transactionItems(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
