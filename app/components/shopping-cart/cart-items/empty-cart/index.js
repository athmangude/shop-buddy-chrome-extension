import React, { Component } from 'react';
import { Card, CardText, CardTitle, Paper, RaisedButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;

class EmptyCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={0}>
                <CardTitle title="There are no items in your cart" />
                <CardText>
                    To add items into your cart, add them to your Amazon cart as you would while shopping normally on Amazon. Then navigate to your cart to view your cart items. Then click on the <RaisedButton secondary={true} disabled={true} style={{ fontWeight: 'bold', color: 'white', display: 'inline-block', paddingLeft: 10, paddingRight: 10, backgroundColor: accent1Color }}>SHOPBUDDY CHECKOUT</RaisedButton> button to reveal your shopbuddy cart and proceed to checkout.
                </CardText>
            </Paper>
        );
    }
}

export default EmptyCart;
