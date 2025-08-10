import { request } from "../api";
import { headers } from "../../../config/config";

import { AUTHORIZATION } from "../../../constants/api/auth";

const { post } = request;

const initialRoute = "quotations";

export const sendQuotations = async () => {
  try {
    const endpoint = `${initialRoute}/request/`;
    const token = localStorage.getItem("access_token");
    const customHeaders = {
      ...headers,
      [AUTHORIZATION.Authorization]: `${AUTHORIZATION.Bearer} ${token}`,
    };

    const response = await post(endpoint, {}, customHeaders);

    console.log("checkingfortheresponse---->>", response);
    if (response?.status === 201) {
      console.log("ResponseApi--->>>", response);
      return response.data;
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
