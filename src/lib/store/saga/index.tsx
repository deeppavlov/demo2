import { call, put, takeEvery } from 'redux-saga/effects';
// import { Action } from '../actions'
import API from '../api';

function* ODQA() {
    try {
        const response = yield call(API.odqa);
        yield put({ type: "SAVE_SUGGESTIONS", suggestions: response.suggests })
    } catch (error) {
        yield put({ type: "SAVE_SUGGESTIONS", error })
    }
}

function* saga() {
    yield takeEvery("LOAD_ANSWER", ODQA);
}

export default saga;