import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="w-100 h-100 relative">
      <div className="absolute w-[30px] h-[30px] top-1/2 left-1/2 animate-up duration-2400 infinite bg-blue-600"></div>
      <div className="absolute w-[30px] h-[30px] top-[calc(50% - 30px)] left-[calc(50% - 30px)] animate-down duration-2400 infinite bg-yellow-400"></div>
    </div>
  );
};

export default Loader;
