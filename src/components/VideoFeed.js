import React from 'react';

const VideoFeed = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Live Feed</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-drone-success rounded-full animate-pulse"></div>
                     <span className="text-xs text-slate-600">LIVE</span>
        </div>
      </div>
      
             <div className="bg-slate-50 rounded-lg h-48 flex items-center justify-center border border-slate-200">
        <div className="text-center">
          <div className="text-4xl mb-2">🛩️</div>
                     <div className="text-xs text-slate-600">Live Feed</div>
           <div className="text-xs text-slate-500">Real-time drone camera</div>
        </div>
      </div>
      
             <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Resolution: 1080p</span>
        <span>FPS: 30</span>
        <span>Signal: 95%</span>
      </div>
    </div>
  );
};

export default VideoFeed;
