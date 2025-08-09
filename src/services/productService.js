import apiClient from "./apiClient";

export const getProducts = async (limit = null) => {
  try {
    const response = await apiClient.get("api/products/");
    let data = response.data;
    if (limit) {
      data = data.slice(0, limit);
      console.log("dataaaaaaaaaaa", data);
    }
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
