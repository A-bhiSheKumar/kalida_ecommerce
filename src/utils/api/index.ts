import { login } from "./auth/login";
import { register } from "./auth/register";

import { getCategoryList } from "./categories/getCategory";
import { addToCart } from "./products/addToCart";
import { downloadProductPdf } from "./products/downloadProductPdf";
import { getCartIems } from "./products/getCartItems";
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
    addToCart: addToCart,
    downloadProductPdf: downloadProductPdf,
    getCartIems: getCartIems,
  },
};
