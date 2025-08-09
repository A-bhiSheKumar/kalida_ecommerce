import { request } from "../api";
import { headers } from "../../../config/config";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { get } = request;

const initialRoute = "cart";

export const getCartIems = async () => {
  try {
    const endpoint = `${initialRoute}`;

    const token = localStorage.getItem("access_token");
    const response = await get(endpoint, {
      ...headers,
      [AUTHORIZATION.Authorization]: `${AUTHORIZATION.Bearer} ${token}`,
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
