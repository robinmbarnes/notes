import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNoteFocused } from 'actions';
import styles from './create-note.css';
import classnames from 'classnames';
import * as actions from 'actions';

export default ({ isFresh, dispatch }) => {
  let titleClassNames = classnames({
    [styles.title]: true,
    [styles.hidden]: isFresh
  });
  return (
    <div className={ styles.container }>
      <input className={ titleClassNames } type='text' placeholder='Title' />
      <textarea
        className={ styles.body }
        placeholder='Add note'
        onChange={ () => {
          if (isFresh) {
            dispatch(actions.createNoteTouched());
          }
        } }
      >
      </textarea>
    </div>
  );
};
