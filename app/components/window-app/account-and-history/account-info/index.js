import React, { Component } from 'react';
import { Avatar, RaisedButton } from 'material-ui';

const styles = {
    avatar: {
        margin: 5,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    logoutButton: {
        margin: 10,
    }
}

class AccountInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.container}>
                <Avatar
                    src="images/uxceo-128.jpg"
                    size={160}
                    style={styles.avatar}
                />
                Firstname Surname
                <RaisedButton style={styles.logoutButton} label="Logout" secondary={true} />
            </div>
        );
    }
}

export default AccountInfo;
