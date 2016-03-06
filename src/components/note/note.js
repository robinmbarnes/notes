import React, { Component } from 'react';
import styles from './note.css';
import classnames from 'classnames';
import * as actions from 'actions';

export default ({ note }) => {
  return (
    <div className={ styles.note }>
      <h2>{ note.title }</h2>
      <div>{ note.body }</div>
    </div>
  );
};
