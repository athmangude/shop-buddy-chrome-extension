import React, { Component } from 'react';
import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;

import Transaction from './transaction';

const styles = {
  centeringFlexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 70,
  },
  link: {
    color: accent1Color,
    textDecoration: 'none',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'underline',
    }
  }
}

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
  }

  onLinkClicked(event) {
    event.preventDefault();
    let win = window.open('https://www.amazon.com/', '_blank');
    win.focus();
  }

  renderOrders() {
    if(!this.props.orders.length) {
      return (
        <div
          style={Object.assign({}, styles.centeringFlexContainer, {})}
        >
          <ShoppingBasket style={{ height: 100, width: 100, color: '#232f3e', margin: 0, }} />
          <h4>You have not submitted any carts</h4>
          <p>Visit <a href="https://www.amazon.com/" style={styles.link} onClick={this.onLinkClicked}>Amazon.com</a> and checkout with Shopbuddy to submit your cart</p>
        </div>
      )
    }

    return this.props.orders.map(order => (
      <Transaction key={order._key} order={order} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderOrders()}
      </div>
    );
  }
}

export default TransactionHistory;
