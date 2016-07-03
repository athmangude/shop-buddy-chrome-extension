import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShoppingCart from '../components/shopping-cart';
import MyShopbuddy from '../components/my-shopbuddy';
import AccountAndHistory from '../components/account-and-history';
import * as CartActions from '../actions/cartItems';
import * as AppActions from '../actions/app';

import _ from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from '../appTheme.js';


@connect(
  state => ({
    cartItems: state.cartItems,
    app: state.app,
  }),
  dispatch => ({
    cartActions: bindActionCreators(CartActions, dispatch),
    appActions: bindActionCreators(AppActions, dispatch),
  })
)
export default class App extends Component {

  static propTypes = {
    cartItems: PropTypes.array.isRequired,
    cartActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      if (window.parent) {
        window.parent.postMessage({ message: 'GET_CART_ITEMS' }, '*');
      }

      window.addEventListener('message', (event) => {
        // filter events from Amazon
        if (event.origin === 'https://www.amazon.com') {
          let cartItems = event.data.items;

          if (cartItems.length) {
            // check if there are any cart items in the redux store
            if (!this.props.cartItems.length) {
              // there are no cart items
              // add them
              cartItems.forEach((cartItem) => {
                this.props.cartActions.addCartItem(cartItem);
              });
            } else {
              // check if the cart items in the are the same as the current cart items
              if (JSON.stringify(this.props.cartItems) !== JSON.stringify(cartItems)) {
                // store items and scrapped items don't match
                // find missing items and put them in store
                let missingItems = _.differenceBy(cartItems, this.props.cartItems, 'asin');

                if (missingItems.length) {
                  missingItems.forEach((cartItem) => {
                    this.props.cartActions.addCartItem(cartItem);
                  });
                }
              }
            }

            // check for out of stock items and remove them with nofications to the user
            let outOfStockItems = cartItems.filter((cartItem) => {
              if (cartItem.outOfStock !== '') {
                return true;
              }
            });

            if (outOfStockItems.length) {
              outOfStockItems.forEach((outOfStockItem) => {
                // find the item in the store
                let identicalItemsInStore = this.props.cartItems.filter((cartItem) => {
                  if (cartItem.asin === outOfStockItem.asin) {
                    return true;
                  }
                });

                // remove item in store
                identicalItemsInStore.forEach((identicalItemInStore) => {
                  this.props.cartActions.deleteCartItem(identicalItemInStore);
                  // TODO: notify user of the out of stock item
                });
              });
            }

          }
        }
      });
  }

  render() {
    const { cartActions, appActions, app } = this.props;
    let component;
    switch (window.location.pathname) {
      case '/inject/html':
        component = <ShoppingCart { ...this.props } />
        break;
      case '/popup.html':
        component = <MyShopbuddy { ...this.props } />
        break;
      case '/window.html':
        component = <AccountAndHistory { ...this.props } />
        break;
      default:
        component = <ShoppingCart { ...this.props } />
    }


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
        {component}
      </MuiThemeProvider>
    );
  }
}
