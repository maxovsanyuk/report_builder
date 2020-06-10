import {SET_DATASETS, SET_LOADING, SET_REPORT_PARAMETERS} from '../actions/app_action'

const INITIAL_STATE = {
  parameters: [],
  dataSets: [],
  loading: false
};

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_REPORT_PARAMETERS:
      return {
        ...state,
        parameters: action.payload
      };
    case SET_DATASETS:
      return {
        ...state,
        dataSets: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
