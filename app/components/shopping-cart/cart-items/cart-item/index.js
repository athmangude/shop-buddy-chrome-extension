import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import accounting from 'accounting';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
import { transparent } from 'material-ui/styles/colors';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cartItem = this.props.cartItem;
        return (
            <ListItem
                primaryText={<div style={{ width: '87%' }}>{this.props.cartItem.title}</div>}
                secondaryText={`${cartItem.quantity} x ${accounting.formatMoney(cartItem.price, {symbol: '', format: "%s %v" })}`}
                leftAvatar={<Avatar src={cartItem.imageUrl} />}
                rightAvatar={
                    <Avatar
                        color={primaryColor} backgroundColor={transparent}
                        style={{ right: 8, width: 90 }}
                    >
                        {`${accounting.formatMoney(Number(cartItem.quantity * cartItem.price), { symbol: "",  format: "%s %v" })}`}
                    </Avatar>
                }
            />
        );
    }
}

export default CartItem;
