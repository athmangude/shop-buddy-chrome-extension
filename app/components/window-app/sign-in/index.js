import React, { Component } from 'react';
import { RaisedButton, Avatar } from 'material-ui';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

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
                                console.log(result);

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

        this.state.gplusProfile ? actionButton =  <RaisedButton label="Start Shopping" secondary={true} onTouchTap={this.onStartShoppingClicked.bind(this)} /> : actionButton =  <RaisedButton label="SignIn with Google" disabled={!this.state.googleAPIsReady} onTouchTap={this.onSignInClicked.bind(this)} icon={<FontIcon className="fa fa-google" style={styles.googleIcon} />} />;

        return (
            <div style={styles.container}>
                <Avatar
                    src={this.state.gplusProfile ? this.state.gplusProfile.image.url : 'chrome-extension://jllbjccoodgjljdmpijpmkhmdkndamho/img/icon-128.png'}
                    size={130}
                />
                <h5>{this.state.gplusProfile ? `You are logged in as ${this.state.gplusProfile.name.givenName}` : `Sign in to start using Shopbuddy`}</h5>
                {actionButton}
            </div>
        );
    }
}

export default SignIn;
