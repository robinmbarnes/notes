import { createNoteSaga, fetchNotesSaga } from './notes';

export default function * () {
  yield [
    createNoteSaga(),
    fetchNotesSaga()
  ];
}
