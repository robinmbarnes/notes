import { combineReducers } from 'redux';
import dragAndDrop from './drag-and-drop';
import notes from './notes';
import createNote from './create-note';
import updateNote from './update-note';

export default combineReducers({
  dragAndDrop,
  notes,
  createNote,
  updateNote
});
