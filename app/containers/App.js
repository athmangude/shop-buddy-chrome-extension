import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from '../appTheme.js';


@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
      setTimeout(function () {
          if (window.parent) {
              console.log(window.parent.postMessage({ message: 'GET_CART_ITEMS' }, '*'));
          }
      }, 1000);

      window.addEventListener('message', (event) => {
          console.log(event);
      })
  }

  render() {
    const { todos, actions } = this.props;

    return (
        <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
            <div>
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
            </div>
        </MuiThemeProvider>
    );
  }
}
