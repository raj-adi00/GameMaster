import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import Header from './Header'
import HomeElement from './HomeElement';
import ReactCardFlip from 'react-card-flip';
import { useSelector, useDispatch } from 'react-redux';
import authslice from '../store/authslice';
import { setisFlipped } from '../store/authslice';
import { set } from 'react-hook-form';
function Home() {
  const isFlipped = useSelector((state) => state.auth.isFlipped)
  const userdata=useSelector((state)=>state.auth.userData)
  const dispatch = useDispatch()
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 overflow-hidden">
      <Header />
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        <div onMouseEnter={() => { dispatch(setisFlipped()) }}>
          <HomeElement />
        </div>
        <div onMouseLeave={() => { dispatch(setisFlipped()) }}>
          <HomeElement />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Home;