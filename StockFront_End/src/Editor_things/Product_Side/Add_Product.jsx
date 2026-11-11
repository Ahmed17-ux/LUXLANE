import { Textarea, Input, Typography,Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
 import ProductApi from "../../service/api/User/ProductApi";
import VideoApi from "../../service/api/User/VideoApi";
import CategoryApi from "../../service/api/User/CategoryApi";

function Add_Product() {
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const [loading, setLoading] = useState(false);
    const [Alertsucess,setAlertsucess]  = useState(false)
    const [serverErrors, setServerErrors] = useState({});

    const [categories,setcategories]= useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await CategoryApi.AllCategories();
            setcategories(response)
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };

        fetchData();
      }, []);



const handleFormProduct = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('imag', data.imag[0]);
      formData.append('name', data.name.trim());
      formData.append('description', data.description.trim());
      formData.append('category_name', data.category_name);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);

      // Step 1: Create Product
      const productResponse = await ProductApi.createProduct(formData);

      if (productResponse.status === 201) {
        const productId = productResponse.data.id;

        // Step 2: Create Video
        const videoFormData = new FormData();
        videoFormData.append('product_id', productId);
        videoFormData.append('video', data.video[0]);

        const videoResponse = await VideoApi.create(videoFormData);

        if (videoResponse.status === 201) {
          setAlertsucess(true);
          setServerErrors({});
          reset();
        } else {
          // Handle video creation error
          setServerErrors(videoResponse.data.errors);
        }
      } else {
        // Handle product creation error
        setServerErrors(productResponse.data.errors);
      }
    } catch ({ response }) {
      // Handle unexpected errors
      if (response && response.data && response.data.errors) {
        setServerErrors(response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };





    return (
        <>
 {/* Alert Success */}
<div className="flex items-center justify-end mt-[90px] mr-4">
  {Alertsucess && (
    <div className="flex fixed mt-8 bg-green-100 rounded-lg p-4 text-sm text-green-700 w-[250px]" role="alert">
      <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
      <div>
        <span className="font-medium">Success Insert!</span> Product Added To stock with Success
      </div>
    </div>
  )}
</div>



{/* Form  */}


            <div className="transition-colors duration-400  ">
                <div className="mx-auto p-4   ">
                    <div className="bg-white  shadow rounded-lg p-6   items-center justify-center   ">
                        <h1 className="sm:text-base lg:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 ">Product Form </h1>
                        <p className="sm:text-sm lg:text-base text-gray-600  mb-6">Check If that Product already Exist or not </p>
        <form onSubmit={handleSubmit(handleFormProduct)} encType="multipart/form-data" >

{/* image */}
<div className="mb-4 ">

            <div className="lg:flex items-center  justify-between  ">
                <Typography className="text-gray-800 text-xl ">
                Product Picture Should be Transparent
                </Typography>



            <div class="flex w-auto  items-center justify-center ">
                <label class="w-auto gap-8 flex  items-center justify-between p-4 bg-white text-blue rounded-md shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="leading-normal">Select Imag  </span>
                    <input type='file'
                    {...register('imag',{required:{
                                    value:true,
                                    message:'Image is required'
                    }})} className="hidden" />
                </label>
            </div>


</div>
<div>
            <span className='text-red-600 text-xs'>{errors.imag?.message}</span>

            </div>
            </div>


{/* Video */}
<div className="mb-4 ">

<div className="lg:flex items-center  justify-between  ">
    <Typography className="text-gray-800 text-xl ">
        Product Video :
    </Typography>


<div class="flex w-auto  items-center justify-center bg-grey-lighter">
    <label class="w-auto gap-8 flex  items-center justify-between px-4 py-4 bg-white text-blue rounded-md shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>

        <span class="leading-normal">Select Video </span>
        <input
    type='file'
    {...register('video', {
        required: {
            value: true,
            message: 'Video is required',
        },
    })}
    accept="video/*"
    className="hidden"
/>
    </label>
</div>



</div>
<div>
<span className='text-red-600 text-xs'>{errors.video?.message}</span>

</div>
</div>



{/* Name */}
                            <div className="mb-4  ">
                                {/* Name   */}
                                <Input label="Product Name" color="indigo" {...register('name', {
                                    required: true,
                                    maxLength: {
                                        value: 50,
                                        message: 'Name should be less than 50 characters'
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'Name should be more than 4 characters'
                                    },
                                })} />
<span className='text-red-600 text-xs'>{serverErrors?.name || errors?.name?.message}</span>
                            </div>

{/* Description */}
                            <div className="mb-4">
                                <Textarea color="indigo" variant="Description" label="Description" {...register('description', {
                                    required: true,
                                    maxLength: {
                                        value: 255,
                                        message: 'It\'s Too long '
                                    },
                                    minLength: {
                                        value: 20,
                                        message: 'It\'s Too short'
                                    }
                                })} />
                                <span className='text-red-600 text-xs'>{errors.description?.message}</span>
                            </div>



{/* Categories */}
<div className="mb-4 ">
<select
  {...register('category_name', {
    required: {
      value: true,
      message: 'Select Product Category',
    },
  })}
  className="w-full px-4 py-3 text-blue-500 text-gray-700 border border-blue-800 rounded-lg bg-gray-50"
>
{categories ? (
  categories.map((category, index) => (
    <option key={index} value={category?.category_name} className="text-blue-900">
      {category?.category_name}
    </option>
  ))
) : (
  <option value="" disabled>Loading Categories...</option>
)}
</select>
<span className='text-red-600 text-xs'>{errors.category_name?.message}</span>

                    </div>



{/* Price */}
<div className="mb-4 ">

    <Input color="indigo" label="Price" {...register('price', {
            required: true,
            min: {
                value: 3,
                message: 'Product Price should be more than 3$'
                }
            })} />
            <span className='text-red-600 text-xs'>{serverErrors?.price ||errors?.price?.message}</span>
        </div>

{/* Quantity */}
<div className="mb-6">
    <Input label="Quantity" color="indigo" {...register('quantity', {
            required: true,
            min: {
                value: 10,
                message: 'Quantity Should be more than 10 Item'
            }
            })} />
            <span className='text-red-600 text-xs'>{serverErrors?.quantity ||errors?.quantity?.message}</span>
            </div>

{/* Button Inserting */}
            <button type="submit" disabled={loading} className="bg-[#030394] px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-800 focus:outline-none transition-colors w-full">
            {loading ?
            <>
              <div className='flex items-center justify-center'>
                <Spinner className='w-4 h-4' color="indigo" />
                <p className='pl-3'>Inserting</p>
              </div>
            </> : 'Insert'}
            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Add_Product;
