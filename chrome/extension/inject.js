import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import { RaisedButton } from 'material-ui';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import appTheme from '../../app/appTheme.js';

try {
  injectTapEventPlugin();
} catch (e) {
  console.log(e);
} finally {
  console.log('...');
}

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
            left: '45%',
            marginLeft: 'auto',
            marginRight: 'auto',
            zIndex: '99999998'
          }}
          onTouchTap={this.buttonOnClick}
          label="Proceed To Checkout"
          secondary={true} />
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
            id="shopbuddy-iframe"
          />
        </Dock>
      </div>
    );
  }
}

// window.addEventListener('onDOMContentLoaded', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
      <InjectApp />
    </MuiThemeProvider>, injectDOM);
// });

window.addEventListener('message', (event) => {
  console.log(event);
  var shopbuddyIframe = document.getElementById('shopbuddy-iframe');
  if (event.origin === 'chrome-extension://ghbhjbimmkdgmdmjmbnepgpkpadolfok') {
    // request came from shopbuddy
    event.source.postMessage({items: ['item1', 'item2']}, 'chrome-extension://ghbhjbimmkdgmdmjmbnepgpkpadolfok');
    // shopbuddyIframe.contentWindow.postMessage({items: ['item1', 'item2']}, 'chrome-extension://ghbhjbimmkdgmdmjmbnepgpkpadolfok');
  }
})
