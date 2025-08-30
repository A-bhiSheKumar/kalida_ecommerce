import { request } from "../api";
import { headers } from "../../../config/config";
import type { Payload } from "../../../types/api/api.types";

const { post } = request;

const initialRoute = "contact";

export const contact = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/`;
    // const token = localStorage.getItem("access_token");

    // Check if payload is FormData and remove Content-Type if true
    const customHeaders = {
      ...headers,
    };

    const response = await post(endpoint, payload, customHeaders);
    console.log("Responsechecieckfortheapi-->", response);
    if (response?.status === 201) {
      return response;
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
