import { apiaxios } from "../../../api/IndexApi";

const EditorApi = {
  create: async (payload) => {
    try {
      return await apiaxios.post('/admin/editor', payload);
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }

  },
AllEditor: async () =>{
    return await apiaxios.get('/admin/editor');

},

RemoveEditor: async (editorId) => {
    try {
      return await apiaxios.delete(`/admin/editor/${editorId}`);
    } catch (error) {
      console.error('Error during editor removal', error);
      throw error;
    }
  },
 

};

export default EditorApi;
