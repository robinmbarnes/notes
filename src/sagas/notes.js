import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { requestNotesComplete, actionTypes, createNoteComplete } from 'actions';

function * fetchNotes () {
  const response = yield call(request.get, 'http://localhost:8100/notes');
  yield put(requestNotesComplete(response.body));
}

function * createNote ({ title, body }) {
  const response = yield call(request.post, 'http://localhost:8100/notes');
  yield put(createNoteComplete());
}

export function * createNoteSaga () {
  yield * takeLatest(actionTypes.createNoteSubmitted, createNote);
}

export function * fetchNotesSaga () {
  yield * takeLatest(actionTypes.requestNotes, fetchNotes);
}
