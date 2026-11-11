import { apiaxios } from "../../../api/IndexApi";

const productBasePath = () => {
  const role = window.localStorage.getItem("role");
  return role === "admin" || window.location.pathname.startsWith("/admin")
    ? "/admin/product"
    : "/editor/product";
};

const ProductApi = {
  createProduct: async (payload) => {
      try {
      return await apiaxios.post('/editor/product', payload);
    } catch (error) {
      console.error('Error during product creation', error);
      throw error;
    }
  },

  AllProducts: async () => {
    return await apiaxios.get(productBasePath());
  },
  editProduct: async (productId, payload) => {
    try {
      return await apiaxios.put(`${productBasePath()}/${productId}`, payload);
    } catch (error) {
      console.error(`Error during product edit for ID ${productId}`, error);
      throw error;
    }
  },
  removeProduct: async (productId) => {
    try {
      return await apiaxios.delete(`${productBasePath()}/${productId}`);
    } catch (error) {
      console.error(`Error during product removal for ID ${productId}`, error);
      throw error;
    }
  },
  updateProduct: async (productId, payload) => {
    try {
      const response = await apiaxios.put(`${productBasePath()}/${productId}`, payload);

      if (response && response.data) {
        return response;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error updating product:', error.response);
      throw error;
    }
  },
};

export default ProductApi;
