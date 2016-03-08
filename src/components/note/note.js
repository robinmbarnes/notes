import React, { Component } from 'react';
import styles from './note.css';
import classnames from 'classnames';
import * as actions from 'actions';

export default ({ note, dispatch }) => {
  return (
    <div onClick={ selectNote(note._id, dispatch) } className={ styles.note }>
      <h2>{ note.title }</h2>
      <div>{ note.body }</div>
    </div>
  );
};

const selectNote = (_id, dispatch) => () => dispatch(actions.noteSelected(_id));
