import { apiaxios } from "../../../api/IndexApi";


export const UserAPI = {



login: async (email, password) => {

    try {
      return await apiaxios.post('/login', { email, password });
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  },

logout: async () => {
     return await apiaxios.post('/logout');
},

getUser: async (role) => {
        return await apiaxios.get(role);
  },


  AllProductsUser: async () => {
    return await apiaxios.get('/user/product');
  },


updateProfile: async (userId, data) => {
    try {
      return await apiaxios.put(`/user/${userId}`, data);
    } catch (error) {
      console.error('Error updating profile', error);
      throw error;
    }
  },
  removeAccount: async (userId, password) => {
    try {
         await apiaxios.get(`/user/${userId}/remove`, {
            params: {
                password: password
            }
        });
    } catch (error) {
        console.error('Error removing user account', error);
        throw error;
    }
},
SendReport: async (report) => {
    try {
        const response = await apiaxios.post('/user/report', report);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllReports: async () => {
    try {
      const response = await apiaxios.get('/admin/allreports');
      return response.data;
    } catch (error) {
      console.error('Error fetching all reports:', error);
      throw error;
    }
  },




  AddOrUpdateImageProfile: async (imageFile) => {
    try {

        const response = await apiaxios.post('/user/addupdateimage', imageFile);
    } catch (error) {
        console.error('Error:', error);
    }
},
AddComments : async (newcomment) => {
    console.log(newcomment)
    try {
        const response = await apiaxios.post('/user/comments', newcomment);
        console.log('Comment added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

,GetMyComment : async () => {
    try {
        const response = await apiaxios.get('/user/comments');
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

};
