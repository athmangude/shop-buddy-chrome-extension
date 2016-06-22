import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import CommunicationCall from 'material-ui/svg-icons/action/shopping-basket';

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <AppBar
        style={{
          position: 'fixed'
        }}
        title="Shopbuddy"
        iconElementLeft={<IconButton><CommunicationCall style={{ fontSize: 100 }} /></IconButton>}
      />
    );
  }
}
