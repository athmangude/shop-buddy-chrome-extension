import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import Formsy, { Form } from 'formsy-react';
import numeral from 'numeral';

import MpesaIcon from 'material-ui/svg-icons/hardware/smartphone';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';

const styles = {
    buttons: {
        margin: 5,
    }
}

class PaymentOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPaymentMethod: 'mpesa',
            canSubmit: false,
        }

        this.onMpesaConfirmationCodeChanged = this.onMpesaConfirmationCodeChanged.bind(this);
        // this.enableButton = this.enableButton.bind(this);
        // this.disableButton = this.disableButton.bind(this);
    }

    onMakePaymentButtonTouchTap() {
        let win = window.open('http://shopbuddy.online/', '_blank');
        win.focus();

        this.props.appActions.endCheckout();
        this.props.cartActions.emptyCart();
    }

    onMpesaConfirmationCodeChanged(event) {
        this.setState({
            mpesaConfirmationCode: event.target.value,
        });
    }

    disableButton() {
        this.props.submitChanged(false);
    }

    enableButton() {
        this.props.submitChanged(true);
    }

    notifyFormError(data) { // eslint-disable-line no-unused-vars
        // console.error('Form error:', data);
    }

    submitForm(data) {
        console.log(data);
    }

    renderPaymentBox() {
        if (this.state.selectedPaymentMethod === 'mpesa') {
            return (
                <div>
                    <p>Pay <strong>KES {numeral(Math.ceil(this.props.total)).format('0,0.00')}</strong> to Mpesa Business #123456, Account #{this.props.authentication.signedInUser.gplusProfile.id}</p>
                    <Form
                        onValid={this.enableButton.bind(this)}
                        onInvalid={this.disableButton.bind(this)}
                        onValidSubmit={this.submitForm}
                        onInvalidSubmit={this.notifyFormError}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <FormsyText
                            name="confirmationCode"
                            type="text"
                            value={this.state.mpesaConfirmationCode}
                            validations={{ isAlphanumeric: true, minLength: 10, maxLength: 10, }}
                            validationErrors={{
                                isAlphanumeric: 'invalid code',
                                minLength: 'too short',
                                maxLength: 'too long',
                            }}
                            required
                            hintText="Mpesa confrimation code"
                            floatingLabelText="Mpesa confirmation code"
                            onChange={this.onMpesaConfirmationCodeChanged}
                            inputStyle={{ textTransform: 'uppercase' }}
                        />
                    </Form>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label="Mpesa"
                    backgroundColor="#8bc43f"
                    hoverColor="#97c956"
                    icon={<MpesaIcon />}
                    // onTouchTap={this.onMakePaymentButtonTouchTap.bind(this)}
                    style={Object.assign({}, styles.buttons)}
                />
                <RaisedButton
                    label="Card"
                    // primary={true}
                    icon={<CreditCardIcon />}
                    disabled
                    // onTouchTap={this.onMakePaymentButtonTouchTap.bind(this)}
                    style={styles.buttons}
                />
                {this.renderPaymentBox()}
            </div>
        );
    }
}

export default PaymentOptions;
