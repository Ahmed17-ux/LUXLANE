import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import Backgroundimg from '../images/Untitled-1.webp';
import { useForm } from 'react-hook-form';
import { UseUsercontext } from '../Contextapi/UserContext';
import {
  DASHBORD_CONTRLLE,
  EDITOR_DASHBOARD_CONTROLLE,
  SHOPING_PAGE,
  SIGNUP_PATH,
} from '../routes/routers';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from '../service/api/User/UserApi';

const Login = () => {
  const { login, setAuthanticated, setToken } = UseUsercontext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigateToSignUp = () => {
    navigate(SIGNUP_PATH);
  };

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const submitButton = async (values) => {
    try {
      setLoading(true);
       const response = await login(values.email, values.password);
      if (response.status === 200) {
        const { data } = response;
        setToken(data.token);

        const userRole = data.user.role;

        setAuthanticated(true);
        window.localStorage.setItem('role', userRole);

        await UserAPI.getUser(`/${userRole}`);
        switch (userRole) {
          case 'user':
            navigate(SHOPING_PAGE);
            break;
          case 'admin':
            navigate(DASHBORD_CONTRLLE);
            break;
          case 'editor':
            navigate(EDITOR_DASHBOARD_CONTROLLE);
            break;
          default:
            console.error('Unknown user role:', userRole);
            break;
        }
      }
    } catch (error) {
      console.error('Error details:', error.response.data);
      setLoginError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen relative'>
      <div className='absolute top-0 left-0 h-full w-full'>
        <img
          src={Backgroundimg}
          alt='background transparent'
          className='h-full w-full object-cover'
        />
        <div></div>
      </div>

      <div className='sm:flex items-center justify-center flex items-center lg:justify-end mx-auto sm:mx-0 lg:mx-8 xl:mx-20 lg:my-8 xl:my-12 w-full'>
        <Card className='w-[340px] gap-4 mx-8'>
          <CardBody className='flex flex-col gap-4'>
            <Input
              label='Email'
              size='lg'
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <span className='text-red-600 text-xs'>{errors.email?.message}</span>
            <Input
              label='Password'
              size='lg'
              type='password'
              {...register('password', {
                required: true,
                minLength: {
                  value: 9,
                  message: 'Password is too short*',
                },
                maxLength: 45,
              })}
            />
            <span className='text-red-600 text-xs'>{errors.password?.message}</span>
            {loginError && <span className='text-red-600 text-xs'>{loginError}</span>} {/* Display login error message */}
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
          </CardBody>

          <CardFooter className='pt-0'>
            <Button
              variant='outlined'
              onClick={handleSubmit(submitButton)}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Typography
                as="a"
                href="#login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => navigate(SIGNUP_PATH)}
              >
                Sign UP
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
