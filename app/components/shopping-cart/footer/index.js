import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import accounting from 'accounting';
import uuid from 'uuid';
import moment from 'moment';

import Checkout from './checkout';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../appTheme.js';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

const style = {
    margin: 12,
};

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckingOut: false,
            cartItemsSent: false,
            checkingOutComplete: false,
            cartId: null,
        }

        this.onSignIn = this.onSignIn.bind(this);
        this.onShopbuddyCheckout = this.onShopbuddyCheckout.bind(this);
        this.onUpdateShippingInfoClicked = this.onUpdateShippingInfoClicked.bind(this);
    }

    onShopbuddyCheckout() {
        this.props.appActions.beginCheckout();

        this.props.appActions.sendCart();

        const cartId = uuid.v1().replace(/[^a-zA-Z0-9]/g, '');
        this.setState({
            cartId: cartId,
        }, () => {
          const dateTime = moment();
          this.props.firebaseRefs.database.carts.child(cartId).set({
              cartItems: this.props.cartItems,
              total: this.props.total.toFixed(2),
              user: this.props.authentication.signedInUser.gplusProfile,
              userId: this.props.authentication.signedInUser.gplusProfile.id,
              dateTime: dateTime.format(),
              timestamp: parseInt(dateTime.format('x')),
              status: 'waiting'
          }, (error) => {
              if(!error) {
                  this.props.appActions.receiveCartSendingResponseNoError();
              } else {
                  this.props.appActions.receiveCartSendingResponseWithError();
              }
          });
        });
    }

    onSignIn() {
        const options = {
            type: 'popup',
            left: 100, top: 100,
            width: 800, height: 475,
            url: 'window.html',
        };

        // // if (type === 'open') {
        // chrome.windows.create(options, (win) => {
        //     const windowId = win.id;
        // });
        // // }
        window.parent.postMessage({ action: 'OPEN_WINDOW_APP', options }, '*');
    }

    componentWillMount() {
        this.props.appActions.resetCheckout();
    }

    closeWindowIfExists() {
        if (windowId > 0) {
            chrome.windows.remove(windowId);
            const windowId = chrome.windows.WINDOW_ID_NONE;
        }
    }

    onUpdateShippingInfoClicked(event) {
        console.log(event);
        event.preventDefault();
        // this.closeWindowIfExists();
        const options = {
            type: 'popup',
            left: 100, top: 100,
            width: 800, height: 475
        };

        options.url = 'window.html';
        chrome.windows.create(options, (win) => {
            const windowId = win.id;
        });
    }

    renderShippingInfoUpdateReminder() {
        if (!this.props.authentication.signedInUser.gplusProfile.shippingAddress.length || !this.props.authentication.signedInUser.gplusProfile.phoneNumber.length) {
            return (
              <span style={{
                  fontSize: 'smaller',
                  marginTop: -10,
              }}>Checkout is disabled. Please <a href="" style={{ textDecoration: 'none', fontStyle: 'italic', color: 'rgb(240, 193, 75)' }} onClick={this.onUpdateShippingInfoClicked}>update</a> your shipping info</span>
            )
        }
    }

    render() {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Paper zDepth={0}>
            <h1 style={{ fontWeight: 'normal' }}>{`${accounting.formatMoney(this.props.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>
          </Paper>
          <Checkout { ...this.props } cartId={this.state.cartId} />
          <RaisedButton
            onTouchTap={this.props.authentication.isSignedIn ? this.onShopbuddyCheckout : this.onSignIn}
            label={this.props.authentication.isSignedIn ? 'Checkout with Shopbuddy' : 'Sign In to Checkout With Shopbuddy'}
            secondary={this.props.authentication.isSignedIn}
            primary={!this.props.authentication.isSignedIn}
            style={style}
            disabled={!this.props.authentication.signedInUser.gplusProfile.shippingAddress.length || !this.props.authentication.signedInUser.gplusProfile.phoneNumber.length}
          />
          {this.renderShippingInfoUpdateReminder()}
        </div>
      );
    }
}

export default Footer;
