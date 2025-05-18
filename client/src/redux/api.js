import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("https://tourify-koei.onrender.com/users/signin", formData);
export const signUp = (formData) => API.post("https://tourify-koei.onrender.com/users/signup", formData);
export const googleSignIn = (result) => API.post("https://tourify-koei.onrender.com/users/googleSignIn", result);

export const createTour = (tourData) => API.post("https://tourify-koei.onrender.com/tour/", tourData);
export const getTours = (page) => API.get(`https://tourify-koei.onrender.com/tour?page=${page}`);
export const getTour = (id) => API.get(`https://tourify-koei.onrender.com/tour/${id}`);
export const deleteTour = (id) => API.delete(`https://tourify-koei.onrender.com/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`https://tourify-koei.onrender.com/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`https://tourify-koei.onrender.com/tour/userTours/${userId}`);

export const getToursBySearch = (searchQuery) =>
  API.get(`https://tourify-koei.onrender.com/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag) => API.get(`https://tourify-koei.onrender.com/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`https://tourify-koei.onrender.com/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`https://tourify-koei.onrender.com/tour/like/${id}`);
