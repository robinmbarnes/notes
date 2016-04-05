import React, { Component } from 'react';
import styles from './notes-container.css';
import classnames from 'classnames';
import * as actions from 'actions';
import Note from 'components/note/note';

export default ({ notes, dispatch }) => {
  return (
    <div className={ styles.container }>
    { notes.map((note, i) =>
      <Note
        note={ note }
        key={ note._id }
        dispatch={ dispatch }
        position={ i }
      />) }
    </div>
  );
};
