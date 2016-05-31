import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';
import findIndex from 'ramda/src/findIndex';
import memoize from 'ramda/src/memoize';

export default (state, action) => {
  if (state === void 0) {
    return [];
  }
  switch (action.type) {
    case actionTypes.updateNoteSubmitted:
      return updateNoteById(state, action.note._id, action.note);
    case actionTypes.createNoteSubmitted:
      return [action.note].concat(state);
    case actionTypes.noteSelected:
      return state.map(note => {
        return merge(note, { isSelected: (note._id === action._id) });
      });
    case actionTypes.noteDeleted:
      return state.filter(note => note._id !== action._id);
    case actionTypes.noteDropReady:
      const toPosition = action.dropZonePosition;
      const fromPosition = action.positionOfDraggedNote;
      const isToTheLeft = (toPosition < fromPosition);
      return state.reduce((newState, note, i, currentState) => {
        if (i === toPosition) {
          return newState.concat(currentState[fromPosition]);
        }
        if (isToTheLeft) {
          if (i > toPosition && i <= fromPosition) {
            return newState.concat(currentState[i - 1]);
          }
        } else {
          if (i >= fromPosition && i < toPosition) {
            return newState.concat(currentState[i + 1]);
          }
        }
        return newState.concat(note);
      }, []);
    case actionTypes.requestNotesComplete:
      return action.notes;
    case actionTypes.createNoteComplete:
      return updateNoteById(state, action.tempId, action.note);
    default:
      return state;
  }
};

const findNoteIndexById = memoize((_id, notes) => findIndex(
  note => note._id === _id,
  notes
));

const updateNoteById = (notes, _id, newNote) => {
  const noteIndex = findNoteIndexById(_id, notes);
  return notes
    .slice(0, noteIndex)
    .concat(newNote)
    .concat(notes.slice(noteIndex + 1));
};
