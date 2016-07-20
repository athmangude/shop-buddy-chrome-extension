import React, { Component } from 'react';
import { RaisedButton, Avatar, Snackbar, CircularProgress } from 'material-ui';
import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import FontIcon from 'material-ui/FontIcon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../../appTheme.js';
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;

const styles = {
    container: {
        height: '100vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    googleIcon: {
        marginTop: 20,
        marginRight: 40,
    },

    googleAPIsWaitingMessageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
}

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: null,
            chromeUser: null,
            gplusProfile: null,
            googleAPIsReady: false,
            snackbarOpen: false,
        }
    }

    authorize(params, callback) {
        window.gapi.auth.authorize(Object.assign({ 'immediate': false, }, params, { scope: params.scopes[0] }), (accessToken) => {
            if (!accessToken) {
                console.log('not authorized');
            } else {
                callback(accessToken);
            }
        });
    }

    onStartShoppingClicked() {
        console.log('finish signing in');
    }

    onSignInClicked() {
        chrome.identity.getAuthToken({ 'interactive': true }, (token) => {

            // update token in chrome
            this.setState({
                authToken: token,
            });

            chrome.identity.getProfileUserInfo( (userInfo) => {

                // update chrome user in state
                this.setState({
                    chromeUser: userInfo,
                });

                window.gapi.auth.init(() => {
                    const params = { immediate: true, client_id: chrome.runtime.getManifest().oauth2.client_id, scope: chrome.runtime.getManifest().oauth2.scopes };

                    window.gapi.auth.authorize(params, (result) => {
                        window.gapi.client.request({
                            'path': `/plus/v1/people/${userInfo.id}`,
                            'callback': (result) => {

                                if (result.error) {

                                    // retry loging the user in one more time
                                    window.gapi.auth.authorize(params, (result) => {
                                        window.gapi.client.request({
                                            'path': `/plus/v1/people/${userInfo.id}`,
                                            'callback': (result) => {

                                                if (result.error) {
                                                    // open the snack to display the error
                                                    this.setState({
                                                        snackbarOpen: true,
                                                    });

                                                    return;
                                                }

                                                // update gplusProfile
                                                this.setState({
                                                    gplusProfile: result
                                                });
                                            }
                                        });
                                    });

                                    return;
                                }

                                // update gplusProfile
                                this.setState({
                                    gplusProfile: result
                                });
                            }
                        });
                    });
                });
            });
        });
    }

    handleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    componentDidMount() {
        const googleAPIsReadyIntervalId = window.setInterval( () => {
            if (window.gapi) {
                this.setState({
                    googleAPIsReady: true,
                });

                window.clearInterval(googleAPIsReadyIntervalId);
            }
        }, 10);
    }

    render() {
        let actionButton;

        if (this.state.googleAPIsReady) {
            this.state.gplusProfile ? actionButton =  <RaisedButton label="Start Shopping" secondary={true} onTouchTap={this.onStartShoppingClicked.bind(this)} icon={<ShoppingBasket />} /> : actionButton =  <RaisedButton label="SignIn with Google" disabled={!this.state.googleAPIsReady} onTouchTap={this.onSignInClicked.bind(this)} icon={<FontIcon className="fa fa-google" style={styles.googleIcon} />} />;
        } else {
            actionButton =  <div style={styles.googleAPIsWaitingMessageContainer}>
                                <CircularProgress size={0.5} color={accent1Color} />
                                <label>Waiting for Google APIs</label>
                                <small style={{fontSize: 10}}>This is because you have a bad internet connection</small>
                                <small>(Check your internet connection and reload by pressing <code>CTRL+R</code> or <code>&#8984;+R</code>)</small>
                            </div>
        }

        return (
            <div style={styles.container}>
                <Avatar
                    src={this.state.gplusProfile ? this.state.gplusProfile.image.url : 'chrome-extension://jllbjccoodgjljdmpijpmkhmdkndamho/img/icon-128.png'}
                    size={130}
                />
                <h5>{this.state.gplusProfile ? `You are logged in as ${this.state.gplusProfile.name.givenName}` : `Sign in to start using Shopbuddy`}</h5>
                {actionButton}
                <Snackbar
                    open={this.state.snackbarOpen}
                    message="Oops! We couldn't sign you in. Please sign in to Chrome and try again."
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default SignIn;
