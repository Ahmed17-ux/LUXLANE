import { useForm } from 'react-hook-form';
import ONLIGNE_SHOPING_IMG from '../images/undraw_Sign_up_n6im.png';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from "@material-tailwind/react";
import { apiaxios } from '../api/IndexApi';
import { useEffect, useState } from 'react';
import { LOGIN_PATH, SHOPING_PAGE } from '../routes/routers';
import { UseUsercontext } from '../Contextapi/UserContext';
import { UserAPI } from '../service/api/User/UserApi';

function Register() {
    const navigate = useNavigate();

    const { login, setAuthanticated , setToken} = UseUsercontext();

    const { register, formState: { errors }, handleSubmit, watch, reset, form } = useForm();
    const [lodingButton,setlodingButton]  = useState(false)
    const [serverErrors,setserverErrors] =  useState({})
    const handleSignupForm = async (data) => {
        try {
          setlodingButton(true);
          const response = await apiaxios.post('/signup', { ...data, role: 'user' });

          if (response.status === 201) {
            const loginResponse = await login(data.email, data.password);
            const { data: loginData } = loginResponse;
            setToken(loginData.token);

            const userRole = loginData.user.role;
            setAuthanticated(true);

            await UserAPI.getUser(userRole);

            switch (userRole) {
              case 'user':
                navigate(SHOPING_PAGE);
                break;
              default:
                console.error('Unknown user role:', userRole);
                break;
            }
          }
        }  catch (error) {
          setlodingButton(false);
          setserverErrors(error.response.data.errors);

          console.error('Signup error details:', error.response.data);

        } finally {
          setlodingButton(false);
        }
      };





useEffect(()=>{
    console.log(serverErrors)
},[serverErrors])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="w-full flex items-center justify-center">
                <img className="w-full h-auto" src={ONLIGNE_SHOPING_IMG} alt="ONLIGNE_SHOPING_IMG" />
            </div>

      <div className="w-auto   h-auto flex items-center justify-end m-8">
      <div className=" w-full md:w-96 h-auto card hover:transform hover:scale-102 transition-transform cursor-pointer ">

{/* card form  */}
            <div className="card-inner p-6 	  m-3">

{/*  Name  */}
<div className='mb-2'>
  <Input
    size="lg"
    color="indigo"
    label="Name"
    className="mb-4"
    {...register('name', {
      required: true,
      minLength: {
        value: 4,
        message: 'Name should be more than 4 characters',
      },
      maxLength: {
        value: 15,
        message: 'Name should be less than 15 characters',
      },
    })}
  />
  <span className='text-red-600 text-xs'>
    {errors.name?.message || serverErrors?.name }
  </span>
</div>


{/* Last Name  */}
              <div className='mb-2'>
                <Input
                  size="lg"
                  color="indigo"
                  label="Last Name"
                  className="mb-4"
                  {...register('last_name', {
                    required: true,
                    minLength: {
                      value: 4,
                      message: 'LastName should be more than 4 characters',
                    },
                    maxLength: {
                      value: 35,
                      message: 'LastName should be less than 35 characters',
                    },
                  })}
                />
                <span className='text-red-600 text-xs'>{errors.lastname?.message || serverErrors?.lastname}</span>
              </div>

{/*  Email */}
<div className='mb-2'>
  <Input
    size="lg"
    color="indigo"
    label="Email"
    className="mb-4"
    {...register('email', {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    })}
  />
  <span className='text-red-600 text-xs'>{errors.email?.message || serverErrors?.email }</span>
</div>


              {/* Phone Number */}
              <div className='mb-2'>
                <Input
                  size="lg"
                  color="indigo"
                  name='phone'
                  label="Phone Number"
                  className="mb-4"
                  {...register('phone', {
                    required: true,
                    pattern: {
                      value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i,
                      message: 'Invalid Phone Number',
                    },
                  })}
                />
                <span className='text-red-600 text-xs'>
                  {errors.phone?.message || serverErrors?.phone}
                </span>
              </div>

              {/* Password */}
              <div className='mb-2'>
                <Input
                  size="lg"
                  type='password'
                  color="indigo"
                  name='password'
                  label="Password"
                  className="mb-4"
                  {...register('password', {
                    required: true,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/i,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
                    }
                  })}
                />
                <span className='text-red-600 text-xs'>
                  {errors.password?.message }
                </span>
              </div>

              {/* Password Confirmation */}
              <div className='mb-2'>
                <Input
                  size="lg"
                  color="indigo"
                  type='password'
                  label="Confirm Password"
                  className="mb-4"
                  {...register('confirmPassword', {
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                />
                <span className='text-red-600 text-xs'>
                  {errors.confirmPassword?.message}
                </span>
              </div>

              <div className='sm:m-0 md:m-8 lg:m-8'>
  <div className="text-sm text-gray-600 ">
    <Button
                    onClick={handleSubmit(handleSignupForm)}
                    fullWidth
      className='relative px-8 py-2 rounded-md bg-white border-[2.7px] border-[#1720c8] overflow-hidden transition-all duration-700 text-[#1720c8] hover:text-white h-[50px] relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-[2.7px] border-[#1720c8] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
      before:-left-full before:hover:left-0 before:rounded-full before:bg-[#1720c8] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700'
    >
        {lodingButton ?
        <>
         <div class=" inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div> </>:  "Sign Up" }


    </Button>
  </div>
</div>

<div className='m-4 flex item-center justify-center '>
  <h3 className='flex gap-4'>Already have an account?
  <button className='text-[#1720c8] font-bold flex items-center justify-center gap-1 ' type='button' onClick={()=>navigate(LOGIN_PATH)}>
    Login
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
  <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd" />
</svg>

    </button>
    </h3>
</div>
            </div>

          </div>
        </div>

      </div>
    );
  }

  export default Register;
