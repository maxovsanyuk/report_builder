import {
  SET_DATASETS,
  SET_LOADING,
  SET_REPORT_PARAMETERS,
  SIDE_BAR_OPEN_HANDLER,
  IS_SAVED_NEW_DATASET_SETTINGS,
  IS_SAVED_NEW_PARAMETERS_SETTINGS,
  SET_NEW_DATASET_STATE,
  SET_NEW_PARAMETERS_STATE,
  SHOW_ALERT,
} from "../types/types";

const INITIAL_STATE = {
  parameters: [],
  dataSets: [],
  newDataSet: {},
  newParametersSet: {},
  isLoading: false,
  isOpenSideBar: false,
  isSavedNewDataSetData: true,
  isSavedNewParametersData: true,
  isShownAlert: false,
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

    case SIDE_BAR_OPEN_HANDLER:
      return {
        ...state,
        isOpenSideBar: payload,
      };
    case IS_SAVED_NEW_DATASET_SETTINGS:
      return {
        ...state,
        isSavedNewDataSetData: payload,
      };
    case IS_SAVED_NEW_PARAMETERS_SETTINGS:
      return {
        ...state,
        isSavedNewParametersData: payload,
      };

    case SHOW_ALERT:
      return {
        ...state,
        isShownAlert: payload,
      };

    case SET_NEW_DATASET_STATE:
      return {
        ...state,
        newDataSet: payload,
      };

    case SET_NEW_PARAMETERS_STATE:
      return {
        ...state,
        newParametersSet: payload,
      };

    default:
      return state;
  }
}
