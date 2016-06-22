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
          <ListItem
            primaryText="Brendan Lim"
            secondaryText={`5 x 500`}
            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/41YcmojSz4L._SS100_.jpg" />}
            rightAvatar={
              <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                2,500
              </Avatar>
            }
          />
          <ListItem
            primaryText="Eric Hoffman"
            secondaryText={`1 x 3,000`}
            leftAvatar={<Avatar src="https://avatars2.githubusercontent.com/u/2655082?v=3&u=e46725a4de477ef1e251e63776729ea8df05c283&s=140" />}
            rightAvatar={
              <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                3,000
              </Avatar>
            }
          />
          <ListItem
            primaryText="Grace Ng"
            secondaryText={`3 x 400`}
            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/51nk%2BaSvOFL._SS100_.jpg" />}
            rightAvatar={
              <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                1,200
              </Avatar>
            }
          />
          <ListItem
            primaryText="Kerem Suer"
            secondaryText={`10 x 4,000`}
            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/41%2B12WrIXlL._SS100_.jpg" />}
            rightAvatar={
              <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
              40,000
              </Avatar>
            }
          />
          <ListItem
            primaryText="Raquel Parrado"
            secondaryText={`2 x 10,000`}
            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/41dX4Glgm7L._SY135_.jpg" />}
            rightAvatar={
              <Avatar
                color={primaryColor} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                20,000
              </Avatar>
            }
          />
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
