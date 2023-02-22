import { apiUrl } from "../data/baseUrl";
import { checkToken, GetHttp } from "../utils/fetchInterceptor";

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

  getDonationHitory: async () => {
    const response = await GetHttp(`/users/donation-history`);
    return response;
  },
  updateDonationHistory: async(id,date)=> {
    console.log(date)
    const formData = new FormData();
    formData.append("user", id);
    formData.append("lastDonated", date);
    const url = `${apiUrl}/users/donation-history`;
    const validToken = await checkToken();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    })
    let data = await response.json();
    return data;
  }
};
