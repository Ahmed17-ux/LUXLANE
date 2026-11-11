import React, { useEffect, useState, useCallback, useRef } from 'react';
import CategoryApi from '../../service/api/User/CategoryApi';
 import { UserAPI } from '../../service/api/User/UserApi';
 import { useQuery } from 'react-query';
 import { Rating } from "@material-tailwind/react";
import { UseUsercontext } from '../../Contextapi/UserContext';
import { Link } from 'react-router-dom';
import { USER_CHECKOUT_PAGE } from '../../routes/routers';
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { apiaxios } from '../../api/IndexApi';




function ShopingPage() {
  const [allcategories, setAllCategories] = useState([]);
  const [showcard, setshowcard] = useState(false);
  const [errorExistProduct, seterrorExistProduct] = useState(false);
  const [allProducts, setAllProducts] = useState(null);

  const [sortBy, setSortBy] = useState("latest");

  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = React.useState(1);


  const [CartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

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

  const total = CartItems.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2);
  const numberOfProductInCart = CartItems?.length;
  const { data: allProductsData, isLoading, isError } = useQuery('allProducts', UserAPI.AllProductsUser);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(CartItems));
  }, [CartItems]);

  const handelRemoveProductFromCart = (productId) => {
    const newCartItems = CartItems.filter((product) => product.id !== productId);
    setCartItems(newCartItems);
  };

  const handelAddProductToCart = (product) => {
    const isProductInCart = CartItems.some((item) => item.id === product.id);
    if (isProductInCart) {
      seterrorExistProduct(true);
    } else {
      setCartItems([...CartItems, product]);
    }
  };

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
    if (allProductsData) {
      let filteredProducts = allProductsData.data.products;

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
  }, [allProductsData, selectedCategory, Prices, sortBy, searchQuery]);



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


  const Modal = ({ isOpen, onClose, currentProduct  }) => {
    const [closing, setClosing] = useState(false);
    const [entering, setEntering] = useState(false);
    const {user} = UseUsercontext()
    const [formData, setFormData] = useState({
        product_id: currentProduct.id,
        rating: 0,
        content: ''
    });
    const { data:Allcomments, isLoading, error } = useQuery('Comments', UserAPI.GetMyComment);

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.AddComments(formData);
            setFormData({
                product_id: null,
                rating: 0,
                content: ''
            });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setEntering(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
            setClosing(false);
        }, 50); // Adjust this timeout to match the duration of the closing animation
    };

    return (
        <div
            className={`fixed flex items-center justify-end z-50 inset-0 ${
                isOpen ? 'block backdrop-blur-xl' : 'hidden'
            }`}
        >
            <div className="flex items-center justify-center  h-auto w-[85%]">
                <div
                    className={`fixed transition-opacity ${
                        isOpen
                            ? 'block ease-out duration-300 opacity-100'
                            : 'ease-in duration-500 opacity-0'
                    }`}
                >

                </div>

                <div
                    className={` overflow-y-auto inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${
                        closing
                            ? 'ease-out duration-1500 opacity-0 translate-x-full'
                            : entering
                            ? 'ease-out duration-1000 opacity-100 translate-x-0'
                            : 'hidden'
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                    style={{ height: '100vh', width: '100%', maxWidth: '100%' }}
                >
                    <div className="bg-white">
                        <button onClick={handleClose} className="bg-blue-900 p-2  mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <div>

                            <div className="flex  items-center px-2 justify-center">
                                <div className="bg-white  my-8 rounded-lg shadow-lg overflow-hidden md:flex w-full">
                                    <div className="md:w-1/2 pt-4">
                                   <div className='px-4 '>
                                   <img
                                        className="w-full h-[400px] object-cover  shadow-xl rounded-md  hover:scale-100 transition duration-500 cursor-pointer object-cover"
                                        src={`http://127.0.0.1:8000/storage/${currentProduct.imag}`}
                                        alt={currentProduct.image}
                                        />

                                   </div>

                                <div class="grid grid-cols-4 gap-5 p-4  ">
                                    <div className=' shadow-md h-[100px] w-[100px] bg-blue-800 rounded-md flex items-center justify-center hover:scale-125 transition duration-500 cursor-pointer'>01</div>
                                    <div className=' shadow-md  h-[100px] w-[100px] bg-green-800 rounded-md flex items-center justify-center hover:scale-125 transition duration-500 cursor-pointer'>02</div>
                                    <div className=' shadow-md  h-[100px] w-[100px] bg-red-800 rounded-md flex items-center justify-center hover:scale-125 transition duration-500 cursor-pointer'>03</div>
                                    <div className=' shadow-md h-[100px] w-[100px] bg-orange-800 rounded-md flex items-center justify-center hover:scale-125 transition duration-500 cursor-pointer'>04</div>
                                </div>


                                    </div>
                                    <div className="md:w-1/2 p-4 flex flex-col justify-between uppercase">
                                        <div>
                                           <h2 className="text-3xl text-gray-800 font-semibold mb-2">
                                            {currentProduct?.name}

                                            </h2>

                                            <p className="text-gray-700 mb-4  break-words ">
                                            {currentProduct?.description}

                                            </p>
                                            <p className="text-gray-700 mb-4">Price:{currentProduct?.price}</p>
                                        </div>
                                        <div className=''>
                                        <label className="mr-2">
                                                <span className='text-green-400 font-semibold'>In Stock</span> : {currentProduct?.quantity} item
                                            </label>
                                        </div>
                                        <div className="mb-4">

                                            <label   className="mr-2">
                                                Quantity :
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                className="border rounded-lg px-4 py-2 w-16"
                                            />
                                        </div>

                                        <button
                                            className="self-end w-[40%] inline-block text-[12px] px-3 py-1 rounded-l-2xl rounded-t-2xl bg-[#35439c] hover:bg-white hover:text-[#2c6ca4] focus:text-[#7747FF] focus:bg-gray-200 text-gray-100 font-bold leading-loose transition duration-200 relative overflow-hidden"
                                            onClick={() => {
                                                handelAddProductToCart(currentProduct);
                                                onClose();
                                            }}
                                        >
                                            Add to Cart
                                            <span className="absolute inset-0 border border-transparent rounded-l-2xl rounded-t-2xl hover:border-[#2c6ca4] transition duration-200"></span>
                                                </button>
                                    </div>
                                </div>
                            </div>
                            {/* product video */}
                            <div className='p-8 flex items-center justify-center' >
                            <video
                                className="h-full w-[90%] rounded-lg"
                                controls
                                autoPlay
                                muted
                            >
                                <source src={`http://localhost:8000/storage/${currentProduct.video_url}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            </div>
                            <div>


{/* Comments users */}
<div className='mt-10'>
    <div className='px-4'>
    <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center justify-between ">
                <div className='flex items-center gap-5'>
                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={`http://localhost:8000/storage/${user.image}`} alt=""/>
                    <span className='text-gray-700'>{user?.name}</span>
                </div>
                <div className='pr-6'>
                    <Rating value={formData.rating} name='rating' onChange={handleRatingChange} />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Comment</label>
                <textarea id="content" name="content" className="w-full border px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none h-[100px]" rows="8" placeholder="Your Comment" value={formData.content} onChange={handleChange} required></textarea>
            </div>
            <input type="hidden" name="product_id" value={formData.product_id} />
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Submit</button>
            </div>
        </form>

    </div>
<div class="antialiased mx-auto max-w-screen-lg my-5">

<h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
{/*All Comments  */}
{/* <div class="space-y-4">

  <div class="flex">
    <div class="flex-shrink-0 mr-3">
      <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="" alt=""/>
    </div>
    <div class="flex-1 border  border-blue-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
      <p class="text-sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua.
      </p>

    </div>
  </div>

  <div class="flex">
    <div class="flex-shrink-0 mr-3">
      <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="" alt="" />
    </div>
    <div class="flex-1 border border-blue-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
      <p class="text-sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua.
      </p>

      <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>

      <div class="space-y-4">
        <div class="flex">
          <div class="flex-shrink-0 mr-3">
            <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="" alt="" />
          </div>
          <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
            <p class="text-xs sm:text-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex-shrink-0 mr-3">
            <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="" alt=""/>
          </div>
          <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
            <p class="text-xs sm:text-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}
<div class="space-y-4">
  {isLoading && <div>Loading...</div>}
  {error && <div>Error: {error.message}</div>}
  {Allcomments && Allcomments.my_comments.map(comment => (
    <div class="flex" key={comment.id}>
      <div class="flex-shrink-0 mr-3">
        <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={`http://localhost:8000/storage/${user.image}`} alt=""/>
      </div>
      <div class="flex-1 border  border-blue-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment.author}</strong> <span class="text-xs text-gray-400">{comment.time}</span>
        <p class="text-sm">{comment.content}</p>
      </div>
    </div>
  ))}
</div>

</div>
</div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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


  // Calculate the total number of pages based on the total number of products
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

            <div className="mt-8">
  <div className="flow-root">
    {CartItems?.length === 0 ? (
      <p className='flex items-center justify-center w-full text-blue-800'>"No products added yet"</p>
    ) : (
      <ul role="list" className="-my-6 divide-y divide-gray-200">

        {/* Cart items */}
        {CartItems.map((product) => (
  <li className="flex py-6" key={product.id}>
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img src={`http://localhost:8000/storage/${product.imag}`} alt={product.name} className="h-full w-full object-cover object-center"/>
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className='flex items-center'>
            <a href="#">{product.name}</a>
          </h3>
          <p className="ml-4">{product.price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">Available Quantity: {product.quantity}</p>
      </div>
      <div className="flex flex-1 items-end justify-around text-sm">


        <div className="flex w-full items-center justify-end">
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => handelRemoveProductFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
))}

      </ul>
    )}
  </div>
</div>

          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${total}</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    {numberOfProductInCart  ?  <Link to={USER_CHECKOUT_PAGE}>
    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
      Checkout
    </a>
    </Link> :
    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-not-allowed">
      Nothing To Checkout
    </a>
    }

  </div>
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


<div   className='w-full'>
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

    <div className='ml-4'>

      <li class="font-sans block  text-blue-900 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black">

  <a onClick={()=>  toggleShoppingCart()} class="flex cursor-pointer h-10 items-center px-2 rounded-lg border border-blue-900 hover:border-gray-300 focus:outline-none hover:shadow-inner">
          <svg  class="h-6 w-6 leading-none  stroke-current text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="pl-1  font-bold text-md ">{numberOfProductInCart}</span>
        </a>
</li>
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
  <button
    className="self-end w-[40%] inline-block text-[12px] px-3 py-1 rounded-l-2xl rounded-t-2xl bg-[#35439c] hover:bg-white hover:text-[#2c6ca4] focus:text-[#7747FF] focus:bg-gray-200 text-gray-100 font-bold leading-loose transition duration-200 relative overflow-hidden"
    onClick={() => { handelAddProductToCart(product) }}
  >
    Add to Cart
    <span className="absolute inset-0 border border-transparent rounded-l-2xl rounded-t-2xl hover:border-[#2c6ca4] transition duration-200"></span>
  </button>
</div>
<Modal
    isOpen={modalOpen === product.id}
    currentProduct={product}
    onClose={() => toggleModal(null)}
    handelAddProductToCart={handelAddProductToCart}
/>


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

export default ShopingPage;






