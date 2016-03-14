import React from 'react';
import styles from './edit-note.css';

export default function render ({ note }) {
  if (!note) {
    return null;
  }
  return(
    <div className={ styles.container }>
      <div className={ styles.editor }>
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
      </div>
    </div>
  );
}
