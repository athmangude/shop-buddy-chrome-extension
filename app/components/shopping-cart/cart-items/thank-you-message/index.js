import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import Heart from 'material-ui/svg-icons/action/favorite';

const styles = {
    button: {
        margin: 10
    }
}

class ThankYouMessage extends Component {
    constructor(props) {
        super(props);
    }

    onContinueShoppingTouchTapped() {
        console.log(this.props);
        this.props.appActions.cancelCheckout();
    }

    render() {
        return (
            <Paper
                zDepth={0}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    marginTop: '40%'
                }}
            >
                <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <h4 style={{ marginBottom: 0 }}>Thank you for using Shopbuddy</h4>
                    <span>Shopbuddy loves [<Heart color="red" style={{ position: 'relative', bottom: -4, height: 18, width: 18 }} />] you</span>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/*<RaisedButton label="Recommend to a friend" secondary={true} style={styles.button} />*/}
                    <RaisedButton
                        label="Continue Shopping"
                        secondary={true}
                        style={styles.button}
                        onTouchTap={this.onContinueShoppingTouchTapped.bind(this)}
                    />
                </div>

            </Paper>
        );
    }
}

export default ThankYouMessage;
