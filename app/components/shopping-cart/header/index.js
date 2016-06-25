import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';

export default class Header extends Component {
  render() {
    return (
      <AppBar
        style={{
          position: 'fixed'
        }}
        title="Shopbuddy"
        iconElementLeft={<IconButton><ShoppingBasket style={{ fontSize: 100 }} /></IconButton>}
      />
    );
  }
}
