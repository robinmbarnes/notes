import { combineReducers } from 'redux';
import notes from './notes';
import createNote from './create-note';

export default combineReducers({
  notes,
  createNote
});
