import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { Paper } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
              key={cartItem.asin}
              primaryText={<div style={{ width: '91%' }}>{cartItem.title}</div>}
              secondaryText={`${cartItem.quantity} x $${cartItem.price}`}
              leftAvatar={<Avatar src={cartItem.imageUrl} />}
              rightAvatar={
                <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
                >
                {`$${Number(cartItem.quantity * cartItem.price)}`}
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
            <h1 style={{ fontWeight: 'normal', color: primaryColor }}>KES. 98,500/-</h1>
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
