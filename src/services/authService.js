import apiClient from "./apiClient";

export const registerUser = (data) => {
  return apiClient.post("api/register/", data);
};

export const loginUser = (data) => {
  return apiClient.post("api/login/", data);
};
