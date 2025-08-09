import { request } from "../api";
import { headers } from "../../../config/config";

import { AUTHORIZATION } from "../../../constants/api/auth";
import type { Payload } from "../../../types/api/api.types";

const { post } = request;

const initialRoute = "cart";

export const addToCart = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/add/`;
    const token = localStorage.getItem("access_token");

    // Check if payload is FormData and remove Content-Type if true
    const customHeaders = {
      ...headers,
      [AUTHORIZATION.Authorization]: `${AUTHORIZATION.Bearer} ${token}`,
    };

    const response = await post(endpoint, payload, customHeaders);

    if (response?.status === 201) {
      return response.data;
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
