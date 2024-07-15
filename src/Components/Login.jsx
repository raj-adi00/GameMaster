// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { Input, Loader } from '../index'
// import authentication from '../Appwrite/auth'
// import { useDispatch } from 'react-redux'
// import { userenter } from '../store/authslice'
// import { useNavigate } from 'react-router-dom'

// function Login() {
//     const [loading, setloading] = useState(false)
//     const dispatch = useDispatch()
//     const { register, handleSubmit } = useForm();
//     const [error, seterror] = useState("");
//     const navigate = useNavigate()

//     const login = async (data) => {
//         seterror("");
//         try {
//             setloading(true)
//             const session = await authentication.login(data)
//             if (session) {
//                 const userData = await authentication.getCurrentUser()
//                 if (userData) {
//                     dispatch(userenter(userData))
//                     navigate('/home')
//                 }
//             }
//             setloading(false)
//         } catch (err) {
//             console.log(err);
//             seterror(err);
//             setloading(false);
//         }
//     }
//     if (loading)
//         return (<Loader />)
//     else
//         return (
//             <div className="bg-gray-700 bg-opacity-50 p-10 rounded-lg">
//                 <form onSubmit={handleSubmit(login)} className='w-full'>
//                     <Input
//                         label="Email:"
//                         placeholder="Enter ur email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                         })}
//                     />
//                     <Input
//                         label="Password"
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true
//                         })} />
//                     <button type='submit' className='w-full'>Login</button>
//                 </form>
//                 <p>
//                     {
//                         error && <p className="text-red-600 mt-8 text-center">{error} </p>
//                     }
//                 </p>
//             </div>
//         )
// }

// export default Login
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Loader, service } from '../index';
import authentication from '../Appwrite/auth';
import { useDispatch } from 'react-redux';
import { userenter } from '../store/authslice';
import { useNavigate } from 'react-router-dom';
import { Flag } from 'appwrite';

function Login() {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const login = async (data) => {
        seterror("");
        try {
            setloading(true);
            const session = await authentication.login(data);
            if (session) {
                const userData = await authentication.getCurrentUser();
                if (userData) {
                    const data=await service.getCurrentUserData(userData.email);
                    // console.log(userData.email)
                    dispatch(userenter(data));
                    navigate('/home');
                }
            }
            setloading(false);
        } catch (err) {
            console.log(err);
            seterror(err);
            setloading(false);
        }
    };

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className="flex items-center justify-center bg-gray-900 p-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 bg-opacity-90 p-10 rounded-lg shadow-lg w-96">
                    <h2 className="text-white text-3xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleSubmit(login)} className='w-full'>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <button
                            type='submit'
                            className='w-full mt-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300'
                        >
                            Login
                        </button>
                    </form>
                    {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
                </div>
            </div>
        );
    }
}

export default Login;
