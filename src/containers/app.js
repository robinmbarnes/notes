import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateNote from 'components/create-note/create-note';
import NotesContainer from 'components/notes-container/notes-container';

class App extends Component {
  render () {
    return (
      <div>
        <CreateNote {...this.props.createNote} dispatch={ this.props.dispatch } />
        <NotesContainer notes={ this.props.notes }  dispatch={ this.props.dispatch } />
      </div>
    );
  }
}

function select (state) {
  return state;
}

export default connect(select)(App);
