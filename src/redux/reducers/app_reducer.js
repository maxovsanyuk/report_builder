import { SET_DATASETS, SET_LOADING, SET_REPORT_PARAMETERS } from "../types";

const INITIAL_STATE = {
  parameters: [],
  dataSets: [],
  isLoading: false,
};

export default function app_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_REPORT_PARAMETERS:
      return {
        ...state,
        parameters: payload,
      };
    case SET_DATASETS:
      return {
        ...state,
        dataSets: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}
