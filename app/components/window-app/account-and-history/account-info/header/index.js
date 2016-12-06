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
      padding: '25px 10px',
      width: '100%',
      height: 300,
    },
    logoutButton: {
      // margin: 10,
    }
}

class Header extends Component {
    constructor(props) {
      super(props);
    }

    onLogoutTouchTapped() {
      this.props.authenticationActions.signOut();
    }

    render() {
      console.log(this.props.authentication);
      // glus default cover image: https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=w2048-h1152-n-rw-no
      return (
        <div style={Object.assign({}, styles.container, {
            // background: `url("${this.props.authentication.signedInUser.gplusProfile.cover.coverPhoto.url}") no-repeat center center fixed`,
            // backgroundSize: '100%',
            // opacity: 0.4,
        })}>
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

export default Header;
