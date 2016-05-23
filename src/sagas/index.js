import { createNoteSaga, fetchNotesSaga, deleteNoteSaga, updateNoteSaga } from './notes';

export default function * () {
  yield [
    createNoteSaga(),
    fetchNotesSaga(),
    deleteNoteSaga(),
    updateNoteSaga()
  ];
}
