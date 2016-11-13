import React, { Component } from 'react';
import { Dialog, CircularProgress, FlatButton } from 'material-ui';

import PaymentOptions from './payment-options';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;



class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
        }

        this.onCheckoutConfirmed = this.onCheckoutConfirmed.bind(this);
        this.onCheckoutCancelled = this.onCheckoutCancelled.bind(this);
        this.onSubmitChanged = this.onSubmitChanged.bind(this);
    }

    onCheckoutCancelled() {
        this.props.appActions.cancelCheckout();
    }

    onCheckoutConfirmed() {
        const mpesaConfirmationCode = this.refs.paymentOptions.state.mpesaConfirmationCode;
        const cartId = this.props.cartId;

        this.props.firebaseRefs.database.carts.child(cartId).update({
            paymentInfo: {
                paid: true,
                paymentType: 'mpesa',
                mpesaConfirmationCode: mpesaConfirmationCode,
                paymentConfirmed: false,
            }
        }, (error) => {
            if (error) {
                return console.log('there was an error updating the cart');
            }
            console.log('payment details were updated successfully');
            this.props.appActions.endCheckout();
            this.props.cartActions.emptyCart();
        });
    }

    onSubmitChanged(status) {
        this.setState({
            canSubmit: status,
        });
    }


    getDialogTitle() {
      if (this.props.app.isSendingCart) {
        return 'Hang tight! We are Sending your cart to our Servers'
      }

      if (!this.props.app.checkoutError) {
        return 'Select Your Payment Method'
      }

      return 'There was an error sending your cart'
    }

    render() {
        let dialogComponent;
        this.props.app.isSendingCart ? dialogComponent = <CircularProgress size={2} secondary={true} color={accent1Color} /> : dialogComponent = <PaymentOptions ref="paymentOptions" { ...this.props } submitChanged={this.onSubmitChanged} />

        const actions = [
            <FlatButton
                label="Cancel"
                secondary
                disabled={!this.props.app.isCartSendingResponseReceived}
                onTouchTap={this.onCheckoutCancelled}
            />,
            <FlatButton
                label="Submit"
                primary
                disabled={!(this.props.app.isCartSendingResponseReceived && this.state.canSubmit)}
                onTouchTap={this.onCheckoutConfirmed}
            />,
        ];

        return (
            <Dialog
                title={this.getDialogTitle()}
                titleStyle={{textAlign: 'center'}}
                modal={true}
                actions={actions}
                open={this.props.app.isCheckingOut}
            >
                <div style={{
                    display: 'flex',
                    // alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {dialogComponent}
                </div>
            </Dialog>
        )
    }
}

export default Checkout;
