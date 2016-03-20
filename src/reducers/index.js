import { combineReducers } from 'redux';
import notes from './notes';
import createNote from './create-note';
import updateNote from './update-note';

export default combineReducers({
  notes,
  createNote,
  updateNote
});
