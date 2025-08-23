import { fetchLoginUser, login } from "./auth/login";
import { register } from "./auth/register";

import { getCategoryList } from "./categories/getCategory";
import { addToCart } from "./products/addToCart";
import { deleteCartInProduct } from "./products/deleteCartinProduct";
import { downloadProductPdf } from "./products/downloadProductPdf";
import { getCartIems } from "./products/getCartItems";
import { getProductList } from "./products/getProductsList";
import { getAllProducts } from "./products/getRandomProducts";
import { updateCartQuantity } from "./products/updateCartQuantity";
import { sendQuotations } from "./quotations/sendQuotations";

export const api = {
  auth: {
    login: login,
    register: register,
    fetchLoginUser: fetchLoginUser,
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
    getAllProducts: getAllProducts,
  },
  quotation: {
    sendQuotations: sendQuotations,
  },
};
