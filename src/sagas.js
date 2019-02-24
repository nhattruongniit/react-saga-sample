import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function that makes the api request and returns a Promise for response
const fetchDog = () => {
  return axios({
    method: 'get',
    url: "https://dog.ceo/api/breeds/image/random",
  })
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const { data } = yield call(fetchDog);
    const dog = data.message;

    // dispatch a success action to the store with the new dog
    yield put({ type: 'API_CALL_SUCCESS', dog});
  } catch (err) {
    yield put({ type: 'API_CALL_FAILURE', err});
  }
}