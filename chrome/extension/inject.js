import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import { RaisedButton } from 'material-ui';

import CheckoutReminder from '../../app/components/checkout-reminder';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import appTheme from '../../app/appTheme.js';
import { scrapStoreCheckoutPage } from './scrapper.js';

try {
  injectTapEventPlugin();
} catch (e) {
  console.log(e);
} finally {
  console.log('...');
}

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  /**
   * renders the appropriate components according to the location of the user
   *
   * - check the location of the user
   * - if the user is at the cart page, display button to launch the dock
   * - if the user is not, show them an alert to remind them to checkout with Shopbuddy if they are on a new session
   */
  render() {
    // check if the alert was already displayed in session storage
    let isDialogVisible;
    let checkoutReminderDisplayed = window.sessionStorage.getItem('checkoutReminderDisplayed');
    if (!checkoutReminderDisplayed) {
      isDialogVisible = true;
      window.sessionStorage.setItem('checkoutReminderDisplayed', true);
    } else {
      isDialogVisible = false;
    }

    // check the location of the user
    if (window.location.href.match('https://www.amazon.com/gp/cart/view.html')) {
      return (
        <div>
          <CheckoutReminder isDialogVisible={isDialogVisible} />
          <RaisedButton
            style={{
              position: 'fixed',
              bottom: 10,
              left: '40%',
              marginLeft: 'auto',
              marginRight: 'auto',
              zIndex: '99999998'
            }}
            onTouchTap={this.buttonOnClick}
            label="Shopbuddy Checkout"
            secondary={true} />
          <Dock
            position="right"
            dimMode="transparent"
            defaultSize={0.4}
            isVisible={this.state.isVisible}
          >
            <iframe
              style={{
                width: '100%',
                height: '100%',
                zIndex: '99999999'
              }}
              frameBorder={0}
              allowTransparency="true"
              src={chrome.extension.getURL('inject.html')}
              id="shopbuddy-iframe"
            />
          </Dock>
        </div>
      );
    } else {
      return (
        <div>
          <CheckoutReminder isDialogVisible={isDialogVisible} />
        </div>

      )
    }

  }
}

// window.addEventListener('onDOMContentLoaded', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
      <InjectApp />
    </MuiThemeProvider>, injectDOM);
// });

window.addEventListener('message', (event) => {
  var shopbuddyIframe = document.getElementById('shopbuddy-iframe');

  // TODO: configure the extension id to be dynamic
  if (event.origin === 'chrome-extension://'+chrome.runtime.id) {
    // request came from shopbuddy
    if (event.data.message === 'GET_CART_ITEMS') {
      // shopbuddy wants items in the cart
      // get the current exchange rate
      // - scrap data from the page and send to shopbuddy React app
      chrome.runtime.sendMessage({action: "GET_DOLLAR_EXCHANGE_RATE"}, function(response) {
        let exchangeRate = response.rate;
        let cartItems = scrapStoreCheckoutPage(window.location.domain, exchangeRate);
        event.source.postMessage({items: cartItems}, 'chrome-extension://'+chrome.runtime.id);
        // shopbuddyIframe.contentWindow.postMessage({items: ['item1', 'item2']}, 'chrome-extension://ghbhjbimmkdgmdmjmbnepgpkpadolfok');
      });
    }
  }
});
