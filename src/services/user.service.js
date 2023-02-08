import { apiUrl } from "../data/baseUrl";
import { checkToken, GetHttp, PutHttp } from "../utils/fetchInterceptor";

export const UserServieApi = {
  updateImage: async (file, id) => {
    const formData = new FormData();
    formData.append("avatarImage", file);

    const url = `${apiUrl}/users/${id}/avatar`;
    const validToken = await checkToken();
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });
    let data = await response.json();
    return data;
  },
  getDonors: async (bloodGroup, division, city, area) => {
    const response = await GetHttp(
      `/users/nearby?bloodGroup=${bloodGroup}&city=${city}&area=${area}&division=${division}`
    );
    return response;
  },
};
