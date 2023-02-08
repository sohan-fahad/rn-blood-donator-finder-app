import { apiUrl } from "../data/baseUrl";
import { GetHttp } from "../utils/fetchInterceptor";

export const AuthApiService = {
  register: async (requestObj) => {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(requestObj),
      headers: {
        "content-type": "application/json",
      },
    });

    return response.json();
  },

  login: async (requestObj) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(requestObj),
      headers: {
        "content-type": "application/json",
      },
    });

    return response.json();
  },
  authInfo: async () => {
    const response = await GetHttp("/auth/me");
    return await response;
  },
};
