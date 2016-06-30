import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

class PaymentMethods extends Component {
    constructor(props) {
        super(props);
    }

    onMakePaymentButtonTouchTap() {
        let win = window.open('http://shopbuddy.online/', '_blank');
        win.focus();

        this.props.appActions.endCheckout();
        this.props.cartActions.emptyCart();
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label="Make your payment"
                    primary={true}
                    onTouchTap={this.onMakePaymentButtonTouchTap.bind(this)}
                />
            </div>
        );
    }
}

export default PaymentMethods;
