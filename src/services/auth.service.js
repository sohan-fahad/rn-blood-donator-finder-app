import { apiUrl } from "../data/baseUrl";

const AuthApiService = {
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
};
