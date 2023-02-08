import jwt_decode from "jwt-decode";
import moment from "moment";
import { apiUrl } from "../data/baseUrl";
import { getAsyncStorageValue } from "./asyncStorage";

const baseUrl = apiUrl;

export const GetHttp = async (url) => {
  const validToken = await checkToken();
  if (validToken !== "") {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });
    return response.json();
  }
};

export const PostHttp = async (url, config) => {
  const bearerToken = await config.headers.Authorization.split(" ");
  const token = bearerToken[1];

  if (token !== "") {
    const validToken = await checkToken();

    if (validToken !== "") {
      const headers = config.headers;
      headers.Authorization = `Bearer ${validToken}`;
      config["method"] = "POST";

      const response = await fetch(`${baseUrl + url}`, {
        ...config,
        ...headers,
      });
      return response.json();
    }
  } else {
    const headers = config.headers;
    config["method"] = "POST";
    const response = await fetch(`${baseUrl + url}`, {
      ...config,
      ...headers,
    });
    return response.json();
  }
};

export const PutHttp = async (url, contentType, bodyData) => {
  const token = await getAsyncStorageValue("token");
  if (token !== "") {
    const validToken = await checkToken();

    if (validToken !== "") {
      const response = await fetch(`${baseUrl + url}`, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
          Authorization: `Bearer ${validToken}`,
          "Content-Type": `${contentType}`,
        },
      });
      return response.json();
    }
  } else {
    const headers = config.headers;
    config["method"] = "PUT";
    const response = await fetch(`${baseUrl + url}`, {
      ...config,
      ...headers,
    });
    return response.json();
  }
};

export const checkToken = async () => {
  const token = await getAsyncStorageValue("token");
  const refreshToken = await getAsyncStorageValue("refreshToken");
  if (token) {
    const decodeUserToken = await jwt_decode(token);
    const currentTime = moment().unix();

    const isExpired = decodeUserToken.exp < currentTime ? true : false;

    try {
      if (isExpired) {
        const tokenResponse = await getRefreshToken(refreshToken);
        if (tokenResponse.statusCode === 200) {
          setCookie(`${tokenResponse?.payload.type}`, tokenResponse.payload, 1);
          return tokenResponse.payload.token;
        } else {
          console.log("Token Request Error");
          return "";
        }
      } else {
        return token;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getRefreshToken = async (refreshToken) => {
  const response = await fetch(`${baseUrl}/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      "content-type": "application/json",
    },
  });

  return await response.json();
};
