import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { authActions } from './auth';

interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    pid: string;
  };
}

const Login: React.FC = () => {
  const [values, setValues] = useState<LoginValues>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.email === '' || values.password === '') {
        toast('All fields are mandatory', {
          type: 'error',
          position: 'top-center',
          theme: 'light',
          autoClose: 4000,
        });
      } else {
        const res = await axios.post<LoginResponse>(
          'http://localhost:3000/api/v2/user/login',
          values,
          { withCredentials: true }
        );

        dispatch(authActions.login());
        localStorage.setItem('id', res.data.user._id);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('Pid', res.data.user.pid);
        localStorage.setItem('user',res.data.user.fullName);

        toast(res.data.message, {
          type: 'success',
          position: 'top-center',
          theme: 'light',
          autoClose: 5000,
        });

        navigate('/events');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.response?.data?.message);
      toast(err?.response?.data?.message || 'Login failed', {
        type: 'error',
        position: 'top-center',
        theme: 'light',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="bg-slate-900 px-4 md:px-12 py-8 flex items-center justify-center min-h-screen">
      <div className="bg-slate-800 rounded-lg py-6 px-6 sm:px-8 w-full max-w-md">
        <p className="text-2xl font-bold text-center text-white">Login</p>

        <div className="mt-4">
          <hr className="border-slate-700" />
          <hr className="border-slate-700 mt-1" />

          <div className="mt-6">
            <label htmlFor="email" className="text-white font-bold">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-2 bg-slate-900 p-2 text-white rounded-lg outline-none"
              name="email"
              id="email"
              value={values.email}
              onChange={change}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-white font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 bg-slate-900 p-2 text-white rounded-lg outline-none"
              name="password"
              id="password"
              value={values.password}
              onChange={change}
              required
            />
          </div>

          <div className="mt-8">
            <button
              className="w-full bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
              onClick={submit}
            >
              Login
            </button>
          </div>
        </div>

        <div className="mt-6">
          <span className="flex justify-center font-semibold text-white">Or</span>
          <p className="flex justify-center mt-4 text-white font-semibold">
            Don't have an account?&nbsp;
            <a
              className="text-blue-500 font-bold hover:text-blue-700 hover:underline"
              href="/Signup"
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
