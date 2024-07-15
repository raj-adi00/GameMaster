import React, { useState } from 'react'
import Login from './Login';
import ReactCardFlip from 'react-card-flip';
import Register from './Register';
import './WelcomePage.css'
import { Navigate, useNavigate } from 'react-router';
import Loader from './Loader';
import authentication from '../Appwrite/auth';
import { useDispatch } from 'react-redux';
import { userenter } from '../store/authslice';
import service from '../Appwrite/service';
const WelcomePage = () => {
    const [isFlipped, setisFlipped] = useState(false);
    const [state, changestate] = useState(0);
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function flipcardlogin() {
        setisFlipped(isFlipped == false ? true : false);
        changestate(1);
        setloading(false)
    }
     function flipcardsignup() {

        setisFlipped(!isFlipped);
        changestate(2);
        // console.log(err);
        // navigate('/')
        setloading(false)
    }
    if (loading)
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader />
            </div>
        )
    else
        return (
            <div className="h-screen bg-gray-800 flex items-center justify-center">
                <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
                    <div className="flex items-center justify-center bg-gray-900 p-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-500 bg-opacity-90 p-10 rounded-lg shadow-lg w-96 transform transition-transform duration-500 ease-in-out hover:shadow-2xl hover:scale-105 animate-floating">
                            <div className='front w-full'>
                                <h1 className="text-4xl font-bold text-white mb-7">Welcome to gameMaster</h1>
                                <p className="text-xl text-gray-300">Your ultimate gaming companion</p>
                                <p className="text-xl text-gray-300 mb-10">Unlock your gaming potential with gameMaster</p>
                                <div className="flex space-x-4 justify-center">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={flipcardlogin}>
                                        Login
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={flipcardsignup}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            {/* front */}
                        </div>
                    </div>
                    <div className='back w-full'>
                        <button onClick={() => { setisFlipped(!isFlipped) }} className='w-1/4 bg-red-900 text-white hover:bg-red-950'>Back</button>
                        {
                            state == 1 ? <Login /> : <Register />
                        }
                    </div>
                </ReactCardFlip>
            </div>
        );
};


export default WelcomePage