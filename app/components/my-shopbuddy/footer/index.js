import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

let windowId = 0;

const styles = {
    centeringFlexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 2px',

    },
    fullWidthButton: {
        width: '100%',
    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    closeWindowIfExists() {
        if (windowId > 0) {
            chrome.windows.remove(windowId);
            windowId = chrome.windows.WINDOW_ID_NONE;
        }
    }

    onViewTransactionHistoryTouchTapped() {
        this.closeWindowIfExists();
        const options = {
            type: 'popup',
            left: 100, top: 100,
            width: 800, height: 475
        };

        // if (type === 'open') {
        options.url = 'window.html';
        chrome.windows.create(options, (win) => {
            windowId = win.id;
        });
        // }
    }

    render() {
        return (
            <div style={styles.centeringFlexBox}>
                <RaisedButton secondary={true} label="View Transaction History" fullWidth={true} onTouchTap={this.onViewTransactionHistoryTouchTapped.bind(this)} style={styles.fullWidthButton} />
            </div>
        );
    }
}

export default Footer;
