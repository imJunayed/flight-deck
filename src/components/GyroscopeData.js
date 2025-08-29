import React from 'react';
import { useSelector } from 'react-redux';

const GyroscopeData = () => {
  const latestSensor = useSelector(state => state.sensors.latest);

  const getStatusColor = (value) => {
    const absValue = Math.abs(value);
    if (absValue < 1) return 'text-drone-success';
    if (absValue < 3) return 'text-drone-warning';
    return 'text-drone-danger';
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Gyroscope</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-drone-success rounded-full animate-pulse"></div>
                     <span className="text-xs text-slate-600">IMU</span>
        </div>
      </div>
      
             <div className="bg-slate-50 rounded-lg h-48 p-4 border border-slate-200">
        {/* Mini 3D Visualization */}
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-20">
                         <div className="absolute inset-0 border-2 border-slate-300 rounded-lg"></div>
            <div 
              className="absolute inset-0 border-2 border-drone-accent rounded-lg transition-all duration-300"
              style={{
                transform: latestSensor ? 
                  `rotateX(${latestSensor.gyroscope.pitch}deg) rotateY(${latestSensor.gyroscope.roll}deg) rotateZ(${latestSensor.gyroscope.yaw}deg)` : 
                  'none'
              }}
            ></div>
          </div>
        </div>
        
        {/* Gyroscope Values */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className={`text-lg font-mono font-bold ${getStatusColor(latestSensor?.gyroscope.yaw || 0)}`}>
              {latestSensor ? latestSensor.gyroscope.yaw.toFixed(1) : '0.0'}
            </div>
                         <div className="text-xs text-slate-600">Yaw (°)</div>
             <div className="text-xs text-slate-500">Z-axis</div>
          </div>
          
          <div>
            <div className={`text-lg font-mono font-bold ${getStatusColor(latestSensor?.gyroscope.pitch || 0)}`}>
              {latestSensor ? latestSensor.gyroscope.pitch.toFixed(1) : '0.0'}
            </div>
                         <div className="text-xs text-slate-600">Pitch (°)</div>
            <div className="text-xs text-slate-500">X-axis</div>
          </div>
          
          <div>
            <div className={`text-lg font-mono font-bold ${getStatusColor(latestSensor?.gyroscope.roll || 0)}`}>
              {latestSensor ? latestSensor.gyroscope.roll.toFixed(1) : '0.0'}
            </div>
                         <div className="text-xs text-slate-600">Roll (°)</div>
            <div className="text-xs text-slate-500">Y-axis</div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Range: ±180°</span>
        <span>Resolution: 0.1°</span>
        <span>Update: 100Hz</span>
      </div>
    </div>
  );
};

export default GyroscopeData;
