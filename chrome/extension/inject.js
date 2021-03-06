import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import { RaisedButton } from 'material-ui';
import $ from 'jquery';


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

  // buttonOnClick = () => {
  //   this.setState({ isVisible: !this.state.isVisible });
  // };

  componentDidMount() {
    window.addEventListener('message', (event) => {
      if(event.data.message) {
        // show or hide the dock depending on the message received
        if (event.data.message === 'HIDE_DOCK') {
          this.setState({
            isVisible: false,
          });
        } else if (event.data.message === 'SHOW_DOCK') {
          this.setState({
            isVisible: true,
          });
        }
      }
    });
  }

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
          {/*<RaisedButton
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
            secondary={true} />*/}
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

$(document).ready(() => {
  if (!$('#shopbuddy-checkout-button-container').length) {
    $('<div id="shopbuddy-checkout-button-container" style="padding: 15px 0;">\
      <button id="shopbuddy-checkout-button" style="background: rgb(240, 193, 75); color: white; border: none; box-shadow: 1px 1px 1px rgba(0,0,0,0.3); text-transform: uppercase; text-align: center; width: 100%; height: 35px; border-radius: 2px; font-size: 15px; margin-bottom: 12px; ">Shopbuddy Checkout</button>\
      <div class="a-divider a-divider-break sc-one-click-divider" style="margin-bottom: 0;">\
        <h5>or</h5>\
      </div>\
    </div>').insertAfter('#sc-buy-box div.sc-subtotal.a-spacing-mini');
    // const injectButton = $('#shopbuddy-checkout-button-container');

    $('#shopbuddy-checkout-button-container').on('click', '#shopbuddy-checkout-button', function (event) {
      event.preventDefault();
      window.postMessage({message: 'SHOW_DOCK'}, '*');
    });
  }
});

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
        console.log(cartItems);
        // TODO: get items from amazon using ASIN code
        chrome.runtime.sendMessage({ action: "LOOK_UP_AMAZON_ITEMS", items: cartItems }, function(response) {
          console.log(response);
        });
        // TODO: calculate pricing
        event.source.postMessage({items: cartItems}, 'chrome-extension://'+chrome.runtime.id);
        // shopbuddyIframe.contentWindow.postMessage({items: ['item1', 'item2']}, 'chrome-extension://ghbhjbimmkdgmdmjmbnepgpkpadolfok');
      });
    }
  }
});
