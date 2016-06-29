import React, { Component } from 'react';
import { Dialog, CircularProgress, FlatButton } from 'material-ui';

import PaymentOptions from './payment-options';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;



class Checkout extends Component {
    constructor(props) {
        super(props);
    }

    onCheckoutCancelled() {
        this.props.appActions.cancelCheckout();
    }

    render() {
        console.log(this.props.app.isCheckingOut);
        let dialogComponent;
        this.props.app.isSendingCart ? dialogComponent = <CircularProgress size={2} secondary={true} color={accent1Color} /> : dialogComponent = <PaymentOptions { ...this.props } />

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                disabled={!this.props.app.isCartSendingResponseReceived}
                onTouchTap={this.onCheckoutCancelled.bind(this)}
            />,
        ];

        return (
            <Dialog
                title={this.props.app.isSendingCart ? "Hang tight! We are Sending your cart to our Servers" : "We Have Received your Cart"}
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
