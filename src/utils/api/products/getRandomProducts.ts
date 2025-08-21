import { request } from "../api";
import { headers } from "../../../config/config";

const { get } = request;

const initialRoute = "products";

export const getRandomProductList = async () => {
  try {
    const endpoint = `${initialRoute}/random`;

    //const token = localStorage.getItem("access_token");
    const response = await get(endpoint, {
      ...headers,
      //[AUTHORIZATION.Authorization]: `${AUTHORIZATION.Bearer} ${token}`,
    });

    if (response?.status === 200) {
      return response.data;
    }

    throw new Error("Failed to fetch product list");
  } catch (error: unknown) {
    console.error("API error:", error);
    throw error;
  }
};
