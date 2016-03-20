import React, { Component } from 'react';
import styles from './note.css';
import classnames from 'classnames';
import * as actions from 'actions';

export default ({ note, dispatch }) => {
  return (
    <div
      className={ styles.note }
      onClick={ selectNote(note, dispatch) }
      draggable='true'
      onDragStart={ onDragStart }
    >
      <h2>{ note.title }</h2>
      <div>{ note.body }</div>
      <div className={ styles.delete }>
        <a href='#' onClick={ deleteNote(note._id, dispatch) }>X</a>
      </div>
    </div>
  );
};

const selectNote = (note, dispatch) => () => dispatch(actions.noteSelected(note));
const deleteNote = (_id, dispatch) => (clickEvent) => {
  clickEvent.stopPropagation();
  dispatch(actions.noteDeleted(_id));
};
const onDragStart = (dragEvent) => {
  console.log('Dragged', dragEvent);
}
