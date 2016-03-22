import { actionTypes } from 'actions';
import * as actions from 'actions';

export default store => next => action => {
  if (action.type !== actionTypes.noteDropZoneActivated) {
    return next(action);
  }
  const { dragAndDrop } = store.getState();
  if (dragAndDrop.draggedNoteId !== action.note._id) {
    return next(actions.noteDropReady(action.note));
  }
  return next(action);
};
