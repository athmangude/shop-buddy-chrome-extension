import React, { Component } from 'react';
import { Avatar, RaisedButton } from 'material-ui';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
    avatar: {
        // margin: 5,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 25,
    },
    logoutButton: {
        // margin: 10,
    }
}

class AccountInfo extends Component {
    constructor(props) {
        super(props);
    }

    onLogoutTouchTapped() {
        this.props.authenticationActions.signOut();
    }

    render() {
        return (
            <div style={styles.container}>
                <Avatar
                    src={this.props.authentication.signedInUser.gplusProfile.image.url}
                    size={160}
                    style={styles.avatar}
                />
                <h5>{this.props.authentication.signedInUser.gplusProfile.displayName}</h5>
                <RaisedButton style={styles.logoutButton} label="Sign Out" secondary={true} onTouchTap={this.onLogoutTouchTapped.bind(this)} icon={<ExitToApp />} />
            </div>
        );
    }
}

export default AccountInfo;
