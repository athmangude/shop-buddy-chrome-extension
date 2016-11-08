import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import accounting from 'accounting';

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
        }

        this.onSignIn = this.onSignIn.bind(this);
        this.onShopbuddyCheckout = this.onShopbuddyCheckout.bind(this);
    }

    onShopbuddyCheckout() {
        this.props.appActions.beginCheckout();

        this.props.appActions.sendCart();

        setTimeout( () => {
            this.props.appActions.receiveCartSendingResponse();
        }, 3000);
    }

    onSignIn() {
        const options = {
            type: 'popup',
            left: 100, top: 100,
            width: 800, height: 475
        };

        // if (type === 'open') {
        options.url = 'window.html';
        chrome.windows.create(options, (win) => {
            const windowId = win.id;
        });
        // }
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
          <Checkout { ...this.props } />
          <RaisedButton
            onTouchTap={this.props.authentication.isSignedIn ? this.onShopbuddyCheckout : this.onSignIn}
            label={this.props.authentication.isSignedIn ? 'Checkout with Shopbuddy' : 'Sign In to Checkout With Shopbuddy'}
            secondary={this.props.authentication.isSignedIn}
            primary={!this.props.authentication.isSignedIn}
            style={style} />
        </div>
      );
    }
}

export default Footer;
