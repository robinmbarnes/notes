import constantKeys from 'constant-keys';
import uuid from 'uuid';

export const actionTypes = constantKeys([
  'createNoteTouched',
  'createNoteBodyChanged',
  'createNoteTitleChanged',
  'createNoteSubmitted',
  'noteSelected',
  'noteDeleted',
  'cancelUpdateNote',
  'updateNoteChanged',
  'updateNoteSubmitted',
  'noteDropZoneActivated',
  'noteDragStart',
  'noteDropReady'
]);

export function createNoteTouched () {
  return {
    type: actionTypes.createNoteTouched
  };
}

export function createNoteBodyChanged (bodyText) {
  return {
    type: actionTypes.createNoteBodyChanged,
    bodyText
  };
}

export function createNoteTitleChanged (titleText) {
  return {
    type: actionTypes.createNoteTitleChanged,
    titleText
  };
}

export function createNoteSubmitted () {
  return (dispatch, getState) => {
    const state = getState();
    const { title, body } = state.createNote;
    dispatch({
      type: actionTypes.createNoteSubmitted,
      note: { title, body, _id: uuid.v4() }
    });
  };
}

export function noteSelected (note) {
  return {
    type: actionTypes.noteSelected,
    note
  };
}

export function noteDeleted (_id) {
  return {
    type: actionTypes.noteDeleted,
    _id
  };
}

export function updateNoteChanged (note) {
  return {
    type: actionTypes.updateNoteChanged,
    note
  };
}

export function updateNoteSubmitted (note) {
  return {
    type: actionTypes.updateNoteSubmitted,
    note
  };
}

export function cancelUpdateNote () {
  return {
    type: actionTypes.cancelUpdateNote
  };
}

export function noteDragStart (note) {
  return {
    type: actionTypes.noteDragStart,
    note
  };
}

export function noteDropZoneActivated (note) {
  return (dispatch, getState) => {
    if (note._id !== getState().dragAndDrop.draggedNoteId) {
      dispatch(noteDropReady(note._id));
    }
  };
}

export function noteDropReady (_id) {
  return {
    type: actionTypes.noteDropReady,
    _id
  };
}
