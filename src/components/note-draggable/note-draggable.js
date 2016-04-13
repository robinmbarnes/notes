import React, { Component } from 'react';
import styles from './note.css';

export default ({ children, onDragStart }) => {
  return (
    <div onDragStart={ onDragStart }>
      { children }
    </div>
  );
};
