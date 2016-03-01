import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateNote from 'components/create-note/create-note';

class App extends Component {
  render () {
    return (
      <CreateNote {...this.props.createNote} dispatch={ this.props.dispatch } />
    );
  }
}

function select (state) {
  return state;
}

export default connect(select)(App);
