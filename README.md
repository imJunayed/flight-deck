# Flight Deck - Fixed-Wing Drone Dashboard

A modern, compact React + Redux + Tailwind single-page flight dashboard for fixed-wing drones with real-time sensor data visualization.

## 🚀 Features

- **Real-time Dashboard**: Live sensor data updates every 1 second with 30-second data window and smooth animations
- **Compact Modern UI**: No scrolling, small UI elements, soft colors, rounded corners
- **Live Sensor Data**: Temperature, Humidity, Speed, Altitude, Pressure, Gyroscope, GPS
- **Flight Logs**: Track flight history with detailed metrics
- **Interactive Charts**: Multi-line graphs for sensor data visualization with frequent updates
- **Path Planning**: Set and follow flight paths with waypoint visualization
- **Flight Controls**: Start/Stop functionality with real-time status updates
- **3D Orientation**: Real-time aircraft yaw/pitch/roll visualization
- **System Health**: Battery, signal strength, and system status monitoring
- **Local Data Simulation**: No server required - all data generated locally

## 🛠️ Tech Stack

- **Frontend**: React 18 + Redux Toolkit + Tailwind CSS
- **Charts**: Recharts for data visualization
- **Maps**: Leaflet for GPS and path visualization
- **Styling**: Custom Tailwind configuration with Outfit font
- **State Management**: Redux for global state management
- **Data Simulation**: Local JavaScript-based sensor data generation

## 📁 Project Structure

```
flight-deck/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── VideoFeed.js
│   │   ├── TempHumidityGraph.js
│   │   ├── Map.js
│   │   ├── AircraftOrientation.js
│   │   ├── AltitudePressureGraph.js
│   │   ├── SpeedGraph.js
│   │   ├── GyroscopeData.js
│   │   ├── SystemHealth.js
│   │   └── LogsModal.js
│   ├── store/
│   │   ├── index.js
│   │   ├── sensorSlice.js
│   │   └── flightSlice.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Application

```bash
npm start
```

The React app will run on `http://localhost:3000`

**That's it!** No server setup required. All data is generated locally and updates every second.

## 📊 Dashboard Layout

### Header (Top Bar)
- **Left**: "Flight Deck" title with "By Junayed Hasan" subtitle
- **Center**: Live real-time sensor values (Temperature, Humidity, Speed)
- **Right**: Control buttons (Start, Stop, Emergency, Set Path, Camera, Follow Path, GPS Lock, Settings, Logs)

### Row 2 (2 columns)
- **Left**: Live Feed (dummy video feed)
- **Right**: Multi-line graph (Temperature + Humidity)

### Row 3 (3 columns)
- **Left**: Live GPS Map with path planning and waypoint visualization
- **Middle**: 3D aircraft orientation (yaw/pitch/roll)
- **Right**: Multi-line graph (Altitude + Pressure)

### Row 4 (3 columns)
- **Left**: Speed graph
- **Middle**: Gyroscope data with mini 3D visualization
- **Right**: System health (battery, signal strength, temperature status)

## 📈 Real-time Data Simulation

The dashboard generates realistic sensor data every second:

- **Temperature**: 22-28°C with realistic sine wave variations
- **Humidity**: 60-75% with realistic cosine wave variations
- **Speed**: 25-40 m/s with realistic variations
- **Altitude**: 140-170m with realistic sine wave patterns
- **Pressure**: 1005-1015 hPa with realistic variations
- **Gyroscope**: Yaw (-2° to +2°), Pitch (-1.5° to +1.5°), Roll (-1.2° to +1.2°)
- **GPS**: Realistic movement around Lalmonirhat, Bangladesh
- **Battery**: 75-95% with dynamic variations
- **Signal**: 82-98% with dynamic strength bars

## 🎮 Controls

- **Start/Stop**: Toggle flight status
- **Emergency**: Emergency stop button
- **Set Path**: Define flight path waypoints
- **Follow Path**: Enable automatic path following
- **GPS Lock**: Toggle GPS lock status
- **Logs**: View flight history

## 🎨 Styling

- **Font**: Outfit (Google Fonts)
- **Colors**: White mode with soft colors and rounded corners
- **Layout**: Compact, no scrolling design
- **Animations**: Smooth transitions and real-time updates

## 🚀 Development

### Running the App

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Data Generation

All sensor data is generated locally using mathematical functions:
- Sine and cosine waves for realistic variations
- Random noise for natural fluctuations
- Time-based patterns for smooth animations

### Customization

- Modify sensor ranges in `src/store/sensorSlice.js`
- Adjust update frequency in `src/App.js`
- Customize styling in `tailwind.config.js`
- Update flight logs in `src/store/flightSlice.js`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
# flight-deck
