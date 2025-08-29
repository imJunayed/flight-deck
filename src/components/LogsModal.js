import React from 'react';
import { useSelector } from 'react-redux';

const LogsModal = ({ isOpen, onClose }) => {
  const { data: logs } = useSelector(state => state.flights);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-drone-success';
      case 'In Progress':
        return 'text-drone-warning';
      case 'Aborted':
        return 'text-drone-danger';
      default:
        return 'text-slate-400';
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (timeString) => {
    return new Date(timeString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full mx-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-drone-accent">📜 Flight Logs</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-2 text-slate-400 font-medium">Flight ID</th>
                <th className="text-left p-2 text-slate-400 font-medium">Date</th>
                <th className="text-left p-2 text-slate-400 font-medium">Start Time</th>
                <th className="text-left p-2 text-slate-400 font-medium">End Time</th>
                <th className="text-left p-2 text-slate-400 font-medium">Duration</th>
                <th className="text-left p-2 text-slate-400 font-medium">Max Altitude</th>
                <th className="text-left p-2 text-slate-400 font-medium">Avg Speed</th>
                <th className="text-left p-2 text-slate-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((flight) => (
                <tr key={flight.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="p-2 font-mono text-drone-accent">#{flight.id}</td>
                  <td className="p-2 text-slate-300">{formatDate(flight.startTime)}</td>
                  <td className="p-2 font-mono text-slate-300">{formatTime(flight.startTime)}</td>
                  <td className="p-2 font-mono text-slate-300">{formatTime(flight.endTime)}</td>
                  <td className="p-2 font-mono text-slate-300">{flight.duration} min</td>
                  <td className="p-2 font-mono text-slate-300">{flight.maxAltitude} m</td>
                  <td className="p-2 font-mono text-slate-300">{flight.avgSpeed} m/s</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                      {flight.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Total Flights: {logs.length}</span>
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsModal;
