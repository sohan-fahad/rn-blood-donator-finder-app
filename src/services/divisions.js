export const LocationApiService = {
  divisons: async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/sohan-fahad/fakeDB/main/divisios"
    );
    return response.json();
  },
};
