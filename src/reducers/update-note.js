import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';

export default function (state, action) {
  if (state === void 0) {
    return {};
  }

  switch (action.type) {
    case actionTypes.updateNoteChanged:
      return { note: action.note };
    default:
      return state;
  }
}
