import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';

export default (state, action) => {
  if (state === void 0) {
    return {
      positionOfDraggedNote: null
    };
  }

  switch (action.type) {
    case actionTypes.noteDragStart:
      return merge(state, { positionOfDraggedNote: action.position });
    case actionTypes.draggedNotePositionChanged:
      return merge(state, { positionOfDraggedNote: action.position });
    default:
      return state;
  }
};
