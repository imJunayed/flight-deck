import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = ({ onLogsClick, isFlying, setIsFlying, isFollowingPath, setIsFollowingPath }) => {
  const latestSensor = useSelector(state => state.sensors.latest);

  const handleStartStop = () => {
    setIsFlying(!isFlying);
  };

  const buttons = [
    { 
      icon: isFlying ? '■' : '▶', 
      text: isFlying ? 'Stop' : 'Start', 
      color: isFlying ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-black hover:bg-gray-800 text-white',
      onClick: handleStartStop
    },
    { icon: '⚠', text: 'Emergency', color: 'bg-red-600 hover:bg-red-700 text-white' },
    { icon: '⬆', text: 'Set Path', color: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300' },
    { icon: '📷', text: 'Camera', color: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300' },
    { 
      icon: '🔀', 
      text: isFollowingPath ? 'Stop Path' : 'Follow Path', 
      color: isFollowingPath ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300',
      onClick: () => setIsFollowingPath(!isFollowingPath)
    },
    { icon: '🛰', text: 'GPS Lock', color: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300' },
    { icon: '🛠', text: 'Settings', color: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300' },
    { icon: '📜', text: 'Logs', color: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300', onClick: onLogsClick },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 modern-shadow">
      <div className="flex items-center justify-between">
        {/* Left: Team Falcon */}
                 <div className="text-slate-800">
           <div className="font-bold text-lg">Flight Deck</div>
           <div className="text-xs text-slate-500">By Junayed Hasan</div>
         </div>

        {/* Center: Live sensor values */}
        <div className="flex items-center space-x-6">
          {latestSensor && (
            <>
              <div className="flex items-center space-x-2">
                               <span className="text-drone-accent text-sm">🌡</span>
               <span className="text-sm font-mono">{latestSensor.temperature}°C</span>
             </div>
             <div className="flex items-center space-x-2">
               <span className="text-drone-accent text-sm">💧</span>
               <span className="text-sm font-mono">{latestSensor.humidity}%</span>
             </div>
             <div className="flex items-center space-x-2">
               <span className="text-drone-accent text-sm">🚀</span>
               <span className="text-sm font-mono">{latestSensor.speed} m/s</span>
              </div>
            </>
          )}
        </div>

        {/* Right: Control buttons */}
        <div className="flex items-center space-x-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick || (() => {})}
                             className={`${button.color} text-sm px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1`}
            >
              <span>{button.icon}</span>
              <span>{button.text}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
