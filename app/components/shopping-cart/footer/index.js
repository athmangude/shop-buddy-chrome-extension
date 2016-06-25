import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import accounting from 'accounting';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../appTheme.js';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

const style = {
    margin: 12,
};

class Footer extends Component {
    constructor(props) {
        super(props);
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
                    {/*<h1 style={{ fontWeight: 'normal', color: primaryColor }}>{`${accounting.formatMoney(this.state.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>*/}
                    <h1 style={{ fontWeight: 'normal' }}>{`${accounting.formatMoney(this.props.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>
                </Paper>
                <RaisedButton
                    label="Checkout with Shopbuddy"
                    secondary={true}
                    style={style} />
            </div>
        );
    }
}

export default Footer;
