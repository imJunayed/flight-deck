import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TempHumidityGraph = () => {
  const sensorData = useSelector(state => state.sensors.data);

  const chartData = sensorData.map((sensor, index) => ({
    time: index,
    temperature: sensor.temperature,
    humidity: sensor.humidity,
  })).reverse();

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Temperature & Humidity</h3>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-slate-600">Temp</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-slate-600">Humidity</span>
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
              dataKey="temperature" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
              <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-500">Time: 30s</span>
        <span className="text-slate-500">Update: 1s</span>
        <span className="text-slate-500">Points: {chartData.length}</span>
      </div>
    </div>
  );
};

export default TempHumidityGraph;
