import { combineReducers } from 'redux';
import dragAndDrop from './drag-and-drop';
import notes from './notes';
import createNote from './create-note';
import updateNote from './update-note';
import status from './status';

export default combineReducers({
  dragAndDrop,
  notes,
  createNote,
  updateNote,
  status
});
