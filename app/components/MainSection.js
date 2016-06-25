import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { Paper } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import accounting from 'accounting';

import appTheme from '../appTheme.js';

const primaryColor = getMuiTheme(appTheme).palette.primary1Color;

const style = {
  margin: 12,
};

class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      total: 0,
    }
  }

  _calculateTotal(cartItems) {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.price;
    });

    return total;
  }

  componentDidMount() {
    let total = this._calculateTotal(this.props.cartItems);
    this.setState({
      total: total,
    });
  }

  componentWillReceiveProps(nextProps) {
    let total = this._calculateTotal(nextProps.cartItems);
    this.setState({
      total: total,
    });
  }

  render() {
    return (
      <section style={{
        paddingTop: 60
      }}>
        <List>
          <Subheader>Items in your cart</Subheader>
          {this.props.cartItems.map((cartItem, i) => (
            <ListItem
              key={cartItem.id}
              primaryText={<div style={{ width: '87%' }}>{cartItem.title}</div>}
              secondaryText={`${cartItem.quantity} x ${accounting.formatMoney(cartItem.price, {symbol: '', format: "%s %v" })}`}
              leftAvatar={<Avatar src={cartItem.imageUrl} />}
              rightAvatar={
                <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 90 }}
                >
                {`${accounting.formatMoney(Number(cartItem.quantity * cartItem.price), { symbol: "",  format: "%s %v" })}`}
                </Avatar>
              }
            />
          ))}
        </List>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Paper zDepth={0}>
            <h1 style={{ fontWeight: 'normal', color: primaryColor }}>{`${accounting.formatMoney(this.state.total, { symbol: 'KES', format: '%s %v' })}`}/-</h1>
          </Paper>
          <RaisedButton
          label="Checkout with Shopbuddy"
          secondary={true}
          style={style} />
        </div>
      </section>
    );
  }
}

export default MainSection;
