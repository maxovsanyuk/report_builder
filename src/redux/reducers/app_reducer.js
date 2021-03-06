import {
  SET_DATASETS,
  SET_LOADING,
  SET_REPORT_PARAMETERS,
  SIDE_BAR_OPEN_HANDLER,
  IS_SAVED_NEW_DATASET_SETTINGS,
  IS_SAVED_NEW_PARAMETERS_SETTINGS,
  SET_NEW_DATASET_STATE,
  SET_NEW_PARAMETERS_STATE,
  SET_SETTINGS_STATE,
  SET_WIDGETS_LIST,
  SET_CHOOSEN_WIDGET,
  CHOOSEN_SETTINGS_TYPE,
  SHOW_ALERT,
} from "../types/types";

const INITIAL_STATE = {
  parameters: [],
  settings: {
    reportSettings: {
      position: { minWidth: 1000, minHeight: 600, width: 1000, height: 600 },
    },
  },
  dataSets: [],
  newDataSet: {},
  newParametersSet: {},
  isLoading: false,
  isOpenSideBar: false,
  isSavedNewDataSetData: true,
  isSavedNewParametersData: true,
  isShownAlert: false,
  widgetsList: [],
  choosenWidget: null,
  choosenSettingsType: null,
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

    case SET_SETTINGS_STATE:
      return {
        ...state,
        settings: payload,
      };
    case SET_WIDGETS_LIST:
      return {
        ...state,
        widgetsList: payload,
      };

    case SET_CHOOSEN_WIDGET:
      return {
        ...state,
        choosenWidget: payload,
      };
    case CHOOSEN_SETTINGS_TYPE:
      return {
        ...state,
        choosenSettingsType: payload,
      };

    default:
      return state;
  }
}
