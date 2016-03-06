import constantKeys from 'constant-keys';

export const actionTypes = constantKeys([
  'createNoteTouched',
  'createNoteBodyChanged',
  'createNoteTitleChanged'
]);

export function createNoteTouched () {
  return {
    type: actionTypes.createNoteTouched
  };
}

export function createNoteBodyChanged (bodyText) {
  return {
    type: actionTypes.createNoteBodyChanged,
    bodyText
  };
}

export function createNoteTitleChanged (titleText) {
  return {
    type: actionTypes.createNoteTitleChanged,
    titleText
  };
}
