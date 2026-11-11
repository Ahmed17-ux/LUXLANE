import React, { useState} from 'react';
import { Card, CardBody, CardFooter, Typography,
  Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { UseUsercontext } from '../Contextapi/UserContext';
import { DASHBORD_CONTRLLE } from '../routes/routers';
import {Link} from 'react-router-dom'

function ProfileInfoAdmin() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openimg, setOpenimg] = useState(false);
    const handleOpen2 = () => setOpen2(!open2);
    const handleOpenimg = () => setOpenimg(!openimg);



  const handleOpen = () => setOpen(!open);
    const {user} = UseUsercontext()


    const { register, handleSubmit, formState: { errors } } = useForm();




  const handelEditInfo = (values) => {
    console.log(values.name,values.email);
  };

  const handelChangePassword = (values) => {
console.log(values.currentPassword,values.newPassword);

  };
  return (
    <>
     <div >

         {/* Edit info  */}
      <Card className="w-auto h-auto my-4 mx-4">
      <div className="">
      <Link  to = { DASHBORD_CONTRLLE} >
      <div className="w-56 p-4">
      <div className="flex w-full bg-blue-900 shadow rounded-lg py-1 px-6 cursor-pointer" >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <p className="m-auto inset-0 font-semibold leading-7 text-center text-white text-sm">Go Back</p>
        </div>
      </div>
      </Link>
    </div>
        <CardBody>
          <Typography className='mb-4'>
            <h1 className='font-bold sm:text-xl lg:text-3xl text-black'>Edit admin Profile Info</h1>
            <hr />
          </Typography>

          {/* Image */}
      <Typography  color="blue-gray" className="mb-6">

      <div className="flex items-center justify-start">
            <label htmlFor="fileInput"  className='cursor-pointer'>
              <img
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="userImg"
                className="rounded-full w-[90px] h-[90px]"
                onClick={handleOpenimg}
              />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}

            />
          </div>
       </Typography>

          {/* Name */}
          <Typography color="blue-gray" className="mb-4">
            <Input
              label='Username'

              type="text"
              defaultValue={user?.lastname}
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
            <Button onClick={handleSubmit(handelEditInfo)} variant="gradient">
              Save Edit
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
            <Button onClick={handleOpen2} variant="gradient" color='red'>
              Remove Account
            </Button>
            <Dialog
              open={open2}
              handler={handleOpen2}
              size='sm'
            >
              <DialogBody>
                <div>
                  <Input color="red" label="Account Password" className='w-full sm:w-full mb-6' />
                </div>
                The key to more success is to have a lot of pillows. Put it this way,
                it took me twenty-five years to get these plants.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen2}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen2}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </CardFooter>
        </div>
      </Card>
     </div>

    </>
  );
}

export default ProfileInfoAdmin;
