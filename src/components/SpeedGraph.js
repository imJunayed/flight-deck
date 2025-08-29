import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const SpeedGraph = () => {
  const sensorData = useSelector(state => state.sensors.data);

  const chartData = sensorData.map((sensor, index) => ({
    time: index,
    speed: sensor.speed,
  })).reverse();

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Speed Graph</h3>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-slate-600">Speed</span>
          </div>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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
            <Area 
              type="monotone" 
              dataKey="speed" 
              stroke="#f97316" 
              fill="#f97316"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Max: {chartData.length > 0 ? Math.max(...chartData.map(d => d.speed)) : 0} m/s</span>
        <span>Avg: {chartData.length > 0 ? (chartData.reduce((sum, d) => sum + d.speed, 0) / chartData.length).toFixed(1) : 0} m/s</span>
        <span>Current: {chartData.length > 0 ? chartData[0].speed : 0} m/s</span>
      </div>
    </div>
  );
};

export default SpeedGraph;
