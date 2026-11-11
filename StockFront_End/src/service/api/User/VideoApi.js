import { apiaxios } from "../../../api/IndexApi";

const VideoApi = {
    create: async (payload) => {
      try {
        return await apiaxios.post('/editor/product/video/', payload);
      } catch (error) {
        throw error;
      }
    },
  }

  export default VideoApi;


