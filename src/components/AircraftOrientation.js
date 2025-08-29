import React from 'react';
import { useSelector } from 'react-redux';
import Drone3D from './Drone3D';

const AircraftOrientation = () => {
  const latestSensor = useSelector(state => state.sensors.latest);



  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">3D Orientation</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-drone-success rounded-full animate-pulse"></div>
                     <span className="text-xs text-slate-600">IMU Active</span>
        </div>
      </div>
      
             <div className="bg-slate-50 rounded-lg h-48 flex items-center justify-center border border-slate-200 relative">
                 {/* 3D Drone Model */}
         <div className="transition-transform duration-300 ease-out">
           <Drone3D 
             yaw={latestSensor ? latestSensor.gyroscope.yaw : 0}
             pitch={latestSensor ? latestSensor.gyroscope.pitch : 0}
             roll={latestSensor ? latestSensor.gyroscope.roll : 0}
           />
         </div>
        
        {/* Orientation Arrows */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Yaw Arrow (Z-axis) */}
          <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-blue-500 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-blue-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
          </div>
          
          {/* Pitch Arrow (X-axis) */}
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-green-500 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-t-4 border-t-green-500 border-l-2 border-l-transparent border-r-2 border-r-transparent"></div>
          </div>
          
          {/* Roll Arrow (Y-axis) */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-3 border-b-red-500 transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>
      
      {/* Orientation Values */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-drone-accent font-mono">
            {latestSensor ? latestSensor.gyroscope.yaw.toFixed(1) : '0.0'}°
          </div>
                     <div className="text-slate-600">Yaw</div>
        </div>
        <div className="text-center">
          <div className="text-drone-accent font-mono">
            {latestSensor ? latestSensor.gyroscope.pitch.toFixed(1) : '0.0'}°
          </div>
                     <div className="text-slate-600">Pitch</div>
        </div>
        <div className="text-center">
          <div className="text-drone-accent font-mono">
            {latestSensor ? latestSensor.gyroscope.roll.toFixed(1) : '0.0'}°
          </div>
                     <div className="text-slate-600">Roll</div>
        </div>
      </div>
    </div>
  );
};

export default AircraftOrientation;
