import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShoppingCart from '../components/shopping-cart';
import MyShopbuddy from '../components/my-shopbuddy';
import WindowApp from '../components/window-app';

import * as CartActions from '../actions/cartItems';
import * as AppActions from '../actions/app';
import * as AuthenticationActions from '../actions/authentication';
import * as OrderActions from '../actions/orders';

import _ from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from '../appTheme.js';

import firebaseAppInit from '../utils/firebase';


@connect(
  state => ({
    cartItems: state.cartItems,
    app: state.app,
    authentication: state.authentication,
    orders: state.orders,
  }),
  dispatch => ({
    cartActions: bindActionCreators(CartActions, dispatch),
    appActions: bindActionCreators(AppActions, dispatch),
    authenticationActions: bindActionCreators(AuthenticationActions, dispatch),
    orderActions: bindActionCreators(OrderActions, dispatch),
  })
)
export default class App extends Component {
  static propTypes = {
    cartItems: PropTypes.array.isRequired,
    cartActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.setupFirebase();
  }

  listenOnceForItems(itemName, itemFirebaseRef) {
    console.log('listenOnceForItems');
    switch (itemName) {
      case 'carts':
        itemFirebaseRef.once('value', (snap) => {
          const items = [];
          snap.forEach((child) => {
            items.push(Object.assign(child.val(), { _key: child.key }));
          });

          console.log(items);

          console.log(this.props);

          // delete existing categories and replace them with new ones
          this.props.orderActions.deleteOrders();
          this.props.orderActions.addOrders(items);
        });
        break;
      default:
        // console.log('default case running');
    }
  }

  setupFirebase() {
    try {
      // Initialize Firebase
      this.firebaseApp = firebaseAppInit();

      // initialize database stores
      this.firebaseDatabaseRefs = {
        users: this.firebaseApp.database().ref().child('users'),
        carts: this.firebaseApp.database().ref().child('carts'),
      };

      // initialize file storage
      this.firebaseFileStorageRefs = {
        products: this.firebaseApp.storage().ref().child('menu/images'),
      };
    } catch (e) {
      window.location.reload();
    }
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
              this.props.cartActions.emptyCart();
              cartItems.forEach((cartItem) => {
                this.props.cartActions.addCartItem(cartItem);
              });
              // // check if the cart items in the redux store are the same as the current cart items
              // if (JSON.stringify(this.props.cartItems) !== JSON.stringify(cartItems)) {
              //   // store items and scrapped items don't match
              //   // find missing items and put them in store
              //   let missingItems = _.differenceBy(cartItems, this.props.cartItems, 'asin');
              //
              //   if (missingItems.length) {
              //     missingItems.forEach((cartItem) => {
              //       this.props.cartActions.addCartItem(cartItem);
              //     });
              //   }
              // }
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

  componentWillMount() {
    console.log(this.props.authentication);
    // initiate fetching firebase data
    if (this.props.authentication.isSignedIn) {
      this.listenOnceForItems('carts', this.firebaseDatabaseRefs.carts);
    }
  }

  render() {
    const firebaseRefs = {
      database: this.firebaseDatabaseRefs,
      fileStorage: this.firebaseFileStorageRefs,
    };

    const { cartActions, appActions, app } = this.props;
    let component;
    switch (window.location.pathname) {
      case '/inject.html':
        component = <ShoppingCart { ...this.props } firebaseRefs={firebaseRefs} />
        break;
      case '/popup.html':
        component = <MyShopbuddy { ...this.props } firebaseRefs={firebaseRefs} />
        break;
      case '/window.html':
        component = <WindowApp { ...this.props } firebaseRefs={firebaseRefs} />
        break;
      default:
        component = <ShoppingCart { ...this.props } firebaseRefs={firebaseRefs} />
    }


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
        {component}
      </MuiThemeProvider>
    );
  }
}
