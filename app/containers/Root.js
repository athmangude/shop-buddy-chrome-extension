import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import appTheme from '../appTheme.js';

injectTapEventPlugin();

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
