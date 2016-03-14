import React from 'react';
import styles from './edit-note.css';
import merge from 'ramda/src/merge';
import * as actions from 'actions';

export default function render ({ note, dispatch }) {
  if (!note) {
    return null;
  }
  return(
    <div className={ styles.container }>
      <div className={ styles.editor }>
      <input
        /*className={ titleClassNames }*/
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

const doneClicked = (dispatch) => (clickEvent) => {
  clickEvent.preventDefault();
  dispatch(actions.updateNoteSubmitted());
};
