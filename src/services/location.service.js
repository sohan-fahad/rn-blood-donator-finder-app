import { apiUrl } from "../data/baseUrl";

const baseUrl = apiUrl;

export const LocationApiService = {
  divisons: async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/sohan-fahad/fakeDB/main/divisios"
    );
    return response.json();
  },
  getCities: async (division) => {
    const response = await fetch(`${baseUrl}/cities?division=${division}`);
    return response.json();
  },
  getAreas: async (cityId) => {
    const response = await fetch(`${baseUrl}/areas?city=${cityId}`);
    return response.json();
  },
};
