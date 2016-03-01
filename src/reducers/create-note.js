import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';

export default (state, action) => {
  if (state === void 0) {
    return {
      isFresh: true
    };
  }
  switch (action.type) {
    case actionTypes.createNoteTouched:
      return merge(state, { isFresh: false });
    default:
      return state;
  }
};
