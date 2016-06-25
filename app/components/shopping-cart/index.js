import React, { Component } from 'react';
import Header from './header';
import MainSection from '../MainSection';
import CartItems from './cart-items';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                {/*<MainSection actions={this.props.actions} cartItems={this.props.cartItems} />*/}
                <CartItems actions={this.props.actions} cartItems={this.props.cartItems} />
            </div>
        );
    }
}

export default ShoppingCart;
