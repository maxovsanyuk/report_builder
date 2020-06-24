import {RESET_STATE, SET_DATASETS, SET_LOADING, SET_REPORT_PARAMETERS} from "../types";

export const resetState = () => ({
  type: RESET_STATE
});

export const setReportParameters = (reportParameters) => ({
  type: SET_REPORT_PARAMETERS,
  payload: reportParameters
});

export const setDataSets = (dataSets) => ({
  type: SET_DATASETS,
  payload: dataSets
});

export const setLoading = (flag) => ({
  type: SET_LOADING,
  payload: flag
});

