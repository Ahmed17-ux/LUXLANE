import React from 'react'

 import {useNavigate} from 'react-router-dom';

 import { AdminResponsiveRadialBar } from '../Admin_things/ResponsiveRadialBar';
import { BarChartAdmin } from '../Admin_things/BarChartAdmin';
import { useQuery } from 'react-query';
import OrdersApi from '../service/api/User/OrdersApi';
import { Spinner } from "@material-tailwind/react";
import ProductApi from '../service/api/User/ProductApi';
import { apiaxios } from '../api/IndexApi';

function DashboardEditor() {
    const navigate = useNavigate();

    const { data: totalOrders, isLoading, isError } = useQuery('numberOfOrders', () => OrdersApi.NumberOfOrders('editor'));
    const { data: allproduct, isLoading: productLoading, isError: productError } = useQuery('allproduct', ProductApi.AllProducts);
    const { data: reports, isLoading: reportsLoading, isError: reportsError } = useQuery('editorReports', async () => {
        try {
            const response = await apiaxios.get('/editor/allreports');
                return response.data
        } catch (error) {
            throw new Error('Error fetching reports');
        }
    });
    const { data: Alluser, isLoading: AlluserLoading, isError: AlluserError } = useQuery('UserList', async () => {
        try {
            const response = await apiaxios.get('/editor/user');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    });




  return (
    <div className='mx-4 mt-[10%]'>
        <div>
            <h1 className='font-bold text-2xl my-4'>Dashboard</h1>
        </div>
{/* parents card  */}
<div className='grid grid-cols-4 gap-6'>
<div class="flex items-center p-3 w-72 h-28 bg-white rounded-md shadow-lg">
  <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#090979] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
  <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
</svg>

  </section>

  <section class="block border-l border-gray-300 m-6">
    <div class="pl-3">
      <h3 class="text-gray-600 font-semibold text-sm">Customers</h3>
      <h3 class="flex items-center justify-center gap-2  bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
        +{Alluser ? Alluser.length  :   <Spinner className='ext-blue-900  w-4 h-4' />}
        </h3>
    </div>

  </section>
</div>
{/* Total Reports */}

<div class="flex items-center p-3 w-72 h-28 bg-white rounded-md shadow-lg"
>
  <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#090979] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white" >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  </section>

  <section class="block border-l border-gray-300 m-6">
    <div class="pl-3">
      <h3 class="text-gray-600 font-semibold text-sm">Reports</h3>
      <h3 class="flex items-center justify-center gap-2  bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
       + {reports ? reports.length :    <Spinner className='ext-blue-900  w-4 h-4' />}
      </h3>
    </div>
  </section>
</div>

<div class="flex items-center p-3 w-72 h-28 bg-white rounded-md shadow-lg" >
  <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#090979] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
</svg>

  </section>

  <section class="block border-l border-gray-300 m-6">
    <div class="pl-3">
      <h3 class="text-gray-600 font-semibold text-sm">Total Orders</h3>
      <h3 class="flex items-center justify-center gap-1  bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
        +{isLoading   ? <Spinner className='ext-blue-900  w-4 h-4' /> : totalOrders.orders}
              </h3>
    </div>

  </section>
</div>
{/* Products Available */}
<div class="flex items-center p-3 w-72 h-28 bg-white rounded-md shadow-lg">
  <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#090979] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white" onClick={()=>navigate(ALLPRODUCTS_LIST_ADMIN)}>
      <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" clip-rule="evenodd" />
    </svg>
  </section>

  <section class="block border-l border-gray-300 m-6">
    <div class="pl-3">
      <h3 class="text-gray-600 font-semibold text-sm">Available Products</h3>
      <h3 class="flex items-center justify-center gap-2  bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
        + {allproduct && allproduct.data ? allproduct.data?.products?.length :    <Spinner className='ext-blue-900  w-4 h-4' />}
        </h3>

    </div>
  </section>
</div>

</div>

<div className='w-full gap-8 flex'>
<div className='w-[50%] h-[400px] bg-white shadow-xl rounded-md  my-6 '>
<BarChartAdmin/>

</div>
<div className='w-[50%] h-[400px] bg-white shadow-xl rounded-md  my-6 '>
<AdminResponsiveRadialBar/>

</div>
</div>

    </div>
  )
}


export default DashboardEditor
