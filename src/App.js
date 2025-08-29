import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSensorData } from './store/sensorSlice';
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';
import TempHumidityGraph from './components/TempHumidityGraph';
import Map from './components/Map';
import AircraftOrientation from './components/AircraftOrientation';
import AltitudePressureGraph from './components/AltitudePressureGraph';
import SpeedGraph from './components/SpeedGraph';
import GyroscopeData from './components/GyroscopeData';
import SystemHealth from './components/SystemHealth';
import LogsModal from './components/LogsModal';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [showLogs, setShowLogs] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [isFollowingPath, setIsFollowingPath] = useState(false);
  const latestSensor = useSelector(state => state.sensors.latest);

  useEffect(() => {
    // Set up real-time updates every 1 second
    const interval = setInterval(() => {
      dispatch(updateSensorData());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white font-outfit text-slate-800">
      <Header onLogsClick={() => setShowLogs(true)} isFlying={isFlying} setIsFlying={setIsFlying} isFollowingPath={isFollowingPath} setIsFollowingPath={setIsFollowingPath} />
      
      <div className="p-4 space-y-4">
        {/* Row 2: Video Feed + Temp+Humidity Graph */}
        <div className="grid grid-cols-2 gap-4">
          <VideoFeed />
          <TempHumidityGraph />
        </div>

        {/* Row 3: Map + 3D Orientation + Altitude+Pressure Graph */}
        <div className="grid grid-cols-3 gap-4">
          <Map isFollowingPath={isFollowingPath} />
          <AircraftOrientation />
          <AltitudePressureGraph />
        </div>

        {/* Row 4: Speed Graph + Gyroscope + System Health */}
        <div className="grid grid-cols-3 gap-4">
          <SpeedGraph />
          <GyroscopeData />
          <SystemHealth />
        </div>
      </div>

      <LogsModal isOpen={showLogs} onClose={() => setShowLogs(false)} />
    </div>
  );
}

export default App;
