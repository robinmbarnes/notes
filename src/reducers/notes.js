import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';
import findIndex from 'ramda/src/findIndex';

export default (state, action) => {
  if (state === void 0) {
    return [
      {
        title: 'A Note',
        body: 'This is a note',
        _id: '43434343434343'
      },
      {
        title: 'Another Note',
        body: 'This is another note...',
        _id: 'gfdg5645654dgf'
      }
    ];
  }
  switch (action.type) {
    case actionTypes.updateNoteSubmitted:
      const noteIndex = findNoteIndexById(action.note._id, state);
      return state
        .slice(0, noteIndex)
        .concat(action.note)
        .concat(state.slice(noteIndex + 1));
    case actionTypes.createNoteSubmitted:
      return [action.note].concat(state);
    case actionTypes.noteSelected:
      return state.map(note => {
        return merge(note, { isSelected: (note._id === action._id) });
      });
    case actionTypes.noteDeleted:
      return state.filter(note => note._id !== action._id);
    case actionTypes.noteDropReady:
      return state.map(note => {
        return merge(note, { isDropReady: (note._id === action._id) });
      });
    default:
      return state;
  }
};

const findNoteIndexById = (_id, notes) => findIndex(
  note => note._id === _id,
  notes
);
