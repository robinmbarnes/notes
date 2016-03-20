import React, { Component } from 'react';
import styles from './edit-note.css';
import merge from 'ramda/src/merge';
import * as actions from 'actions';

export default ({ note, dispatch }) => {
  if (!note) {
    return <div className={ styles.hidden } />;
  }
  const { _id, title, body } = note;
  return(
    <div className={ styles.container }>
      <div className={ styles.editor }>
        <input
          className={ styles.title }
          type='text'
          placeholder='Title'
          value={ title }
          onChange={ handleChange(dispatch, note, 'title') }
        />
        <textarea
          className={ styles.body }
          placeholder='Add a note...'
          value={ body }
          onChange={ handleChange(dispatch, note, 'body') }
        ></textarea>
        <div className={ styles.controls }>
          <a href="#" onClick={ doneClicked(dispatch, note) }>Done</a>
          &nbsp;
          <a href="#" onClick={ cancelClicked(dispatch) }>Cancel</a>
        </div>
      </div>
    </div>
  );
}
const handleChange = (dispatch, note, field) => (changeEvent) =>
  dispatch(
    actions.updateNoteChanged(
      merge(note, { [field]: changeEvent.target.value })
    )
  );

const doneClicked = (dispatch, note) => (clickEvent) => {
  clickEvent.preventDefault();
  dispatch(actions.updateNoteSubmitted(note));
};

const cancelClicked = (dispatch) => (clickEvent) => {
  clickEvent.preventDefault();
  dispatch(actions.cancelUpdateNote());
};
