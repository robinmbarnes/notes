import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { requestNotesComplete, actionTypes, createNoteComplete } from 'actions';

function * fetchNotes () {
  const response = yield call(request.get, 'http://localhost:8100/notes');
  yield put(requestNotesComplete(response.body));
}

function * createNote ({ note: { _id: tempId, body, title } }) {
  const data = { body, title, position: 0 };
  const { body: note } = yield call(
    request.post,
    'http://localhost:8100/notes',
    { data }
  );

  yield put(createNoteComplete(tempId, note));
}

function * updateNote ({ note: { _id, body, title, position } }) {
  const data = { body, title, _id, position };
  yield call(
    request.put,
    `http://localhost:8100/notes/${_id}`,
    { data }
  );
}

function * deleteNote ({ _id }) {
  yield call(request.delete, `http://localhost:8100/notes/${_id}`);
}

export default function * setupSagas () {
  yield [
    takeLatest(actionTypes.createNoteSubmitted, createNote),
    takeEvery(actionTypes.requestNotes, fetchNotes),
    takeEvery(actionTypes.noteDeleted, deleteNote),
    takeEvery(actionTypes.updateNoteSubmitted, updateNote)
  ];
}
