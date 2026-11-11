import React, { useEffect, useState, useCallback, useRef } from 'react';
 import { useQuery } from 'react-query';
 import { Rating } from "@material-tailwind/react";
import { UseUsercontext } from '../Contextapi/UserContext';
import { Link } from 'react-router-dom';
import { LOGIN_PATH, USER_CHECKOUT_PAGE } from '../routes/routers';
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { GlobalApi } from '../service/api/GlobalApi';

import CategoryApi from '../service/api/User/CategoryApi';


function Shop() {
  const [allcategories, setAllCategories] = useState([]);
  const [showcard, setshowcard] = useState(false);
  const [errorExistProduct, seterrorExistProduct] = useState(false);
  const [allProducts, setAllProducts] = useState(null);

  const [sortBy, setSortBy] = useState("latest");

  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = React.useState(1);




  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [Prices, SetPrices] = useState({ mnprice: null, mxprice: null });
  const minprice = useRef();
  const maxprice = useRef();

const handleSortChange = (event) => {
  setSortBy(event.target.value);
};
  const handleMinPriceChange = (event) => {
    SetPrices({ ...Prices, mnprice: event.target.value });
  };

  const handleMaxPriceChange = (event) => {
    SetPrices({ ...Prices, mxprice: event.target.value });
  };





  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const { data: globalproduct, isLoading, isError } = useQuery('globalproduct', GlobalApi.AllProducts);
  console.log(globalproduct);






  const toggleShoppingCart = () => {
    setshowcard(!showcard);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await CategoryApi.UserCategories();
      setAllCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);




useEffect(() => {
  if (globalproduct) {
    let filteredProducts = globalproduct;

      // Filter products based on selected category
      if (selectedCategory !== "All categories") {
        filteredProducts = filteredProducts.filter(product => product.category_name === selectedCategory);
      }

      // Filter products by price
      filteredProducts = filterProductsByPrice(filteredProducts);

      // Filter products by search query
      if (searchQuery.trim() !== "") {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort products based on sortBy criteria
      let sortedProducts = [...filteredProducts];
      if (sortBy === "latest") {
        sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortBy === "priceLowToHigh") {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortBy === "priceHighToLow") {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }

      setAllProducts(sortedProducts);
    }
  }, [globalproduct, selectedCategory, Prices, sortBy, searchQuery]);



  const filterProductsByPrice = (products) => {
    const { mnprice, mxprice } = Prices;
    if (mnprice && mxprice) {
      return products.filter((product) => {
        const price = parseFloat(product.price);
        return price >= parseFloat(mnprice) && price <= parseFloat(mxprice);
      });
    }
    return products;
  };


  const [modalOpen, setModalOpen] = useState(null);

  const toggleModal = (productId) => {
    setModalOpen(productId === modalOpen ? null : productId);
  };


 

// here we check if the name is too long we cut it and add three point in the end ...
const truncateProductName = (name) => {
    const maxLength = 10; // Default maximum length
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  const productsPerPage = 8;


  const totalPages = Math.ceil(allProducts?.length / productsPerPage);

  // Calculate the index of the first product on the current page
  const startIndex = (active - 1) * productsPerPage;

  // Slice the array of products to get the products for the current page
  const productsOnPage = allProducts?.slice(startIndex, startIndex + productsPerPage);
  return (
    <>
{errorExistProduct &&(
        <div class="fixed top-[70px] right-4 z-50 animate-shake">
        <div class="flex w-auto shadow-lg rounded-lg">
            <div class="bg-red-600 py-4 px-6 rounded-l-lg flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>            </div>
            <div class="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                <div  className='px-4'>Product already Exist in the cart</div>
                <button onClick={()=>seterrorExistProduct(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                </button>
            </div>
        </div>
    </div>
)}

 {showcard && (
  <div className="z-10 fixed inset-0 overflow-hidden" role="dialog" aria-modal="true">
    <div className="fixed animation-duration mt-[60px] mb-[10px] inset-y-0 right-0 flex max-w-full pl-10 overflow-hidden top-15 sm:pl-0">
      <div className="w-full sm:w-full md:w-screen max-w-md"> {/* Updated width classes */}
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
              <button className='' onClick={() => { toggleShoppingCart() }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-800 hover:text-blue-300">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
</svg>
              </button>
            </div>



          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${total}</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or
      <button  onClick={() => { toggleShoppingCart() }} type="button" className="font-medium px-2 text-indigo-600 hover:text-indigo-500">
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
    </p>
  </div>
</div>

        </div>
      </div>
    </div>
  </div>
)}


<div   className='w-full my-8'>
{/* header part of searching options */}
<div className="flex   items-center justify-between    py-4 lg:px-12 border-solid">
  <div className="flex justify-between      pr-2       ">
    <div className="flex items-center flex-shrink-0 text-gray-800 mr-2 lg:mr-16">
      <span className="font-semibold text-2xl text-blue-900 tracking-tight">Search Options</span>
    </div>
  </div>

  <div className="  flex lg:items-center lg:px-3 px-8">
    <div className="text-md font-bold text-blue-700 lg:flex-grow">
     </div>

    <div className="flex mx-6">

<div class="relative inline-flex">
  <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
 <select
  className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
  value={sortBy}
  onChange={handleSortChange}
>
  <option disabled>Sort By</option>
  <option value="latest">Latest</option>
  <option value="priceLowToHigh">Price Low To High</option>
  <option value="priceHighToLow">Price To High Low </option>
</select>
</div>
    </div>

    <div className='ml-4'>
    <input
          className="border-2 w-auto border-gray-300 bg-white h-10 px-8 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>


  </div>
</div>


    <div className='text-center flex '>
{/* side bare of searching options*/}
    <div className="w-[200px]  mx-2 h-full relative  ">

      <div className="mt-4">
      <div className="text-left mx-4">
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="focus:outline-none inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring focus:border-blue-300"
        >
          <option value="All categories">All categories</option>
          {allcategories.map((item) => (
            <option key={item.category_name} value={item.category_name}>
              {item.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4 text-center">
      <input
  type="number"
  name="minPrice"
  placeholder="Min price"
  ref={minprice}
  value={Prices.mnprice}
  onChange={handleMinPriceChange}
  className="border border-gray-300 mb-2 rounded-xl px-3 py-2 w-[90%] focus:outline-none focus:border-blue-500"
/>
<input
  type="number"
  name="maxPrice"
  ref={maxprice}
  placeholder="Max price"
  value={Prices.mxprice}
  onChange={handleMaxPriceChange}
  className="border border-gray-300 rounded-xl px-3 py-2 w-[90%] focus:outline-none focus:border-blue-500"
/>


      </div>
    </div>





      </div>
    </div>

    <div className='w-full px-4 pb-[8%] overflow-x-auto'>
  <div className='flex flex-wrap gap-4 justify-start' >
    {isLoading ? (
      <>
        {/* Skeleton Cards */}
        <div className="w-60 h-80 bg-transparent border p-3 flex flex-col gap-1 rounded-br-3xl">
          <div className="duration-500 contrast-50 h-48 from-black via-orange-900 to-indigo-600 hover:contrast-100">
            {/* Skeleton loader for image */}
            <div className="h-full w-full animate-pulse bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {/* Skeleton loader for product name */}
                <span className="text-xl text-[#35439c] font-bold bg-gray-300 h-6 w-3/4 animate-pulse"></span>
                {/* Skeleton loader for product ID */}
                <p className="text-xs text-gray-400 bg-gray-300 h-4 w-1/2 animate-pulse"></p>
              </div>
              {/* Skeleton loader for product price */}
              <span className="font-bold text-[#35439c] bg-gray-300 h-6 w-1/4 animate-pulse"></span>
            </div>
            {/* Skeleton loader for add to cart button */}
            <button
              className="self-end w-[40%] inline-block text-[12px] px-3 py-1 rounded-l-2xl rounded-t-2xl bg-gray-300 hover:bg-white hover:text-[#2c6ca4] focus:text-[#7747FF] focus:bg-gray-200 text-gray-100 font-bold leading-loose transition duration-200 relative overflow-hidden"
              disabled
            >
              <span className="absolute inset-0 border border-transparent rounded-l-2xl rounded-t-2xl hover:border-[#2c6ca4] transition duration-200 bg-gray-300"></span>
            </button>
          </div>
        </div>
        <div className="w-60 h-80 bg-transparent border p-3 flex flex-col gap-1 rounded-br-3xl">
          <div className="duration-500 contrast-50 h-48 from-black via-orange-900 to-indigo-600 hover:contrast-100">
            {/* Skeleton loader for image */}
            <div className="h-full w-full animate-pulse bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {/* Skeleton loader for product name */}
                <span className="text-xl text-[#35439c] font-bold bg-gray-300 h-6 w-3/4 animate-pulse"></span>
                {/* Skeleton loader for product ID */}
                <p className="text-xs text-gray-400 bg-gray-300 h-4 w-1/2 animate-pulse"></p>
              </div>
              {/* Skeleton loader for product price */}
              <span className="font-bold text-[#35439c] bg-gray-300 h-6 w-1/4 animate-pulse"></span>
            </div>
            {/* Skeleton loader for add to cart button */}
            <button
              className="self-end w-[40%] inline-block text-[12px] px-3 py-1 rounded-l-2xl rounded-t-2xl bg-gray-300 hover:bg-white hover:text-[#2c6ca4] focus:text-[#7747FF] focus:bg-gray-200 text-gray-100 font-bold leading-loose transition duration-200 relative overflow-hidden"
              disabled
            >
              <span className="absolute inset-0 border border-transparent rounded-l-2xl rounded-t-2xl hover:border-[#2c6ca4] transition duration-200 bg-gray-300"></span>
            </button>
          </div>
        </div>
      </>
    ) : isError ? (
      <p>Error fetching products</p>
    ) :  allProducts?.length === 0 ? (
            // No products in selected category
            <div className='flex items-center justify-center w-full'>
            No products found in this category
          </div>          ) : (
      productsOnPage?.map((product) => (
        <div key={product.id} className="w-60 h-80 bg-transparent border p-3 flex flex-col gap-1 rounded-br-3xl">
          <div className="duration-500 contrast-50 h-48 bg-gradient-to-bl from-black via-orange-900 to-indigo-600 hover:contrast-100">
            <img src={`http://localhost:8000/storage/${product.imag}`} alt={product.image} className="h-full w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
              <span className="text-xl text-[#35439c] font-bold">
              <span className="text-xl text-[#35439c] font-bold cursor-pointer hover:text-[#2c6ca4]"  onClick={() => toggleModal(product.id)}>

  {truncateProductName(product.name)}
</span>
</span>

                <p className="text-xs text-gray-400">ID: {product.id}</p>
              </div>
              <span className="font-bold text-[#35439c]">${product.price}</span>
            </div>
            <div className='flex items-center justify-between'>
            <button className='text-xs animate-pulse text-blue-900' onClick={() => toggleModal(product.id)}>Learn more</button>
<Link to={LOGIN_PATH}>
<button
    className="self-end w-full inline-block text-[12px] px-3 py-1 rounded-l-2xl rounded-t-2xl bg-[#35439c] hover:bg-white hover:text-[#2c6ca4] focus:text-[#7747FF] focus:bg-gray-200 text-gray-100 font-bold leading-loose transition duration-200 relative overflow-hidden"

  >
    Add to Cart
    <span className="absolute inset-0 border border-transparent rounded-l-2xl rounded-t-2xl hover:border-[#2c6ca4] transition duration-200"></span>
  </button>
</Link>
</div>



          </div>
        </div>
      ))
    )}
  </div>
</div>


    </div>
    {/* Pagination  */}
    <div className="fixed bottom-4 left-0 right-0 flex  items-center  justify-center ">
  <div className='flex items-center  justify-center bg-white p-2 w-auto rounded-lg gap-12'>
  <IconButton
    size="sm"
    variant="outlined"
    onClick={prev}
    disabled={active === 1}
  >
    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
  </IconButton>
  <Typography color="gray" className="font-normal">
    Page <strong className="text-blue-900">{active}</strong> of{" "}
    <strong className="text-blue-900">{totalPages}</strong>
  </Typography>
  <IconButton
    size="sm"
    variant="outlined"
    onClick={next}
    disabled={active === totalPages}
  >
    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
  </IconButton>
  </div>
</div>

</div>
    </>
  );
}

export default Shop;






