import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AltitudePressureGraph = () => {
  const sensorData = useSelector(state => state.sensors.data);

  const chartData = sensorData.map((sensor, index) => ({
    time: index,
    altitude: sensor.altitude,
    pressure: sensor.pressure,
  })).reverse();

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Altitude & Pressure</h3>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-slate-600">Altitude</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-slate-600">Pressure</span>
          </div>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                         <XAxis 
               dataKey="time" 
               stroke="#64748b" 
               fontSize={13}
               tick={{ fontSize: 13 }}
             />
             <YAxis 
               stroke="#64748b" 
               fontSize={13}
               tick={{ fontSize: 13 }}
             />
                          <Tooltip 
                               contentStyle={{ 
                 backgroundColor: '#ffffff', 
                 border: '1px solid #e2e8f0',
                 borderRadius: '8px',
                 fontSize: '13px',
                 color: '#1e293b'
               }}
              />
            <Line 
              type="monotone" 
              dataKey="altitude" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="pressure" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Max Alt: {Math.max(...chartData.map(d => d.altitude))}m</span>
        <span>Min Press: {Math.min(...chartData.map(d => d.pressure))}hPa</span>
        <span>Current: {chartData.length > 0 ? chartData[0].altitude : 0}m</span>
      </div>
    </div>
  );
};

export default AltitudePressureGraph;
