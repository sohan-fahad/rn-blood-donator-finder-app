export const UserServieApi = {
  updateImage: async (uri, name, type) => {
    const form = new FormData();
    form.append("image", { uri, name, type });
    // const response = await fet;
    // const response = await fetch(
    //   "https://api.imgbb.com/1/upload?key=17288d90a175abdcc7328b8e430097d0",
    //   {
    //     method: "POST",
    //     body: form,
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   }
    // );
    return {};
  },
};
