import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';

export default (state, action) => {
  if (state === void 0) {
    return {};
  }

  switch (action.type) {
    case actionTypes.noteDropZoneActivated:
      return merge(state, { dropZoneNoteId: action.note._id });
    case actionTypes.noteDragStart:
      return merge(state, { draggedNoteId: action.note._id });
    default:
      console.log(action.type)
      return state;
  }
};
