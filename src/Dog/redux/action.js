import { takeLatest, take, call, put, delay, race } from "redux-saga/effects";

import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE
} from "./reducer";

import axios from "axios";

const fetchDog = () => {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
};

function* workerSaga() {
  try {
    const { data } = yield call(fetchDog);
    const dog = data.message;
    yield put({ type: API_CALL_SUCCESS, dog });
  } catch (err) {
    yield put({ type: API_CALL_FAILURE, err });
  }
}

// watcher saga with takeLatest Effects
// export default function* watcherSagaTakeLatest() {
//   yield takeLatest(API_CALL_REQUEST, workerSaga);
// }

// watcher saga with take Effects
// export default function* watcherSagaTake() {
//   while (yield take(API_CALL_REQUEST)) {
//     yield call(workerSaga);
//   }
// }

// watcher saga with Race Effect
export default function* watcherSagaRace() {
  yield take(API_CALL_REQUEST);
  let finished = false;
  while (!finished) {
    const { url, timeout } = yield race({
      url: call(fetchDog),
      timeout: delay(5000)
    });
    const dog = url.data.message;
    if (!timeout) {
      finished = true;
      yield put({ type: API_CALL_SUCCESS, dog });
    }
    console.log(finished, dog, timeout);
  }
}
