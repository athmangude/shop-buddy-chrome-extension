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
import EmptyCart from './empty-cart';
import Footer from '../footer';
import CartItemEditDialog from './cart-item-edit-dialog';
import appTheme from '../../../appTheme.js';

class CartItems extends Component {

    static propTypes = {
        cartItems: PropTypes.array.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            total: 0,
            isDialogOpen: false,
            cartItemInDialog: null,
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

    onCartItemDialogOpened(cartItem) {
        setTimeout( () => {
            this.setState({
                isDialogOpen: true,
                cartItemInDialog: cartItem,
            });
        }, 250);
    }

    onCartItemDialogClosed() {
        this.setState({
            isDialogOpen: false,
            cartItemInDialog: null,
        })
    }

    onCartItemUpdated(cartItem) {
        this.props.actions.updateCartItem(cartItem)
    }

    onCartItemDeleted(cartItem) {
        this.props.actions.deleteCartItem(cartItem);
    }

    render() {
        if (this.props.cartItems.length) {
            return (
                <section style={{
                    paddingTop: 60
                }}>
                    <CartItemEditDialog isDialogOpen={this.state.isDialogOpen} cartItem={this.state.cartItemInDialog} onCloseCartItemDialog={this.onCartItemDialogClosed.bind(this)} onUpdateCartItem={this.onCartItemUpdated.bind(this)} onRemoveCartItem={this.onCartItemDeleted.bind(this)} />
                    <List>
                        <Subheader>Items in your cart</Subheader>
                        {this.props.cartItems.map((cartItem, i) => (
                            <CartItem key={cartItem.id} cartItem={cartItem} onOpenCartItemDialog={this.onCartItemDialogOpened.bind(this)}  />
                        ))}
                    </List>
                    <Footer total={this.state.total} cartItems={this.props.cartItems} />
                </section>
            );
        } else {
            return (
                <section style={{
                    paddingTop: 60
                }}>
                    <EmptyCart />
                </section>
            );
        }
    }
}

export default CartItems;
