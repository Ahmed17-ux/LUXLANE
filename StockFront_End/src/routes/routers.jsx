import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Indexbar } from '../layout/Navbar';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
 import { UserLayout_Dash } from '../layout/UserLayout_Dash';
 import ProfileInfo from '../User_things/ProfileInfo';
import { AdminLayout_Dash } from '../layout/AdminLayout_Dash';

import ProfileInfoAdmin from '../Admin_things/ProfileInfoAdmin';
import ProfileInfoEditor from '../Editor_things/ProfileInfoEditor';
import EdtiorLayout_Dash from '../layout/EditorLayout_Dash.jsx';
import { Sidebar } from '../User_things/Sidebar';
import Aboutus from '../pages/Aboutus';
import Table_Orders from '../User_things/component/Table_Orders';
import { SidebarAdmin } from '../Admin_things/SidebarAdmin';
 import Add_Editor from '../Admin_things/Editor_side/Add_Editor';
import ALL_Editors from '../Admin_things/Editor_side/ALL_Editors';
import { SidebarEditor } from '../Editor_things/SidebarEditor';
import Add_Product from '../Editor_things/Product_Side/Add_Product';
import AllOp from '../Editor_things/Categories_Side/AllOp';
import ShopingPage from '../User_things/ShopingSide/ShopingPage.jsx';
import DashboardAdmin from '../Admin_things/DashboardAdmin.jsx';
import { Reports } from '../Admin_things/Reports.jsx';
import Admin_Allproducts from '../Admin_things/Products/Admin_Allproducts.jsx';
import Admin_AllUsers from '../Admin_things/Users/Admin_AllUsers.jsx';
import DashboardEditor from '../Editor_things/DashboardEditor.jsx'
import CheckoutPage from '../User_things/ShopingSide/CheckoutPage.jsx';
import Editor_Products_list from '../Editor_things/Product_Side/Editor_Products_list.jsx';
import Editor_UserReports from '../Editor_things/Reports/Editor_UserReports.jsx';
import Shop from '../pages/Shop.jsx';

// Global Routes
export const HOME_PATH = '/home';
export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';
export const LOGOUT_PATH = '/logout';
export const ABOUTUS_PATH = '/aboutus';
export const SHOP_PATH = '/';

// Admin routes
export const  ADMIN_BASE_PATH = '/admin'

export const ADMIN_DASHBOARD_PATH = ADMIN_BASE_PATH + '/dashboard';
export const  DASHBORD_CONTRLLE   =  ADMIN_DASHBOARD_PATH +'/controlle'
export const PROFILE_INFO_ADMIN   = '/profile/info' + ADMIN_BASE_PATH;
export const ADMIN_ADD_EDITOR     = ADMIN_DASHBOARD_PATH +'/add/editor'
export const ADMIN_ALL_EDITOR_VIEW= ADMIN_DASHBOARD_PATH +'/all/editor'
export const REPORTS= ADMIN_DASHBOARD_PATH +'/reports'
export const ALLPRODUCTS_LIST_ADMIN= ADMIN_DASHBOARD_PATH +'/allproducts'
export const ADMIN_LIST_USERS= ADMIN_DASHBOARD_PATH +'/allusers'


// Editor Routes
export const EDITOR_DASHBOARD_PATH = '/editor/dashboard';
export const EDITOR_DASHBOARD_CONTROLLE= EDITOR_DASHBOARD_PATH + '/controlle';
export const PROFILE_INFO_EDITOR = '/profile/info/editor';
export const EDITOR_USERREPORTS = EDITOR_DASHBOARD_PATH + '/reports'



// User Routes
export const USER_DASHBOARD_PATH = '/user/dashboard';
export const PROFILE_INFO = '/profile/info';
export const SHOPING_PAGE = USER_DASHBOARD_PATH + '/product'
export const TABLE_ORDERS = USER_DASHBOARD_PATH + '/orders'
export const USER_CHECKOUT_PAGE = USER_DASHBOARD_PATH + '/checkout'



// Products Routes
const BASE_PRODUCT_PATH =EDITOR_DASHBOARD_PATH +  '/product'
export const PRODUCT_FORM =  BASE_PRODUCT_PATH + '/new'
export const PRODUCT_LIST = BASE_PRODUCT_PATH + '/list'


// Category Routes
export const BASE_CATEGORY_PATH =EDITOR_DASHBOARD_PATH +  '/categories'






export const router = createBrowserRouter([
  {
    element: <Indexbar />,
    children: [
      {
        path: HOME_PATH,
        element: <Home />,
      },
      {
        path: SHOP_PATH,
        element:<Shop/> ,
      },
      {
        path: '*',
        element: <h1>Page Not Found</h1>,
      },
      {
    path: SIGNUP_PATH,
    element: <Register />,
    },
    {
    path: LOGIN_PATH,
     element: <Login />,
    },
    {
        path: ABOUTUS_PATH,
         element: <Aboutus />,
        },

    ],
  },

// user routes
{
    element: <UserLayout_Dash />,
    children: [
    {
    path: USER_DASHBOARD_PATH,
    element: <Sidebar />,
    children: [
        {
        index: true,
        element: <Navigate to={SHOPING_PAGE} replace />
        },
        {
        path: SHOPING_PAGE,
            element: <ShopingPage />
        },
        {
        path: TABLE_ORDERS,
        element: <Table_Orders />

        }

    ]
        },

    {
        path: PROFILE_INFO,
        element: <ProfileInfo />,
    },
    {
        path: USER_CHECKOUT_PAGE,
        element: <CheckoutPage />,
      },

    ],
  },
//   admin routes
  {
    element: <AdminLayout_Dash />,
    children: [
      {
        path: ADMIN_DASHBOARD_PATH,
        element: <SidebarAdmin />,
        children:[
        {
            index: true,
            element:<Navigate to={DASHBORD_CONTRLLE} replace />,
        },
        {

            path:DASHBORD_CONTRLLE,
            element:<DashboardAdmin/>,
        },
        {

            path:ADMIN_ADD_EDITOR,
            element:<Add_Editor/>,
        },

        {
            path:ADMIN_ALL_EDITOR_VIEW,
            element:<ALL_Editors/>,
        },
        {
            path: REPORTS,
            element: <Reports />,
          },
        {
            path: ALLPRODUCTS_LIST_ADMIN,
            element: <Admin_Allproducts />,

          },
          {
            path: ADMIN_LIST_USERS,
            element: <Admin_AllUsers />,

          },

        ]

      },
      {
        path: PROFILE_INFO_ADMIN,
        element: <ProfileInfoAdmin />,

      },

    ],
  },
//   editor routes
  {
    element: <EdtiorLayout_Dash />,
    children: [
      {
        path: EDITOR_DASHBOARD_PATH,
        element: <SidebarEditor />,
        children:[
        {
        index: true,
        element:<Navigate to={EDITOR_DASHBOARD_CONTROLLE} replace />
        },
        {
        // Route For Product List
        path:PRODUCT_LIST,
        element:<Editor_Products_list/>
        },

        {
        // EDITOR_DASHBOARD_CONTROLLE overview Dashboard
        path:EDITOR_DASHBOARD_CONTROLLE,
        element:<DashboardEditor/>
        },
        {
        // Route For Product Form to add new product
        path:PRODUCT_FORM,
        element:<Add_Product/>
        },

        {
        path:BASE_CATEGORY_PATH,
        element:<AllOp/>
        },
        {
            path:EDITOR_USERREPORTS,
            element:<Editor_UserReports/>
            },


        ]


      },
      {
        path: PROFILE_INFO_EDITOR,
        element: <ProfileInfoEditor />,

      },
    ],
  },
]);
