import React, {useEffect, useRef, useState} from 'react';
import { Card, CardBody, CardFooter, Typography,
  Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { UseUsercontext } from '../Contextapi/UserContext';
import { UserAPI } from '../service/api/User/UserApi';
import './ShopingSide/LocalshopingCss.css';
import {Link, useNavigate} from 'react-router-dom'
import { SHOPING_PAGE, SIGNUP_PATH } from '../routes/routers';
import { Spinner } from "@material-tailwind/react";


function ProfileInfo() {
    const [open, setOpen] = useState(false);
     const [openimg, setOpenimg] = useState(false);
    const handleOpenimg = () => setOpenimg(!openimg);
    const [loding,setloding] = useState(false)
    const [Success,SetSuccess]  =  useState(false)
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const navigate=  useNavigate()
    const imageRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();



    const handleClose = () => {
        setOpen(false);
        setError(null); // Reset error state when closing the dialog
      };
  const handleOpen = () => setOpen(!open);
    const {user} = UseUsercontext()
    console.log(user)


    const handelEditInfo = async (values) => {
        try {
            setloding(true);

            if (values.name === user.name && values.email === user.email) {
                // Show error alert and stop loading
                setError("No information changed.");
                setTimeout(() => {
                    setError(false); // Reset error state after 3 seconds
                }, 3000);
                setloding(false);
                return;
            }
            const response = await UserAPI.updateProfile(user.id, { name: values.name, email: values.email });

            if (response.status <= 201) {
                setloding(false);
                SetSuccess(true);
                setTimeout(() => {
                    SetSuccess(false);
                }, 3000);
            }
        } catch (error) {
            setloding(false);
            SetSuccess(false);

        }
    };



    const handelChangePassword = async (values) => {
        try {


            const hashedCurrentPassword =values.currentPassword;

            if (hashedCurrentPassword !== user.hashedPassword) {
                 return;
            }

            if (values.newPassword !== values.confirmPassword) {
                alert("New password and confirmation do not match");
                setloding(false);
                return;
            }



            SetSuccess(true);
            setTimeout(() => {
                SetSuccess(false);
            }, 3000);
        } catch (error) {
            setloding(false);
            SetSuccess(false);
        }
    };
    const handleConfirmDelete = async (userId, password) => {
        try {
          const resopense =  await UserAPI.removeAccount(userId, password);
          if(resopense.status <=201 )
                navigate(SIGNUP_PATH);

        } catch (error) {
          console.error('Error removing account:', error);
          setError('An error occurred while removing your account. Please try again later.');
        }
      };


      useEffect(() => {
        setSelectedImage(`http://127.0.0.1:8000/storage/${user.image}` || 'http://127.0.0.1:8000/storage/Profile-PNG-File.png');
    }, [user.image]);

    const handleAddOrUpdateImage = async () => {
        try {
            // Get the file object
            const file = imageRef.current.files[0];

            const formData = new FormData();
            formData.append('image', file);

            // Set the loading state to true to display the spinner
            setloding(true);

            // Call the API with the FormData
            await UserAPI.AddOrUpdateImageProfile(formData);

            // Set the selected image state to the newly uploaded image
            setSelectedImage(URL.createObjectURL(file));

            // Optionally, you can set the selected file name state here
            setselectedFileName(file.name);

            // Set the loading state back to false after the image is updated
            setloding(false);
        } catch (error) {
            console.error('Error:', error);
            // Optionally, you can handle errors or show error messages here
            // Set the loading state back to false in case of an error
            setloding(false);
        }
    };




  return (
    <>
    {error && (
        <div className="fixed top-[70px] right-4 z-50 animate-shake">
            <div className="flex w-auto shadow-lg rounded-lg">
                <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">


                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
  <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
</svg>

                </div>
                <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                    <div className="px-4">No Info  Changed</div>
                </div>
            </div>
        </div>
    )}

    {Success && (
        <div className="fixed top-[70px] right-4 z-50 animate-shake">
            <div className="flex w-auto shadow-lg rounded-lg">
                <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                    <div className="px-4">Info Updated with Success</div>
                </div>
            </div>
        </div>
    )}
      {/* Edit info  */}
      <Card className="w-auto h-auto my-4 mx-4">
     <Link to={SHOPING_PAGE}>
     <div className="w-56 p-4" >
      <div className="flex w-full bg-blue-900 shadow rounded-lg py-1 px-6 cursor-pointer" >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <p className="m-auto inset-0 font-semibold leading-7 text-center text-white text-sm">Go Back</p>
        </div>
      </div>
     </Link>
        <CardBody>
          <Typography className='mb-4'>
            <h1 className='font-bold sm:text-xl lg:text-3xl text-black'>Profile Info</h1>
            <hr />
          </Typography>

<div className='flex items-center justify-between my-4'>

<Typography  color="blue-gray" className="mb-6">

<div className='flex items-center justify-between my-2'>
  <Typography  color="blue-gray" className="mb-6">
  <div className='flex items-center justify-between my-2'>
                <Typography color="blue-gray" className="mb-6">
                    <div className="flex items-center justify-start">
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            {loding ? (
                                <Spinner color="indigo" size="sm" className='flex items-center justify-center' /> // Show spinner while loading
                        ) : (
                                <div className="relative">
<img
    src={selectedImage}
    alt="User"
    className="rounded-full w-[120px] h-[120px] hover:scale-125 transition duration-500 cursor-pointer"
    onClick={handleOpenimg}
/>

<button
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-white px-2 py-1 rounded-full  opacity-0 transition duration-300 hover:opacity-100"
    onClick={() => imageRef.current.click()}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
    <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleAddOrUpdateImage}
        ref={imageRef}
    />
</button>



                            </div>
                            )}
                        </label>

                    </div>
                </Typography>
            </div>
  </Typography>
</div>

 </Typography>



</div>

          {/* Name */}
          <Typography color="blue-gray" className="mb-4">
            <Input
              label='Username'

              type="text"
              defaultValue={user?.name}
              {...register('name', {
                required: false,
                maxLength: {
                    value: 30,
                    message: 'The name is too longer',
                  },
                minLength: {
                  value: 4,
                  message: 'The name must have at least 4 characters',
                },
              })}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </Typography>

          {/* Email */}
          <Typography color="blue-gray" className="mb-4">
            <Input
              label='Email'
              type="text"
              defaultValue={user?.email}

              {...register('email', {
                pattern: {
                  value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,5}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </Typography>
        </CardBody>

        <div className="flex item-center justify-end">
          <CardFooter className="pt-0">
            <Button onClick={handleSubmit(handelEditInfo)} variant="gradient" className='h-[35px]  w-[120px] flex items-center justify-center'>
                {loding ?  <div class="flex flex-row gap-2">
  <div class="w-1 h-1 rounded-full bg-gray-300 animate-bounce"></div>
  <div class="w-1 h-1 rounded-full bg-gray-300 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-1 h-1 rounded-full bg-gray-300 animate-bounce [animation-delay:-.5s]"></div>
</div> :'Save Edit'

}



            </Button>
          </CardFooter>
        </div>
      </Card>




{/* Update Password */}
<Card className="w-auto my-4 mx-4">
        <CardBody>
          <div className='mb-4'>
            <h1 className='font-bold sm:text-xl lg:text-3xl text-black '>Update Password</h1>
            <p className='text-sm'>Make sure you insert a powerful password.</p>
          </div>

          {/* Password changing */}
          <Typography color="blue-gray" className="mb-4 ">
            <Input label='Current Password' type="password" {...register('currentPassword')} />
          </Typography>
          <Typography color="blue-gray" className="mb-4">
            <Input label='New Password' type="password" {...register('newPassword')} />
          </Typography>
          <Typography color="blue-gray" className="mb-4">
            <Input label='New Password Confirmation' type="password" {...register('confirmPassword')} />
          </Typography>
        </CardBody>

        <div className="flex item-center justify-end">
          <CardFooter className="pt-0">
            <Button onClick={handleSubmit(handelChangePassword)} >
                Save Edit
                </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Delete Account */}
      <Card className="w-auto my-4 mx-4">
      <CardBody>
        <Typography className='mb-4'>
          <h1 className='font-bold sm:text-xl lg:text-3xl text-black'>Delete Account</h1>
          <p className='text-sm'>When you delete your account, you will lose all data on it.</p>
        </Typography>
      </CardBody>

      <div className="flex item-center justify-end">
        <CardFooter className="pt-0">
          <Button onClick={handleOpen} variant="gradient" color='red'>
            Remove Account
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            size='sm'
          >
            <DialogBody>
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  color="red"
                  label="Account Password"
                  className='w-full sm:w-full mb-6'
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleConfirmDelete}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </CardFooter>
      </div>
    </Card>

    </>
  );
}

export default ProfileInfo;
