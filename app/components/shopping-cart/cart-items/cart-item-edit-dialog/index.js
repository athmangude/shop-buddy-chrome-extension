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
            quantity: this.props.isDialogOpen ? this.props.cartItem.quantity : '',
            title: this.props.isDialogOpen ? this.props.cartItem.title : '',
            isConfirmDeleteDialogOpen: false,
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

    _handleConfirmDeleteDialogClose() {
        this.setState({
            isConfirmDeleteDialogOpen: false,
        });
    }

    _handleDeleteDialogOpen() {
        this.setState({
            isConfirmDeleteDialogOpen: true,
        });
    }

    _handleRemoveFromCart = () => {
        this._handleConfirmDeleteDialogClose();
        this._handleClose();
        this.props.onRemoveCartItem(this.props.cartItem);
    };

    _handleUpdateQuantityInCart = () => {
        this.props.onCloseCartItemDialog();
        this.props.onUpdateCartItem(Object.assign(this.props.cartItem, { quantity: this.state.quantity } ))
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            quantity: nextProps.isDialogOpen ? nextProps.cartItem.quantity : '',
            title: nextProps.isDialogOpen ? nextProps.cartItem.title : 'false'
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Remove from Cart"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this._handleDeleteDialogOpen.bind(this)}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleUpdateQuantityInCart.bind(this)}
            />
        ];

        const deleteDialogAction = [
            <FlatButton
                label="Confirm"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this._handleRemoveFromCart.bind(this)}
            />,
            <FlatButton
                label="No"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleConfirmDeleteDialogClose.bind(this)}
            />
        ];

        return (
            <Dialog
                title={ this.state.title.length > 100 ? `${this.state.title.substring(0, 100)} ...` : `${this.state.title}` }
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
                <Dialog
                    title="Are you sure you want to remove this item?"
                    actions={deleteDialogAction}
                    modal={false}
                    open={this.state.isConfirmDeleteDialogOpen}
                    onRequestClose={this._handleClose}
                >
                    Removed items cart be returned to the cart by refreshing the page. <br /><br />If you don't want the item to be added to the cart later, please remove it from your Amazon cart.
                </Dialog>
            </Dialog>
        );
    }
}

export default CartItemEditDialog;
