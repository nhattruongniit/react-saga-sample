import { combineReducers } from 'redux';

import dogReducer from './Dog/redux/reducer';

const allReducers = {
  dog: dogReducer,
};

export default combineReducers({
  ...allReducers,
});