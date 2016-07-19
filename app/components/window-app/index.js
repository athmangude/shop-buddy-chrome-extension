import React, { Component } from 'react';

import AccountAndHistory from './account-and-history';
import SignIn from './sign-in';

class WindowApp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.authentication.isLoggedIn) {
            return (
                <SignIn />
            )
        }

        return (
            <AccountAndHistory />
        )
    }
}

export default WindowApp;
