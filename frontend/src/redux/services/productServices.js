import { http } from "./http";

export const getProductsApi = async (limit, skip, query) => {
  return await http.get(
    `/admin/product/getProducts?limit=${limit}&skip=${skip}&query=${query}`
  );
};

export const getProductDetailApi = async (id) => {
  return await http.get(`/admin/product/${id}/detail`);
};
export const addProductApi = async (data) => {
  await http.post(`/admin/product/addProduct`, data);
};

export const updateProductApi = async (data, id) => {
  await http.put(`/admin/product/${id}`, data);
};
