import { combineReducers } from 'redux';
import cartItems from './cartItems';
import app from './app';
import authentication from './authentication';

export default combineReducers({
  cartItems,
  app,
  authentication,
});
