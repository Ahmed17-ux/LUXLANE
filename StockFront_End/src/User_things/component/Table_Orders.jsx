import { Avatar, Chip,Input } from "@material-tailwind/react";

function Table_Orders() {
  return (
    <>
      <div className="w-full mx-auto max-w-1000 px-4  my-12">

        <div className="flex items-center justify-between shadow-md text-black rounded-t-lg ">

        <h2 className="text-2xl font-bold my-6 text-start m-4">Orders List</h2>
        <div className="w-72 m-4">
      <Input label="Searsh" icon={

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
</svg>


      } />
    </div>


        </div>
        <div className="responsive-table">
          {/* Hide on small screens and display on larger screens */}
          <div className="hidden sm:flex bg-blue-900 text-white font-bold text-xs uppercase tracking-wider mb-4 p-6 flex justify-between items-center border-radius-3 rounded-b-lg ">
            <div className="flex-basis-2/5  pr-4">Name Product</div>
            <div className="flex-basis-1/10 ml-10  pr-4">ID Order</div>
            <div className="flex-basis-1/4  pr-4">Date Order</div>
            <div className="flex-basis-1/4   pr-4">Status</div>
            <div className="flex-basis-1/4  pr-4">Quantity</div>
            <div className="flex-basis-1/4">Total</div>
          </div>

          {/* Table row */}
          <div className="shadow-md text-black text-xs uppercase tracking-wider mb-2 p-2 flex flex-col md:flex-row justify-between items-stretch border-radius-3 h-auto rounded-md">
            <div className="sm:border-b-[1.5px] pb-2 lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center font-bold md:border-r-[1.5px] lg:border-r-[1.5px] xl:border-r-[1.5px] border-gray-200 pr-4 border-b sm:border-b-[1.5px]" data-label="Name Product">
              <Avatar src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg" className="mr-4" alt='avatar' size="xl" />
              <strong>Product A</strong>
            </div>

            <div className="sm:border-b-[1.5px] pb-2 lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center font-bold md:border-r-[1.5px] lg:border-r-[1.5px] xl:border-r-[1.5px] border-gray-200 pr-4 border-b sm:border-b-[1.5px]" data-label="ID Order">1</div>
<div className="sm:border-b-[1.5px] pb-2 lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center font-bold md:border-r-[1.5px] lg:border-r-[1.5px] xl:border-r-[1.5px] border-gray-200 pr-4 border-b sm:border-b-[1.5px]" data-label="Date Order">2023-01-01</div>
<div className="sm:border-b-[1.5px] pb-2 lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center font-bold md:border-r-[1.5px] lg:border-r-[1.5px] xl:border-r-[1.5px] border-gray-200 pr-4 border-b sm:border-b-[1.5px]" data-label="Price">
  <Chip variant="ghost" color="blue" size="sm" value="in progress" />
</div>
<div className="sm:border-b-[1.5px] pb-2 lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center font-bold md:border-r-[1.5px] lg:border-r-[1.5px] xl:border-r-[1.5px] border-gray-200 pr-4 border-b sm:border-b-[1.5px]">
  $50
</div>

<div className="sm:border-b-[1.5px] pb-2  lg:border-b-0 flex-basis-full mb-2 md:mb-0 flex items-center text-green-800 border-gray-200 pr-4 border-b sm:border-b-4">
  <Chip variant="ghost" color="green" size="sm" value="$100" />
</div>



          </div>

        </div>
      </div>
    </>
  );
}

export default Table_Orders;
