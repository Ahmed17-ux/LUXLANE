import { apiaxios } from "../../../api/IndexApi";

const ReportsApi = {
    updateStatus: async (payload) => {
        try {
          const { role, ...content } = payload;
          console.log(content)
          return await apiaxios.put(`/${role}/updatereportstatus`, content);
        } catch (error) {
          console.error('Error during report status update', error);
          throw error;
        }
      }

  ,
  getAllReports: async () => {
    try {
      const response = await apiaxios.get('/editor/allreports');
      return response.data;
    } catch (error) {
      console.error('Error fetching all reports:', error);
      throw error;
    }
  }
};

export default ReportsApi;
