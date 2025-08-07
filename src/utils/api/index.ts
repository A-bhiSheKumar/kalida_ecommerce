import { login } from "./auth/login";
import { register } from "./auth/register";

import { getCategoryList } from "./categories/getCategory";
import { getProductList } from "./products/getProductsList";

export const api = {
  auth: {
    login: login,
    register: register,
  },
  categories: {
    getCategoryList: getCategoryList,
  },
  product: {
    getProductList: getProductList,
  },
};
