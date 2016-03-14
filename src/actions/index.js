import constantKeys from 'constant-keys';
import uuid from 'uuid';

export const actionTypes = constantKeys([
  'createNoteTouched',
  'createNoteBodyChanged',
  'createNoteTitleChanged',
  'createNoteSubmitted',
  'noteSelected',
  'noteDeleted',
  'updateNoteChanged',
  'updateNoteSubmitted'
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

export function noteSelected (_id) {
  return {
    type: actionTypes.noteSelected,
    _id
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
    type: updateNoteChanged,
    note
  };
}

export function updateNoteSubmitted () {
  return {
    type: actionTypes.updateNoteSubmitted
  };
}
