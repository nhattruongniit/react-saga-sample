import { combineReducers } from 'redux';

import { dogReducer } from './redux';

const allReducers = {
  dog: dogReducer,
};

export default combineReducers({
  ...allReducers,
});