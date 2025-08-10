import { login } from "./auth/login";
import { register } from "./auth/register";

import { getCategoryList } from "./categories/getCategory";
import { addToCart } from "./products/addToCart";
import { deleteCartInProduct } from "./products/deleteCartinProduct";
import { downloadProductPdf } from "./products/downloadProductPdf";
import { getCartIems } from "./products/getCartItems";
import { getProductList } from "./products/getProductsList";
import { updateCartQuantity } from "./products/updateCartQuantity";
import { sendQuotations } from "./quotations/sendQuotations";

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
    deleteCartInProduct: deleteCartInProduct,
    updateCartQuantity: updateCartQuantity,
  },
  quotation: {
    sendQuotations: sendQuotations,
  },
};
