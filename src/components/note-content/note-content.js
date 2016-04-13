import React from 'react';
import styles from './note-content.css';

export default ({ note, onSelected, onDeleteClicked }) => {
  return (
    <div
      className={ styles.note }
      onClick={ onSelected }
    >
      <h2>{ note.title }</h2>
      <div>{ note.body }</div>
      <div className={ styles.delete }>
        <a href='#' onClick={ onDeleteClicked }>X</a>
      </div>
    </div>
  );
};
