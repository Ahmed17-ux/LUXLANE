import React, {useState } from 'react';
import { useForm } from 'react-hook-form';
import EditorApi from '../../service/api/User/EditorApi';
import {
  Button,
  Spinner,
  Input,
  Dialog,
  DialogBody
} from "@material-tailwind/react";

function Add_Editor() {
    const { register , handleSubmit , formState: { errors   } ,setError, reset} = useForm();


    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
      setOpen(!open);
    };


    const handleFormEditor = async (data) => {
      try {
          setLoading(true);

          const response = await EditorApi.create(data);

          if (response.status == 201) {
              handleOpen();
              reset();
          }
      } catch ({ response }) {
              Object.entries(response.data.errors).forEach((error) => {
                const [fieldName,errorMessage]  = error
                console.log(errorMessage)
                  setError(fieldName,{
                    message : errorMessage
                  })

              })
      } finally {
          setLoading(false);
      }
  }





  return (
    <>


      <div className="dark:bg-blue-900 w-full transition-colors duration-300">
        <div className=" p-4 ">

          <div className="bg-white dark:bg-gray-700 shadow-xl rounded-md p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Editor</h1>


      <form onSubmit={handleSubmit(handleFormEditor)} >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  variant="static"
                  label="First Name"
                  placeholder="First name"
                  {...register('firstname', {
                    required: true,
                    minLength: {
                      value: 4,
                      message: 'First Name should be more than 4 characters',
                    },
                    maxLength: {
                      value: 15,
                      message: 'First Name should be less than 15 characters',
                    },
                  })}
                />
                <Input
                  variant="static"
                  label="Last name"
                  placeholder="Last name"
                  {...register('lastname', {
                    required: true,
                    minLength: {
                      value: 4,
                      message: 'Last Name should be more than 4 characters',
                    },
                    maxLength: {
                      value: 25,
                      message: 'Last Name should be less than 25 characters',
                    },
                  })}
                />
                <span className='text-red-600 text-xs'>{errors.firstname?.message}</span>
                <span className='text-red-600 text-xs'>{errors.lastname?.message}</span>

              </div>

              <div className="mb-6">
                <div className="mb-4">
                  <Input
                    variant='static'
                    label="Date of Birth"
                    type='date'
                    {...register('date_of_birth', {
                      required: {
                        value:true,
                        message:'Date of birth is Required'
                      },

                    })}
                  />
                  <span className='text-red-600 text-xs'>{errors.date_of_birth?.message}</span>
                </div>
              </div>

              <div className="my-6">
            <select
                    {...register('gender',{
                        required:true
                    })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
                <span className='text-red-600 text-xs'>{errors.gender?.message}</span>
</div>

              <div className="mb-6">
                <Input
                  variant="static"
                  label="Address"
                  placeholder="current address"
                  {...register('address', {
                    required: true,
                    minLength: {
                      value: 10,
                      message: 'Address should be more than 10 characters',
                    },
                    maxLength: {
                      value: 255,
                      message: 'Address should be less than 255 characters',
                    },
                  })}
                />
                                <span className='text-red-600 text-xs'>{errors.address?.message}</span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Input
                  variant="static"
                  label="Phone"
                  placeholder="Ex:[06/07]-02030405"
                  {...register('phone', {
                    required: true,
                    pattern: {
                      value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i,
                      message: 'Invalid Phone Number',
                    },
                  })}
                />
                <Input
                  variant="static"
                  label="Email"
                  placeholder="example@example.com"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              <Input
  variant="static"
  label="Password"
  placeholder="*****"
  {...register('password', {
    required: true,
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+={}|\[\]:;<>,.?/~]).{8,}$/i,
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol , and be at least 8 characters long.',
    },
  })}
/>

                <span className='text-red-600 text-xs'>{errors.phone?.message}</span>
                <span className='text-red-600 text-xs'>{errors.email?.message}</span>
                <span className='text-red-600 text-xs'>{errors.password?.message}</span>
              </div>


{/* Submite button */}
<Button
          variant='outlined'
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ?
            <>
              <div className='flex items-center justify-center'>
                <Spinner className='w-4 h-4' color="indigo" />
                <p className='pl-3'>Submitting</p>
              </div>
            </> : 'Submit'}
</Button>



            </form>
          </div>
        </div>
      </div>


      {/* Success Add editor partie  */}
      <Dialog open={open} handler={handleOpen} >
        <DialogBody>
            <div className='flex font-bold items-center justify-center'>Editor Added With Success

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-green-400  w-8 h-8 font-bold">
  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
</svg>

            </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Add_Editor;
