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
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this.clone = null;
  }

  render () {
    const { position, positionOfDraggedNote, dispatch } = this.props;
    const shouldClone = (
      positionOfDraggedNote !== null &&
      positionOfDraggedNote !== position
    );
    const clone = shouldClone ? this._renderContent(true) : null;
    return (
      <div
        className={ styles.container }
        onDragStart={ this._onDragStart }
        onDragEnter={ onDragEnter(dispatch, position) }
        onDragEnd={ this._onDragEnd }
        draggable='true'
      >
        { this._renderContent(false) }
        { clone }
      </div>
    );
  }

  _renderContent (isClone) {
    const { note, dispatch, position, positionOfDraggedNote } = this.props;
    const isInvisible = (
      positionOfDraggedNote === position ||
      (positionOfDraggedNote !== null && !isClone)
    );
    const contentClassNames = classnames({
      [styles.content]: true,
      [styles.isClone]: isClone,
      [styles.invisible]: isInvisible
    });
    const cloneStyle = {
      top: this.state.y,
      left: this.state.x,
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
    };
    const style = (isClone ? cloneStyle : {});
    const ref = (!isClone ? 'content' : 'clone');

    return (
      <div className={contentClassNames} ref={ref} style={style}>
        <h2>{ note.title }</h2>
        <div>{ note.body }</div>
        <div className={ styles.delete }>
          <a href='#' onClick={ deleteNote(note._id, dispatch) }>X</a>
        </div>
      </div>
    );
  }

  componentDidMount () {
    const contentNode = ReactDom.findDOMNode(this.refs.content);
    const x = getLeftForElement(contentNode);
    const y = getTopForElement(contentNode);
    this.setState({
      x,
      y
    });
  }

  componentDidUpdate () {
    const clone = ReactDom.findDOMNode(this.refs.clone);
    const content = ReactDom.findDOMNode(this.refs.content);
    if (!clone) {
      return;
    }
    const x = getLeftForElement(content);
    const y = getTopForElement(content);
    const cloneX = getLeftForElement(clone);
    const cloneY = getTopForElement(clone);
    let { translateX, translateY } = this.state;
    if (cloneX !== (x + translateX) || cloneY !== (y + translateY)) {
      const xDiff = x - cloneX;
      const yDiff = y - cloneY;
      const newState = Object.assign(
        {},
        this.state,
        {
          translateX: xDiff + 2,
          translateY: yDiff
        }
      );
      //this.setState(newState);
    }
  }

  _onDragStart (e) {
    const { dispatch, position } = this.props;
    const contentNode = ReactDom.findDOMNode(this.refs.content);
    this.clone = contentNode.cloneNode(true);
    this.clone.style.transform = 'translate(-10000px, -10000px)';
    document.body.appendChild(this.clone);
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    e.dataTransfer.setDragImage(this.clone, x, y);
    dispatch(actions.noteDragStart(position));
  }

  _onDragEnd () {
    const { dispatch } = this.props;
    if (this.clone) {
      this.clone.remove();
      this.clone = null;
    }
    dispatch(actions.noteDropped());
  }
}

const selectNote = (note, dispatch) => () => dispatch(actions.noteSelected(note));
const deleteNote = (_id, dispatch) => (clickEvent) => {
  clickEvent.stopPropagation();
  dispatch(actions.noteDeleted(_id));
};
const onDragEnter = (dispatch, position) => (dragEvent) => {
  dispatch(actions.noteDropZoneActivated(position));
};

const select = (state) => {
  return {
    positionOfDraggedNote: state.dragAndDrop.positionOfDraggedNote
  };
};

export default connect(select)(Note);
