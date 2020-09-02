import request from "superagent";
const UDS_API = "https://reportbuilderaddon-api.dev.uds.systems";

export const getReports = () => {
  return request;
  // .get(`${UDS_API}/api/data-source/all-entities`)
  // .withCredentials()
  // .set("Access-Control-Allow-Origin", "*");
};
