import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {pinkA200, transparent} from 'material-ui/styles/colors';

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
      <section>
        <List>
          <Subheader>Items in your cart</Subheader>
          <ListItem
            primaryText="Brendan Lim"
            secondaryText={`5 x 500`}
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            rightAvatar={
              <Avatar
                color={pinkA200} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                2,500
              </Avatar>
            }
          />
          <ListItem
            primaryText="Eric Hoffman"
            secondaryText={`1 x 3,000`}
            leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            rightAvatar={
              <Avatar
                color={pinkA200} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                3,000
              </Avatar>
            }
          />
          <ListItem
            primaryText="Grace Ng"
            secondaryText={`3 x 400`}
            leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
            rightAvatar={
              <Avatar
                color={pinkA200} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
                1,200
              </Avatar>
            }
          />
          <ListItem
            primaryText="Kerem Suer"
            secondaryText={`10 x 4,000`}
            leftAvatar={<Avatar src="images/kerem-128.jpg" />}
            rightAvatar={
              <Avatar
                color={pinkA200} backgroundColor={transparent}
                style={{ right: 8, width: 60 }}
              >
              40,000
              </Avatar>
            }
          />
          <ListItem
            primaryText="Raquel Parrado"
            secondaryText={`2 x 10,000`}
            leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
            rightAvatar={
              <Avatar
                color={pinkA200} backgroundColor={transparent}
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
          justifyContent: 'center'
        }}>
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
