import { combineReducers } from 'redux';
import todos from './todos';
import cartItems from './cartItems';

export default combineReducers({
  todos,
  cartItems,
});
