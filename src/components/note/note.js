import React, { Component } from 'react';
import styles from './note.css';
import * as actions from 'actions';

export default ({ note, dispatch }) => {
  return (
    <div
      className={ styles.note }
      onClick={ selectNote(note, dispatch) }
      draggable='true'
      onDragOver={ onDragOver(dispatch, note) }
      onDragStart={ onDragStart(dispatch, note) }
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
const onDragStart = (dispatch, note) => (dragEvent) => {
  dragEvent.dataTransfer.dropEffect = 'move';
  dispatch(actions.noteDragStart(note));
};
const onDragOver = (dispatch, note) => (dragEvent) => {
  dispatch(actions.noteDropZoneActivated(note));
}
