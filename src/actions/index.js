import constantKeys from 'constant-keys';

export const actionTypes = constantKeys(['createNoteTouched']);

export function createNoteTouched () {
  return {
    type: actionTypes.createNoteTouched
  };
}
