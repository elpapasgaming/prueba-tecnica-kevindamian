import api from "./api";

export const getPhotos = async () => {
  const response = await api.get("/photos?_limit=30");
  return response.data;
};