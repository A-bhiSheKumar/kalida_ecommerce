/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "../../../config/config";
import { AUTHORIZATION } from "../../../constants/api/auth";
import { request } from "../api";

const { post, get } = request;

const initialRoute = "auth";

export const login = async (_payload: any) => {
  try {
    const payload = JSON.stringify(_payload);
    console.log("Payload for login----->>>", payload);

    const endpoint = `${initialRoute}/login/`;
    const response = await post(endpoint, payload, headers);

    console.log("Response--->>forthelogin", response);

    if (response?.status === 200) {
      return response.data;
    }

    // handle other status codes
    throw new Error(`Login failed with status: ${response?.status}`);
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchLoginUser = async () => {
  try {
    const endpoint = `${initialRoute}/user-details/`;

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
