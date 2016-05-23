import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { requestNotesComplete, actionTypes, createNoteComplete } from 'actions';

function * fetchNotes () {
  const response = yield call(request.get, 'http://localhost:8100/notes');
  yield put(requestNotesComplete(response.body));
}

function * createNote ({ note: { body, title } }) {
  const data = { body, title };
  yield call(
    request.post,
    'http://localhost:8100/notes',
    { data }
  );
  yield put(createNoteComplete());
}

function * updateNote ({ note: { _id, body, title } }) {
  const data = { body, title, _id };
  yield call(
    request.put,
    `http://localhost:8100/notes/${_id}`,
    { data }
  );
}

function * deleteNote ({ _id }) {
  yield call(request.delete, `http://localhost:8100/notes/${_id}`);
}

export function * createNoteSaga () {
  yield * takeLatest(actionTypes.createNoteSubmitted, createNote);
}

export function * fetchNotesSaga () {
  yield * takeEvery(actionTypes.requestNotes, fetchNotes);
}

export function * deleteNoteSaga () {
  yield * takeEvery(actionTypes.noteDeleted, deleteNote);
}

export function * updateNoteSaga () {
  yield * takeEvery(actionTypes.updateNoteSubmitted, updateNote);
}
