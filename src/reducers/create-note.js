import { actionTypes } from 'actions';
import merge from 'ramda/src/merge';

export default (state, action) => {
  if (state === void 0) {
    return {
      isFresh: true,
      title: '',
      body: ''
    };
  }
  switch (action.type) {
    case actionTypes.createNoteTouched:
      return merge(state, { isFresh: false });
    case actionTypes.createNoteTitleChanged:
      return merge(state, { title: action.titleText });
    case actionTypes.createNoteBodyChanged:
      return merge(state, { body: action.bodyText });
    default:
      return state;
  }
};
