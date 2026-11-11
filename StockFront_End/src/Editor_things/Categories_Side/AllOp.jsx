import React, { useEffect, useState } from 'react';
import CategoryApi from '../../service/api/User/CategoryApi';
import { useForm } from 'react-hook-form';

function AllOp() {
  const [categories, setCategories] = useState([]);
  const [loadingStates, setLoadingStates] = useState(Array(categories.length).fill(false));
  const [showSuccessAlert, setShowSuccessAlert] = useState({value:false,text:''});
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingSearchButton, setLoadingSearchButton] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [lodingsaved, setLodingSaved] = useState(false);
  const [lodingButton,setlodingButton] =  useState(false)
  const [serverErrors,setserverErrors] = useState({})

  const [fieldremove,setfieldremove] = useState({value:''})
// loding before data come
  const [loadingData, setLoadingData] = useState(true);
  const { register, handleSubmit,formState :{errors} ,reset} = useForm();

// searsh with date sarte -  end
const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');




  useEffect(() => {
    const filterCategories = async () => {
      setLoadingSearchButton(true);

      try {
        let response;
        if (searchTerm.trim() === '') {
          response = await CategoryApi.AllCategories();
        } else {
          response = await CategoryApi.AllCategories(searchTerm);
        }


        if (response.length === 0) {
          setNoResultsMessage(
            searchTerm.trim() == ''
              ? ''
              : `No categories found for "${searchTerm}"`
          );
        } else {
          setNoResultsMessage('');
        }

        const filteredCategories = response.filter((category) => {
          const createdAt = new Date(category.created_at);
          return (
            (!startDate || createdAt >= new Date(startDate)) &&
            (!endDate || createdAt <= new Date(endDate))
          );
        });

        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingSearchButton(false);
      }
    };

    filterCategories();
  }, [startDate, endDate, searchTerm]);





  const fetchData = async () => {
    try {
        const response = await CategoryApi.AllCategories();
        setCategories(response);
        setLoadingData(false);
    } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingData(false);
    }
};

  useEffect(() => {
    fetchData();
  }, []);


  const getRandomColor = () => {
    const colors = ["#FFC0CB", '#090979', '#3a95b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomGradient = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };



const handleRemoveClick = async (index) => {
  try {
    // Update loading state
    setLoadingStates((prevLoadingStates) => {
      const newLoadingStates = [...prevLoadingStates];
      newLoadingStates[index] = true;
      return newLoadingStates;
    });

    const categoryId = categories[index].id;
    await CategoryApi.deleteCategory(categoryId);

    // Update categories after successful removal
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);

    setShowSuccessAlert({ value: true, text: 'Removed With Success!' });
    // Wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    if (error.response && error.response.data !== '') {
      setfieldremove({
        value: "Can't remove this category because there are products associated with it.",
      });

      // Reset fieldremove after 4 seconds
      setTimeout(() => {
        setfieldremove({ value: '' });
      }, 4000);
    } else {
      console.error('Error removing category:', error);
    }
  } finally {
    // Reset loading state
    setLoadingStates((prevLoadingStates) => {
      const newLoadingStates = [...prevLoadingStates];
      newLoadingStates[index] = false;
      return newLoadingStates;
    });

    // Hide success alert
    setShowSuccessAlert({ value: false, text: '' });
  }
};


const formatDateTime = (datetime) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(datetime).toLocaleDateString('en-US', options);
  };

const handleEditClick = (categoryId, currentName) => {
    setEditingCategoryId(categoryId);
    setIsEditing(true);
    setSaved(true);
  };

const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setIsEditing(false);
  };

  const handleSaveEdit = async (categoryId, updatedName) => {
    try {
      setLodingSaved(true);
      await CategoryApi.editCategory(categoryId, updatedName);

      // Update state after API call
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, category_name: updatedName } : category
      );

      setCategories(updatedCategories);
      setShowSuccessAlert({ value: true, text: 'Saved With Success!' });

      // Use useEffect to handle side effects after state update
      useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowSuccessAlert({ value: false, text: '' });
          setLodingSaved(false);
        }, 3000);

        // Cleanup function to clear the timeout when component unmounts or state changes
        return () => clearTimeout(timeoutId);
      }, [updatedCategories]);

      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.data !== '') {
        fetchData();

        setfieldremove({
          value: "Can't edit this category because there are products associated with it.",
        });

        setTimeout(() => {
          setfieldremove({ value: '' });
        }, 3000);
      }

      setLodingSaved(false);
    } finally {
      setIsEditing(false);
      setLodingSaved(false);
    }
  };



const handelAddCategory = async (data) => {
    try {
        setlodingButton(true);

      const cleanedData = { category_name: data.category_name.trim().replace(/,"+$/, '') };


      const res = await CategoryApi.AddCategory(cleanedData);

      console.log('Category Added Successfully');

      if (res.status === 200) {
        setShowSuccessAlert({ value: true, text: 'Category Added With Success!' });

        // Update local state with the new category
        setCategories((prevCategories) => [...prevCategories, res.data]);
    }
    } catch (error) {
      console.log('Error:', error.response.data.errors
      );
      setserverErrors(error.response.data.errors);
      setlodingButton(false);
    } finally {
        reset();
        setlodingButton(false);

      setTimeout(() => {
        setShowSuccessAlert({ value: false, text: '' });
      }, 3000);
    }
  };



  return (
    <>
    {/* alert Success  */}
     {showSuccessAlert.value && (
          <div className={`flex fixed top-[3rem] right-0 m-4 bg-green-200 rounded-sm text-teal-900 px-4 py-3 shadow-md z-50 transition-transform duration-500 transform scale-100 `}>

          <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        </svg>
        <div>
            <span className="font-medium">{showSuccessAlert.text}</span>
        </div>
    </div>
)}

{/* alert field   */}

{fieldremove.value && (
    <div className={`flex fixed top-[3rem]   right-0 m-4 bg-red-200 rounded-sm text-teal-900 px-4 py-3 shadow-md z-50 transition-transform duration-500 transform scale-100 `}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 self-center   mr-2">
  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
</svg>

        <div>
            <span className="font-mediumk break-words ">{fieldremove.value}</span>
        </div>
    </div>
)}
      <div className='mt-10 mb-6'>



        <div className="px-4 py-8 m-6 h-[500px]    mt-12 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <div className="mb-4 md:flex md:items-center md:justify-between">
          <div className="flex items-center">
      <div className="relative">
        <input
          name="start"
          type="date"
          value={startDate}
          onChange={(event)=>setStartDate(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date start"
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      {/* Input for end date */}
      <div className="relative">
        <input
          name="end"
          type="date"
          value={endDate}
          onChange={(event)=>setEndDate(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date end"
        />
      </div>
      {/* Your categories rendering logic */}
      {categories.map((category) => (
        <div key={category.id}>{/* Render your category data here */}</div>
      ))}
    </div>

            <div className="flex flex-col md:flex-row items-center">
{/* serash input */}

              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-md shadow-[#064ea6] w-full md:w-[59%] mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded-md"
              />

{/* serash button */}
              <button className="w-full opacity-75 md:w-auto px-4 py-2 bg-blue-900 text-white rounded-md md:ml-2 shadow-xl">
                {loadingSearchButton ? (
                  <div className="text-white inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>



          {loadingData ? (
        <div className="text-center mt-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        //            Mapping categories

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categories?.map((category, index) => {
          const cardColor = getRandomColor();
          const cardGradient = getRandomGradient();

          return (
            <div key={index} className={`bg-${cardColor}-200 from-${cardColor}-200 to-${cardColor}-500 relative rounded-lg p-6 shadow-lg text-white overscroll-contain`} style={{ background: cardGradient }}>
              <div className='absolute top-0 right-0 mt-2 mr-2'>
                <div>
                  {loadingStates[index] ? (

                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>

                  ) : (
                    <button onClick={() => handleRemoveClick(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5 .058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5 .058l.345-9Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <div>
                  {isEditing && editingCategoryId === category.id ? (
                    <>
                    {!lodingsaved ?
                    <button onClick={() => handleSaveEdit(category.id, category.category_name)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-blue-800">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                        </svg>
                      </button>  :
                      <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>


                      }

                      <button onClick={() => handleCancelEdit()}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-blue-800">
<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>

                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(category.id, category.category_name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-900">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className=''>
                <h2 className="text-xl font-semibold mb-2 text-green-200 break-all">
                  {isEditing && editingCategoryId === category.id ? (
                    <input
                      type="text"
                      value={category.category_name}
                      onChange={(e) => setCategories((prevCategories) => prevCategories.map((prevCategory, i) => i === index ? { ...prevCategory, category_name: e.target.value } : prevCategory))}
                      className="text-lg font-semibold w-46 mb-2 text-green-200 break-all focus:outline-none focus:border-b-2 focus:border-green-200"
                    />
                  ) : (
                    category.category_name
                  )}
                </h2>
                <div>
                <p className="text-[11px]   font-bold">Created_at : {formatDateTime(category.created_at)}</p>
                <p className="text-[11px]  font-bold">Updated_at : {formatDateTime(category.updated_at)}</p>

                </div>
              </div>
            </div>
          );
        })}

        {noResultsMessage && (
          <div className="col-span-3 flex items-center justify-center">
            {noResultsMessage}
          </div>
        )}
      </div>
      )}

        </div>




{/* From to add new category name */}
        <div className='mt-[9%]'>
        <div class="my-6 " >
            <div class=" flex  items-center gap-6 p-8 mx-8 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
                <div>
                    <h1 class="text-3xl text-blue-900 font-extrabold">

                    Add Category

                    </h1>

                    <p class="text-sm text-gray-500 mt-3">
                        Have some big idea or brand to develop and need help? Then reach out we'd
                        love to hear about your project  and provide help.
                        </p>


                </div>

                <form  class="space-y-4 w-[70%]" onSubmit={handleSubmit(handelAddCategory)}>

                    <input type='text'
                    {...register("category_name",{
                        required:{
                            value:true,
                            message:'Categoy name Is required'
                        },
                        maxLength:{
                            value:40,
                            message:'Category name should be less than 40 character'
                        },
                        minLength:{
                            value:4,
                            message:'Category name should be more than 4 character'
                        }
                    }

                    )} class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]" placeholder='Category name ' />
                    <span className='text-red-600 text-sm'>{errors.category_name?.message ||serverErrors?.category_name }</span>
                    <button type='submit'    className="text-white bg-blue-900 hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full">
                      {lodingButton ?

                <div class="flex flex-row  items-center justify-center py-2  gap-2">
                          <div class="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                          <div class="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                          <div class="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                </div>
  :
 'Add'
}


                    </button>
                </form>
            </div>
        </div>
        </div>


      </div>
    </>
  );
}

export default AllOp;
