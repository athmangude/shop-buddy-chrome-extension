import React, { Component, PropTypes } from 'react';
import { Paper } from 'material-ui';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {transparent} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import accounting from 'accounting';

import CartItem from './cart-item';
import appTheme from '../../../appTheme.js';

const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

const style = {
    margin: 12,
};

class CartItems extends Component {

    static propTypes = {
        cartItems: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            total: 0,
        }
    }

    _calculateTotal(cartItems) {
        let total = 0;
        cartItems.forEach((cartItem) => {
            total += cartItem.quantity * cartItem.price;
        });

        return total;
    }

    componentDidMount() {
        let total = this._calculateTotal(this.props.cartItems);
        this.setState({
            total: total,
        });
    }

    componentWillReceiveProps(nextProps) {
        let total = this._calculateTotal(nextProps.cartItems);
        this.setState({
            total: total,
        });
    }

    render() {
        return (
            <section style={{
                paddingTop: 60
            }}>
                <List>
                    <Subheader>Items in your cart</Subheader>
                    {this.props.cartItems.map((cartItem, i) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                </List>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Paper zDepth={0}>
                        <h1 style={{ fontWeight: 'normal', color: primaryColor }}>{`${accounting.formatMoney(this.state.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>
                    </Paper>
                    <RaisedButton
                        label="Checkout with Shopbuddy"
                        secondary={true}
                        style={style} />
                </div>
            </section>
        );
    }
}

export default CartItems;
