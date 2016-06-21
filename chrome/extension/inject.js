import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import { RaisedButton } from 'material-ui';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import appTheme from '../../app/appTheme.js'

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <RaisedButton
          style={{
            position: 'fixed',
            bottom: 10,
            backgroundColor: '#1976D2',
            left: '45%',
            color: '#fff',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          onClick={this.buttonOnClick}
          label="Proceed To Checkout" />
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
              zIndex: '99999999'
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL('inject.html')}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
      <InjectApp />
    </MuiThemeProvider>, injectDOM);
});
