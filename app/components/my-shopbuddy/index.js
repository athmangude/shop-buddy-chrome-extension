import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import moment from 'moment';
import Radium from 'radium';

import Header from '../shopping-cart/header';
import Footer from './footer';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appTheme from '../../appTheme.js';
const primaryColor = getMuiTheme(appTheme).palette.primary1Color;
const accent1Color = getMuiTheme(appTheme).palette.accent1Color;

const styles = {
    container: {
        padding: 10,
        paddingTop: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        flexDirection: 'column'
    },
    badge: {
        position: 'relative',
        top: -30,
        left: 68,
    },
    line: {
        margin: 0,
    },
    paragraph: {
        margin: 0,
        fontSize: 'smaller'
    },
    link: {
        color: accent1Color,
        textDecoration: 'none',
        fontWeight: 'bold',
        ':hover': {
            textDecoration: 'underline',
        }
    }
}

@Radium
class MyShopbuddy extends Component {
    constructor(props) {
        super(props);
    }

    onLinkClicked(event) {
        event.preventDefault();
        let win = window.open('https://www.amazon.com/', '_blank');
        win.focus();

    }

    render() {
        let lastSuccessfulCheckout = this.props.app.lastSuccessfulCheckout ? <p style={styles.paragraph}>You last checked out {`${moment(this.props.app.lastSuccessfulCheckout).fromNow()}`}</p> : '';
        return (
            <div style={{
                height: 350
            }}>
                <Header rightIcon="version" />
                <div style={styles.container}>
                    <p>Visit <a href="https://www.amazon.com/" style={styles.link} onClick={this.onLinkClicked}>Amazon.com</a> to continue shopping </p>
                    <Badge
                        badgeContent={this.props.cartItems.length}
                        primary={true}
                        badgeStyle={styles.badge}
                    >
                        <ShoppingBasket style={{ height: 100, width: 100, color: primaryColor, margin: 0, }} />
                    </Badge>

                    <h4 style={styles.line}>You have {`${this.props.cartItems.length}`} items in your cart</h4>
                    {lastSuccessfulCheckout}
                </div>
                <Footer authentication={this.props.authentication} />
            </div>
        )
    }
}

export default MyShopbuddy;
