import React from 'react';

function Cards({...props}) {
     
  return (
    <div className="w-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-1 mb-2 transform transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col sm:flex-row items-center justify-between text-lg text-black">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="ml-2">{props.userid}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="ml-2">{props.rating}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="ml-2">{props.level}</span>
          </div>
          <div className="hidden sm:flex items-center">
            <span className="ml-2">{props.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
