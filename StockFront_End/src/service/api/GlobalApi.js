import { apiaxios } from "../../api/IndexApi";

export const GlobalApi = {
  AllProducts: async () => {
    const res = await apiaxios.get("/allproduct");
    return res.data.products;
  },
};
