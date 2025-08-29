import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ isFollowingPath: externalFollowingPath }) => {
  const latestSensor = useSelector(state => state.sensors.latest);
  const [path, setPath] = useState([
    { lat: 25.8963, lng: 89.4483 }, // Lalmonirhat center
    { lat: 25.8965, lng: 89.4485 }, // Northeast
    { lat: 25.8968, lng: 89.4488 }, // Further Northeast
    { lat: 25.8970, lng: 89.4490 }, // East
    { lat: 25.8972, lng: 89.4492 }, // Further East
    { lat: 25.8975, lng: 89.4495 }, // Southeast
    { lat: 25.8977, lng: 89.4497 }, // South
    { lat: 25.8979, lng: 89.4499 }, // Southwest
    { lat: 25.8981, lng: 89.4501 }, // West
    { lat: 25.8983, lng: 89.4503 }, // Northwest
    { lat: 25.8985, lng: 89.4505 }, // North
    { lat: 25.8987, lng: 89.4507 }, // Back to center area
    { lat: 25.8963, lng: 89.4483 }, // Back to start
  ]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isFollowingPath, setIsFollowingPath] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const droneMarkerRef = useRef(null);
  const pathLineRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Fix Leaflet icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Create map instance
      const map = L.map(mapRef.current).setView([25.8963, 89.4483], 15);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Create drone marker
      const droneIcon = L.divIcon({
        className: 'drone-marker',
        html: '<div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      droneMarkerRef.current = L.marker([25.8963, 89.4483], { icon: droneIcon }).addTo(map);

      // Create path line
      const pathCoords = path.map(p => [p.lat, p.lng]);
      pathLineRef.current = L.polyline(pathCoords, {
        color: '#6366f1',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
      }).addTo(map);

      // Add waypoint markers
      path.forEach((point, index) => {
        const waypointIcon = L.divIcon({
          className: 'waypoint-marker',
          html: `<div style="background: ${index === 0 ? '#06b6d4' : '#6366f1'}; width: 8px; height: 8px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [8, 8],
          iconAnchor: [4, 4]
        });
        L.marker([point.lat, point.lng], { icon: waypointIcon }).addTo(map);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update drone position
  useEffect(() => {
    if (latestSensor && droneMarkerRef.current && mapInstanceRef.current) {
      const newPos = [latestSensor.gps.lat, latestSensor.gps.lng];
      droneMarkerRef.current.setLatLng(newPos);
      
      // Smoothly follow drone with realistic movement
      if (externalFollowingPath) {
        mapInstanceRef.current.panTo(newPos, { animate: true, duration: 2 });
      }
    }
  }, [latestSensor, externalFollowingPath]);

  // Simulate path following
  useEffect(() => {
    if (externalFollowingPath && latestSensor) {
      const interval = setInterval(() => {
        setCurrentPathIndex(prev => (prev + 1) % path.length);
      }, 3000); // Move to next waypoint every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [externalFollowingPath, latestSensor, path.length]);

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 modern-shadow smooth-transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-800">Live GPS</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-drone-success rounded-full animate-pulse"></div>
                     <span className="text-xs text-slate-600">GPS Lock</span>
        </div>
      </div>
      
             <div className="bg-slate-50 rounded-lg h-48 border border-slate-200 relative overflow-hidden">
         <div ref={mapRef} className="w-full h-full"></div>
         
         {/* GPS coordinates overlay */}
         {latestSensor && (
           <div className="absolute bottom-2 left-2 bg-white bg-opacity-95 rounded-lg p-2 text-xs border border-slate-200 shadow-sm">
             <div className="text-slate-800 font-mono">
               <div>Lat: {latestSensor.gps.lat.toFixed(4)}°</div>
               <div>Lng: {latestSensor.gps.lng.toFixed(4)}°</div>
             </div>
           </div>
         )}
         
         {/* Path Info */}
         <div className="absolute top-2 right-2 bg-slate-800 bg-opacity-95 rounded-lg p-2 text-xs border border-slate-200 shadow-sm">
           <div className="text-white">
             <div>WP: {currentPathIndex + 1}/{path.length}</div>
             <div>Path: {externalFollowingPath ? 'Following' : 'Set'}</div>
           </div>
         </div>
       </div>
      
             <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Satellites: 12</span>
        <span>Accuracy: ±2m</span>
        <span>Altitude: {latestSensor?.altitude || 0}m</span>
      </div>
    </div>
  );
};

export default Map;
