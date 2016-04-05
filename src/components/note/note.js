import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styles from './note.css';
import * as actions from 'actions';
import classnames from 'classNames';
import { connect } from 'react-redux';
import { getLeftForElement, getTopForElement } from 'utils/dom';

class Note extends Component {
  constructor () {
    super();
    this.state = {
      x: 0,
      y: 0,
      translateX: 0,
      translateY: 0
    };
  }

  render () {
    const { note, dispatch, isDragInProgress, position } = this.props;
    const noteClassNames = classnames({
      [styles.note]: true,
      [styles.notClone]: true
    });
    const noteCloneClassNames = classnames({
      [styles.note]: true,
      [styles.invisible]: true
    });
    const noteStyle = {
      top: this.state.y,
      left: this.state.x,
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
    };
    return (
      <div>
        <div
          ref='note'
          className={noteClassNames}
          onClick={ selectNote(note, dispatch) }
          style={ noteStyle }
          draggable='true'
          onDragStart={ onDragStart(dispatch, position) }
          onDragEnter={ onDragEnter(dispatch, position) }
        >
          <h2>{ note.title }</h2>
          <div>{ note.body }</div>
          <div className={ styles.delete }>
            <a href='#' onClick={ deleteNote(note._id, dispatch) }>X</a>
          </div>
        </div>
        <div
          ref='noteClone'
          className={ noteCloneClassNames }
          onClick={ selectNote(note, dispatch) }
        >
          <h2>{ note.title }</h2>
          <div>{ note.body }</div>
          <div className={ styles.delete }>
            <a href='#' onClick={ deleteNote(note._id, dispatch) }>X</a>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    const noteClone = ReactDom.findDOMNode(this.refs.noteClone);
    const x = getLeftForElement(noteClone);
    const y = getTopForElement(noteClone);
    this.setState({
      x,
      y
    });
  }

  componentDidUpdate () {
    const noteClone = ReactDom.findDOMNode(this.refs.noteClone);
    const cloneX = getLeftForElement(noteClone);
    const cloneY = getTopForElement(noteClone);
    let { translateX, translateY, x, y } = this.state;
    if (cloneX !== (x + translateX) || cloneY !== (y + translateY)) {
      const xDiff = cloneX - x;
      const yDiff = cloneY - y;
      this.setState({
        x,
        y,
        translateX: xDiff,
        translateY: yDiff
      });
    }
  }
}

const selectNote = (note, dispatch) => () => dispatch(actions.noteSelected(note));
const deleteNote = (_id, dispatch) => (clickEvent) => {
  clickEvent.stopPropagation();
  dispatch(actions.noteDeleted(_id));
};
const onDragStart = (dispatch, position) => (dragEvent) => {
  dragEvent.dataTransfer.dropEffect = 'move';
  dispatch(actions.noteDragStart(position));
};
const onDragEnter = (dispatch, position) => (dragEvent) => {
  dispatch(actions.noteDropZoneActivated(position));
};

const select = (state) => {
  return {
    isDragInProgress: state.dragAndDrop.isDragInProgress || false
  };
};

export default connect(select)(Note);
