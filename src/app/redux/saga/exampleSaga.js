import {take, put, all, call, fork} from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
// import {API_URL} from '../../index';
// import request, {POST} from '../../services/request';

export function *example() {
    while (true) {
        try {
            const {payload: {data, callback}} = yield take(actionTypes.EXAMPLE_ACTION);
            yield put({type: actionTypes.EXAMPLE_ACTION_IN_PROGRESS});
            // const response = yield request(POST, API_URL + 'auth/', data);
            yield put({type: actionTypes.EXAMPLE_ACTION_SUCCESS, payload: data});
            yield call(callback);
        } catch (e) {
            console.error(e);
            yield put({type: actionTypes.EXAMPLE_ACTION_FAILED, error: e});
        }
    }
}

export default function *exampleSaga() {
    yield all([
        fork(example),
    ]);
}
