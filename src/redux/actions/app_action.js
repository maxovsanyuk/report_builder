import {
  RESET_STATE,
  SET_DATASETS,
  SET_LOADING,
  SET_REPORT_PARAMETERS,
  SIDE_BAR_OPEN_HANDLER,
  IS_SAVED_NEW_DATASET_SETTINGS,
  IS_SAVED_NEW_PARAMETERS_SETTINGS,
  SHOW_ALERT,
  SET_NEW_DATASET_STATE,
  SET_NEW_PARAMETERS_STATE,
  SET_SETTINGS_STATE,
  CHOOSEN_SETTINGS_TYPE,
  SET_WIDGETS_LIST,
  SET_CHOOSEN_WIDGET,
} from "../types/types";

export const resetState = () => ({
  type: RESET_STATE,
});

export const setReportParameters = (reportParameters) => ({
  type: SET_REPORT_PARAMETERS,
  payload: reportParameters,
});

export const setDataSets = (dataSets) => ({
  type: SET_DATASETS,
  payload: dataSets,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const sideBarHandleOpen = (isOpen) => ({
  type: SIDE_BAR_OPEN_HANDLER,
  payload: isOpen,
});

export const savedNewDataSetSettings = (isSaved) => ({
  type: IS_SAVED_NEW_DATASET_SETTINGS,
  payload: isSaved,
});

export const savedNewParametersSetSettings = (isSaved) => ({
  type: IS_SAVED_NEW_PARAMETERS_SETTINGS,
  payload: isSaved,
});

export const showAlert = (show) => ({
  type: SHOW_ALERT,
  payload: show,
});

export const setNewDataSetState = (state) => ({
  type: SET_NEW_DATASET_STATE,
  payload: state,
});

export const setNewParametersSetState = (state) => ({
  type: SET_NEW_PARAMETERS_STATE,
  payload: state,
});

export const setSettings = (state) => ({
  type: SET_SETTINGS_STATE,
  payload: state,
});

export const setWidgetsList = (state) => ({
  type: SET_WIDGETS_LIST,
  payload: state,
});

export const setChoosenWidget = (state) => ({
  type: SET_CHOOSEN_WIDGET,
  payload: state,
});

export const setChoosenSettingsType = (type) => ({
  type: CHOOSEN_SETTINGS_TYPE,
  payload: type,
});
