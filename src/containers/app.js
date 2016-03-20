import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateNote from 'components/create-note/create-note';
import NotesContainer from 'components/notes-container/notes-container';
import EditNote from 'components/edit-note/edit-note';

class App extends Component {
  render () {
    return (
      <div>
        <CreateNote {...this.props.createNote} dispatch={ this.props.dispatch } />
        <NotesContainer notes={ this.props.notes }  dispatch={ this.props.dispatch } />
        <EditNote { ...this.props.updateNote  } dispatch={ this.props.dispatch } />
      </div>
    );
  }
}

function select (state) {
  return state;
}

export default connect(select)(App);
