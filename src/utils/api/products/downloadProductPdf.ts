import { request } from "../api";
import { headers } from "../../../config/config";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { get } = request;
const initialRoute = "products";

export const downloadProductPdf = async (query: string) => {
  try {
    const endpoint = `${initialRoute}/download-pdf/${query}/`;
    const token = localStorage.getItem("access_token");

    const customHeaders = {
      ...headers,

      [AUTHORIZATION.Authorization]: `${AUTHORIZATION.Bearer} ${token}`,
    };

    const response = await get(endpoint, customHeaders);

    if (response?.status === 200) {
      return response.data;
    }
    throw new Error("Failed to download PDF");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
