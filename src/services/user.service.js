import { apiUrl } from "../data/baseUrl";
import { checkToken, GetHttp, PutHttp } from "../utils/fetchInterceptor";

export const UserServieApi = {
  updateImage: async (file, id) => {
    const form = new FormData();
    form.append("avatarImage ", file);
    const url = `/users/${id}/avatar`;
    const response = await PutHttp(url, "multipart/form-data", form);
    // const response = await fetch(`${apiUrl}/users/${id}/avatr`, {
    //   body: form,
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data, "www"))
    //   .catch((error) => console.error(error, "sss"));
    return response;
  },
  getDonors: async (bloodGroup, division, city, area) => {
    const response = await GetHttp(
      `/users/nearby?bloodGroup=${bloodGroup}&city=${city}&area=${area}&division=${division}`
    );
    return response;
  },
};
