import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
function HomeElement() {
    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flip-card-container">
                    <div className="flip-card"></div>
                    <div className="flip-card"></div>
                    <div className="flip-card"></div>
                    <div className="flip-card"></div>
                    <div className="flip-card"></div>
                </div>
            </div>
            <div className="flex items-center justify-center h-screen relative z-10 ">
                <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 transform transition-transform duration-500 ease-in-out hover:shadow-2xl hover:scale-105 text-gray-800">
                    <h1 className="text-4xl font-bold text-center mb-6">Welcome to GameMaster</h1>
                    <p className="text-lg text-center mb-6">
                        GameMaster is an exciting memory flipping game. Test your memory and have fun flipping cards!
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/services"
                            className="mt-4 py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                            Explore Services
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeElement