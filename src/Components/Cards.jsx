import React from 'react';

function Cards({ ...props }) {
  return (
    <div className="w-screen p-2">
      <div className="bg-gray-100 shadow-md rounded-lg p-2 pr-5 mb-2 transform transition-transform duration-300 hover:cursor-pointer mr-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-lg text-gray-800">
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
