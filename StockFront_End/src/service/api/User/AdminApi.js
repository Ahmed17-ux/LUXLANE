import { apiaxios } from "../../../api/IndexApi";

export const AdminApi = {
  Allproducts: () => {
    return apiaxios.get('/admin/product');
  },
  AllOrders: () => {
    return apiaxios.get('/admin/orders');
  },
  AllEditors:()=>{
    return apiaxios.get('/admin/editor');
  },
  AllUsers: ()=>{
    return apiaxios.get('/admin/users');
  }
};
