import request from "superagent";
const UDS_API =
  "https://reportbuilderaddon-api.azurewebsites.net/api/data-source/all-entities";

export const getReports = () => {
  return request.get(`${UDS_API}`).then((res) => res.body);
};
