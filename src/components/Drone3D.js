import React from 'react';

const Drone3D = ({ yaw, pitch, roll }) => {
  const transform = `rotateZ(${yaw}deg) rotateX(${pitch}deg) rotateY(${roll}deg)`;

  return (
    <div className="relative w-16 h-16 transform-gpu" style={{ transform }}>
      {/* Main body */}
      <div className="absolute top-1/2 left-1/2 w-8 h-2 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Wings */}
      <div className="absolute top-1/2 left-1/2 w-12 h-1 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Tail */}
      <div className="absolute top-1/2 left-1/2 w-1 h-6 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Propellers */}
      <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin"></div>
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 translate-y-1/2 animate-spin"></div>
      <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin"></div>
      <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2 animate-spin"></div>
      
      {/* Camera */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default Drone3D;
