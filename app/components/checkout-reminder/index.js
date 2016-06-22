import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class CheckoutReminder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Sure"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                {/*<RaisedButton label="Dialog" onTouchTap={this.handleOpen} />*/}
                <Dialog
                    title="Remember to Checkout with Shopbuddy"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Shopbuddy helps you shop at Amazon conveniently and hustle free and have your goods delivered at your doorstep
                </Dialog>
            </div>
        );
    }
}

export default CheckoutReminder;
