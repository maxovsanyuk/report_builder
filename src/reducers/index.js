import { combineReducers } from 'redux';
import app_reducer from './app_reducer';
import { RESET_STATE } from '../actions/app_action';

const reducer = combineReducers({
  app: app_reducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;
