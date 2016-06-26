import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class CartItemEditDialog extends Component {

    static propTypes = {
        isDialogOpen: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.isDialogOpen ? this.props.cartItem.quantity : ''
        }
    }

    _onQuantityChanged(event) {
        this.setState({
            quantity: event.target.value,
        });
    }

    _handleClose = () => {
        this.props.onCloseCartItemDialog();
    };

    _handleRemoveFromCart = () => {
        this.props.onCloseCartItemDialog();
    };

    _handleUpdateQuantityInCart = () => {
        this.props.onCloseCartItemDialog();
        this.props.onUpdateCartItem(Object.assign(this.props.cartItem, { quantity: this.state.quantity } ))
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            quantity: nextProps.isDialogOpen ? nextProps.cartItem.quantity : ''
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Remove from Cart"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this._handleRemoveFromCart.bind(this)}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleUpdateQuantityInCart.bind(this)}
            />
        ];
        return (
            <Dialog
                title="Edit Cart Item"
                actions={actions}
                modal={false}
                open={this.props.isDialogOpen}
                onRequestClose={this._handleClose}
            >
                <TextField
                    style={{ width: '100%' }}
                    hintText="How many items are you adjusting to?"
                    floatingLabelText="Adjust the quantity"
                    type="number"
                    min="1"
                    defaultValue={this.state.quantity}
                    onChange={this._onQuantityChanged.bind(this)}
                />
            </Dialog>
        );
    }
}

export default CartItemEditDialog;
