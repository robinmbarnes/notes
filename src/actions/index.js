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
  'noteDropReady',
  'noteDropped',
  'draggedNotePositionChanged',
  'requestNotesComplete',
  'requestNotes',
  'createNoteComplete'
]);

export function createAction (type, otherProps={}) {
  return () => Object.assign({}, otherProps, { type });
}

export const noteDropped = createAction(actionTypes.noteDropped);

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

export function noteDragStart (position) {
  return {
    type: actionTypes.noteDragStart,
    position
  };
}

export function noteDropZoneActivated (dropZonePosition) {
  return (dispatch, getState) => {
    const positionOfDraggedNote = getState().dragAndDrop.positionOfDraggedNote;
    if (dropZonePosition !== positionOfDraggedNote) {
      dispatch(noteDropReady(positionOfDraggedNote, dropZonePosition));
      dispatch(draggedNotePositionChanged(dropZonePosition));
    }
  };
}

export function draggedNotePositionChanged (position) {
  return {
    type: actionTypes.draggedNotePositionChanged,
    position
  };
}

export function noteDropReady (positionOfDraggedNote, dropZonePosition) {
  return {
    type: actionTypes.noteDropReady,
    positionOfDraggedNote,
    dropZonePosition
  };
}

export function requestNotesComplete (notes) {
  return {
    type: actionTypes.requestNotesComplete,
    notes
  };
}

export const requestNotes = createAction(actionTypes.requestNotes);
export const createNoteComplete = createAction(actionTypes.createNoteComplete);
