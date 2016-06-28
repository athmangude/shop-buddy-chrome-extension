import React, { Component } from 'react';
import { Dialog, CircularProgress } from 'material-ui';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../../appTheme.js';
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;

class Checkout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                title="Hang tight! We are Sending your cart to our Servers"
                modal={true}
                open={this.props.isCheckingOut}
            >
                <div style={{
                    display: 'flex',
                    // alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircularProgress size={2} secondary={true} color={accent1Color} />
                </div>
            </Dialog>
        )
    }
}

export default Checkout;
