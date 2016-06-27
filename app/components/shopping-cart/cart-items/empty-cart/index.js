import React, { Component } from 'react';
import { Card, CardText, CardTitle, Paper } from 'material-ui';

class EmptyCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={0}>
                <CardTitle title="There are no items in your cart" />
                <CardText>
                    To add items into your cart, add them to your Amazon cart as you would while shopping normally on Amazon. Then navigate to your cart to view your cart items. Then click on the <strong>SHOPBUDDY CHECKOUT</strong> button to proceed to checkout.
                </CardText>
            </Paper>
        );
    }
}

export default EmptyCart;
