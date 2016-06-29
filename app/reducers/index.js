import { combineReducers } from 'redux';
import cartItems from './cartItems';
import app from './app';

export default combineReducers({
  cartItems,
  app,
});
