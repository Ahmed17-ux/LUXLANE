import { apiaxios } from "../../../api/IndexApi";

const OrdersApi = {
    NumberOfOrders: async (role) => {
        try {
          const response = await apiaxios.get(`/${role}/countorders`);
          return response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
          throw error;
        }
      },

};

export default OrdersApi;
