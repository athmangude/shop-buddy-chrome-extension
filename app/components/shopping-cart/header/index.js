import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import ClearIcon from 'material-ui/svg-icons/content/clear';

export default class Header extends Component {
  onCloseTouchTapped() {
    window.parent.postMessage({ message: 'HIDE_DOCK' }, '*');
  }

  render() {
    let rightIcon;
    if (this.props.rightIcon === 'close') {
      rightIcon = <IconButton tooltip="Close" onTouchTap={this.onCloseTouchTapped.bind(this)}><ClearIcon style={{ fontSize: 100 }} /></IconButton>
    } else {
      rightIcon = <div></div>
    }
    return (
      <AppBar
        style={Object.assign({
          position: 'fixed'
        }, this.props.appBarStyles ? this.props.appBarStyles : {})}
        title="Shopbuddy"
        iconElementLeft={<IconButton><ShoppingBasket style={{ fontSize: 100 }} /></IconButton>}
        iconElementRight={rightIcon}
      />
    );
  }
}
