import React from 'react';
import { useSelector } from 'react-redux';

const SystemHealth = () => {
  const latestSensor = useSelector(state => state.sensors.latest);

  const getHealthStatus = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    if (percentage > 80) return { color: 'text-drone-success', status: 'Excellent' };
    if (percentage > 60) return { color: 'text-drone-warning', status: 'Good' };
    if (percentage > 40) return { color: 'text-drone-warning', status: 'Fair' };
    return { color: 'text-drone-danger', status: 'Poor' };
  };

  const getBatteryStatus = () => {
    // Generate dynamic battery level based on time
    const time = Date.now();
    const battery = 85 + Math.sin(time / 10000) * 10 + (Math.random() - 0.5) * 5; // 75-95% with variation
    const batteryLevel = Math.max(75, Math.min(95, Math.round(battery)));
    
    if (batteryLevel > 80) return { color: 'text-drone-success', status: 'Optimal', level: batteryLevel };
    if (batteryLevel > 60) return { color: 'text-drone-warning', status: 'Good', level: batteryLevel };
    if (batteryLevel > 40) return { color: 'text-drone-warning', status: 'Fair', level: batteryLevel };
    return { color: 'text-drone-danger', status: 'Low', level: batteryLevel };
  };

  const getSignalStrength = () => {
    // Generate dynamic signal strength based on time
    const time = Date.now();
    const signal = 90 + Math.sin(time / 8000) * 8 + (Math.random() - 0.5) * 4; // 82-98% with variation
    const signalLevel = Math.max(82, Math.min(98, Math.round(signal)));
    
    return signalLevel;
  };

  const batteryStatus = getBatteryStatus();
  const signalStrength = getSignalStrength();

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">System Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-drone-success rounded-full animate-pulse"></div>
                     <span className="text-xs text-slate-600">All Systems</span>
        </div>
      </div>
      
             <div className="bg-slate-50 rounded-lg h-48 p-4 border border-slate-200 space-y-3">
        {/* Battery Status */}
        <div className="flex items-center justify-between">
                     <span className="text-xs text-slate-600">Battery</span>
          <div className="flex items-center space-x-2">
                         <div className="w-16 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-drone-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${batteryStatus.level}%` }}
              ></div>
            </div>
            <span className={`text-xs font-mono ${batteryStatus.color}`}>{batteryStatus.level}%</span>
          </div>
        </div>
        
        {/* Temperature Status */}
        {latestSensor && (
          <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-600">Temperature</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-mono ${getHealthStatus(latestSensor.temperature, 0, 50).color}`}>
                {latestSensor.temperature}°C
              </span>
              <span className="text-xs text-slate-500">
                {getHealthStatus(latestSensor.temperature, 0, 50).status}
              </span>
            </div>
          </div>
        )}
        
                {/* Signal Strength */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">Signal</span>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 h-3 rounded-full ${
                    bar <= Math.ceil(signalStrength / 20) ? 'bg-drone-success' : 'bg-slate-300'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-xs text-drone-success">{signalStrength}%</span>
          </div>
        </div>
        
        {/* System Status */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="text-center">
            <div className="w-2 h-2 bg-drone-success rounded-full mx-auto mb-1"></div>
                         <span className="text-xs text-slate-600">GPS</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 bg-drone-success rounded-full mx-auto mb-1"></div>
                         <span className="text-xs text-slate-600">IMU</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 bg-drone-success rounded-full mx-auto mb-1"></div>
                         <span className="text-xs text-slate-600">Radio</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 bg-drone-success rounded-full mx-auto mb-1"></div>
                         <span className="text-xs text-slate-600">Camera</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Uptime: 2h 34m</span>
        <span>Errors: 0</span>
        <span>Status: {batteryStatus.status}</span>
      </div>
    </div>
  );
};

export default SystemHealth;
