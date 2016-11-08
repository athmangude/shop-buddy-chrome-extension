import React, { Component } from 'react';
import Header from './header';
import CartItems from './cart-items';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          <Header rightIcon='close' />
          <CartItems { ...this.props } />
        </div>
      );
    }
}

export default ShoppingCart;
