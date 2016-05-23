import { actionTypes } from 'actions';

const defaultState = {
  notesLoaded: false
};

export default (state, action) => {
  if (state === void 0) {
    return defaultState;
  }
  switch (action.type) {
    case actionTypes.requestNotesComplete:
      return Object.assign({}, { notesLoaded: true });
    default:
      return state;
  }
};
