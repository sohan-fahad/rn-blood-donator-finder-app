import jwt_decode from "jwt-decode";
import moment from "moment";
import { apiUrl } from "../data/baseUrl";
import { getAsyncStorageValue } from "./asyncStorage";

const baseUrl = apiUrl;

// interface Config {
//     body?: any;
//     headers?: any;
// }

// interface DecodeUserToken {
//     email: string;
//     exp: number;
//     iat: number;
//     id: string;
//     name: string;
//     parentId?: string;
//     payWithPin?: boolean;
//     phoneNumber?: string;
//     type: string;
//     user_id: number
// }

export class CustomFetch {
  get = async (url, config) => {
    const bearerToken = await config.headers.Authorization.split(" ");
    const token = bearerToken[1];

    if (token !== "") {
      const validToken = await this.checkToken();

      if (validToken !== "") {
        const headers = config.headers;
        headers.Authorization = `Bearer ${validToken}`;
        const response = await fetch(`${baseUrl + url}`, {
          ...config,
          ...headers,
        });
        return response.json();
      }
    } else {
      const response = await fetch(`${baseUrl + url}`);
      return response.json();
    }
  };

  post = async (url, config) => {
    const bearerToken = await config.headers.Authorization.split(" ");
    const token = bearerToken[1];

    if (token !== "") {
      const validToken = await this.checkToken();

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

  put = async (url, config) => {
    const bearerToken = await config.headers.Authorization.split(" ");
    const token = bearerToken[1];

    if (token !== "") {
      const validToken = await this.checkToken();

      if (validToken !== "") {
        const headers = config.headers;
        headers.Authorization = `Bearer ${validToken}`;
        config["method"] = "PUT";

        const response = await fetch(`${baseUrl + url}`, {
          ...config,
          ...headers,
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

  checkToken = async () => {
    const token = await getAsyncStorageValue("token");
    const refreshToken = await getAsyncStorageValue("refreshToken");
    if (token) {
      const decodeUserToken = jwt_decode(token);
      const currentTime = moment().unix();

      const isExpired = decodeUserToken.exp < currentTime ? true : false;

      try {
        if (isExpired) {
          const tokenResponse = await this.refreshToken(refreshToken);
          if (tokenResponse.statusCode === 200) {
            setCookie(
              `${tokenResponse?.payload.type}`,
              tokenResponse.payload,
              1
            );
            return tokenResponse.payload.token;
          } else {
            console.log("Token Request Error");
            return "";
          }
        } else {
          return userInfo.token;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      await goto("/");
    }
  };

  refreshToken = async (refreshToken) => {
    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "x-platform-type": `merchant`,
        "content-type": "application/json",
      },
    });

    return await response.json();
  };
}
