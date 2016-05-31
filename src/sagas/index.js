import setupNotesSagas from './notes';

export default function * () {
  yield setupNotesSagas();
}
