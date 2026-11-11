import { apiaxios } from "../../../api/IndexApi";

const CategoryApi = {
    AllCategories: async (searchTerm) => {
        try {
          const response = await apiaxios.get('editor/search/categories', { params: { term: searchTerm } });
          return response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
          throw error;
        }
      },
      deleteCategory: async (categoryId) => {
        try {
          const response = await apiaxios.delete(`/editor/category/${categoryId}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting category:', error.response?.data || error.message);
          throw error;
        }
      },
   editCategory: async (categoryId, newCategoryName) => {
    console.log(categoryId,newCategoryName)
    try {
        console.log(categoryId,newCategoryName)
      const response = await apiaxios.put(`/editor/category/${categoryId}`, { category_name: newCategoryName });
      return response.data;
    } catch (error) {
      console.error('Error editing category:', error);
      throw error;
    }
  },

  AddCategory: async (newCategory) => {
    try {
        console.log(newCategory);

        const res = await apiaxios.post('editor/category', newCategory);


        return res;
    } catch (error) {
        console.log(error);

        throw error;
    }
} ,

UserCategories:async ()=>{
    try {
        const response = await apiaxios.get('user/category');
        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
}
};

export default CategoryApi;
