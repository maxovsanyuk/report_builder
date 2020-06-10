export const RESET_STATE = 'RESET_STATE';
export const SET_REPORT_PARAMETERS = 'SET_REPORT_PARAMETERS';
export const SET_DATASETS = 'SET_DATASETS';
export const SET_LOADING = 'SET_LOADING';


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
