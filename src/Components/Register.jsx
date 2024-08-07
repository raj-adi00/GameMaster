import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authentication from '../Appwrite/auth';
import { userenter } from '../store/authslice';
import { Input, Loader, service } from '../index';

function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues } = useForm();


  const signUp = async (data) => {
    seterror("");
    setLoading(true);
    try {
      const upload = data.profilephoto[0] ? await service.uploadimage(data.profilephoto[0]) : null;
      // console.log(upload)
      if (upload) {
        data.profilephoto = upload.$id;
        const create = await service.createProfile({ ...data, userid: getValues("email"), rating: 0, level: "Basic" });
        if (create) {
          const session = await authentication.signup({ ...data, userid: getValues("email"), rating: 0, level: "Basic" });
          if (session) {
            const userData = await authentication.getCurrentUser();
            if (userData) {
              // userData.userid = getValues("email");
              // const create = await service.createProfile({ ...data, userid: getValues("email"), rating: 0, level: "Basic" });
              // console.log(create)
              const data = await service.getCurrentUserData(userData.email);
              dispatch(userenter(data));
              navigate("/home");
            }
          }
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      seterror(err.message);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      {error && <div className='text-red-700 text-center bg-yellow-300 mx-auto'>{error}</div>}
      <div className="flex items-center justify-center p-2 bg-gray-900">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 bg-opacity-90 p-10 rounded-lg shadow-lg w-96">
          <h2 className="text-white text-3xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit(signUp)} className='w-full'>
            <Input
              label="Name:"
              placeholder='Enter your name'
              {...register("name", {
                required: true
              })}
            />
            <Input
              label="Email:"
              placeholder='Enter your email'
              type='email'
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid address",
                }
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true
              })}
            />
            <Input
              label="Profile Picture"
              type="file"
              className="mb-4"
              accept="image/png,image/jpg,image/jpeg,image/gif"
              {...register("profilephoto", { required: false })}
            />
            <button
              type='submit'
              className='w-full mt-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300'
            >
              Create Account
            </button>
          </form>
          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
        </div>
      </div>
    </div>
  );
}

export default Register;

