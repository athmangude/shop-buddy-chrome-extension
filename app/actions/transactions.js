import * as types from '../constants/transactionActionTypes';

export function addTransactionItem(transactionItem) {
  return { type: types.ADD_TRANSACTION_ITEM, transactionItem };
}

export function deleteTransactionItem(transactionItem) {
  return { type: types.DELETE_TRANSACTION_ITEM, transactionItem };
}

export function updateTransactionItem(transactionItem) {
  return { type: types.UPDATE_TRANSACTION_ITEM, transactionItem };
}

export function emptyTransaction() {
  return {
    type: types.EMPTY_TRANSACTION,
  }
}
