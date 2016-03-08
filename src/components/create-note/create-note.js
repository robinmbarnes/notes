import React, { Component } from 'react';
import styles from './create-note.css';
import classnames from 'classnames';
import * as actions from 'actions';

export default ({ isFresh, title, body, dispatch }) => {
  let titleClassNames = classnames({
    [styles.title]: true,
    [styles.hidden]: isFresh
  });
  let controlsClassNames = classnames({
    [styles.controls]: true,
    [styles.hidden]: isFresh
  });
  return (
    <div className={ styles.container }>
      <input
        className={ titleClassNames }
        type='text'
        placeholder='Title'
        value={ title }
        onChange={ titleChanged(dispatch) }
      />
      <textarea
        className={ styles.body }
        placeholder='Add a note...'
        value={ body }
        onChange={ bodyChanged(isFresh, dispatch) }
      >
      </textarea>
      <div className={ controlsClassNames }>
        <a href='#' onClick={ doneClicked(dispatch) }>Done</a>
      </div>
    </div>
  );
};

const bodyChanged = (isFresh, dispatch) => (changeEvent) => {
  if (isFresh) {
    dispatch(actions.createNoteTouched());
  }
  dispatch(actions.createNoteBodyChanged(changeEvent.target.value));
};

const titleChanged = (dispatch) => (changeEvent) =>
  dispatch(actions.createNoteTitleChanged(changeEvent.target.value));

const doneClicked = (dispatch) => (clickEvent) => {
  clickEvent.preventDefault();
  dispatch(actions.createNoteSubmitted());
};
