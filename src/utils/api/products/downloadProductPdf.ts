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

    const response = await get(
      endpoint,
      customHeaders,
      {}, // params
      { responseType: "blob" } // 👈 important
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
