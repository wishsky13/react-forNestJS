import { create } from "apisauce";

import { IParamMemberList, IBodyMember } from "../types/api";
const DOMAIN = `${window.location.protocol}//${window.location.hostname}:8080`;
// const API_VERSION = "v1";
const API_URL = `${DOMAIN}`;
const TIMEOUT = 5000;

export const ApiNoAuth = (function () {
  const api = create({
    baseURL: API_URL,
    headers: {
      //   "Cache-Control": "no-cache",
      Accept: "application/json",
    },
    timeout: TIMEOUT,
  });

  return {
    askToken: (account: string, password: string) =>
      api.post("/auth/login", {
        account: account,
        password: password,
      }),
    signUp: (body: IBodyMember) => api.post(`/members`, body),
  };
})();

export const ApiWithAuth = (token: string) =>
  (function () {
    const api = create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: TIMEOUT,
    });
    return {
      getUserData: () => api.get("/members/me"),

      getMemberList: (param: IParamMemberList) => api.get("/members", param),

      getMember: (id: string) => api.get(`/members/${id}`),

      editMember: (
        id: string,
        body: {
          role: number[];
        }
      ) => api.put(`/members/${id}`, body),
    };
  })();
