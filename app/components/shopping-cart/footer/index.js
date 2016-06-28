import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import accounting from 'accounting';

import Checkout from './checkout';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../appTheme.js';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

const style = {
    margin: 12,
};

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckingOut: false,
            cartItemsSent: false,
            checkingOutComplete: false,
        }
    }

    onShopbuddyCheckout() {
        this.setState({
            isCheckingOut: true,
        });

        
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Paper zDepth={0}>
                    <h1 style={{ fontWeight: 'normal' }}>{`${accounting.formatMoney(this.props.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>
                </Paper>
                <Checkout isCheckingOut={this.state.isCheckingOut} />
                <RaisedButton
                    onTouchTap={this.onShopbuddyCheckout.bind(this)}
                    label="Checkout with Shopbuddy"
                    secondary={true}
                    style={style} />
            </div>
        );
    }
}

export default Footer;
