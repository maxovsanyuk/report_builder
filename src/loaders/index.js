import request from "superagent";
const UDS_API = "";

export const getData = ({ token }) => {
  if (!token) return Promise.reject(`eventId is not provided`);
  return request.get(`${UDS_API}`).set({ Authorization: "Token" + token });
};
