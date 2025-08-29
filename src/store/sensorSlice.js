import { createSlice } from '@reduxjs/toolkit';

// Function to generate realistic sensor data with smooth variations
function generateSensorData() {
  const currentTime = new Date();
  
  // Create realistic variations for better visualization
  const timeVariation = Math.sin(Date.now() / 2000) * 2; // Slower, realistic variation
  const altitudeVariation = Math.sin(Date.now() / 1500) * 15; // Realistic altitude changes
  const speedVariation = Math.cos(Date.now() / 1800) * 8; // Realistic speed changes
  const tempVariation = Math.sin(Date.now() / 2500) * 3; // Realistic temperature changes
  const humidityVariation = Math.cos(Date.now() / 2200) * 8; // Realistic humidity changes
  
  return {
    id: Date.now(),
    timestamp: currentTime.toISOString(),
    temperature: Math.round((25 + tempVariation + (Math.random() - 0.5) * 2) * 10) / 10, // 22-28°C with realistic variation
    humidity: Math.round(65 + humidityVariation + (Math.random() - 0.5) * 4), // 60-75% with realistic variation
    speed: Math.round(30 + speedVariation + (Math.random() - 0.5) * 4), // 25-40 m/s with realistic variation
    altitude: Math.round(150 + altitudeVariation + (Math.random() - 0.5) * 10), // 140-170m with realistic variation
    pressure: Math.round(1010 + timeVariation + (Math.random() - 0.5) * 3), // 1005-1015 hPa with realistic variation
    gyroscope: {
      yaw: Math.round((Math.sin(Date.now() / 1000) * 2 + (Math.random() - 0.5) * 0.5) * 10) / 10, // -2 to +2° with realistic sine wave
      pitch: Math.round((Math.cos(Date.now() / 1200) * 1.5 + (Math.random() - 0.5) * 0.4) * 10) / 10, // -1.5 to +1.5° with realistic cosine wave
      roll: Math.round((Math.sin(Date.now() / 1400) * 1.2 + (Math.random() - 0.5) * 0.3) * 10) / 10   // -1.2 to +1.2° with realistic sine wave
    },
    gps: {
      lat: 25.8963 + (Math.sin(Date.now() / 3000) * 0.002) + (Math.random() - 0.5) * 0.0005, // Lalmonirhat base + realistic sine wave + noise
      lng: 89.4483 + (Math.cos(Date.now() / 3000) * 0.002) + (Math.random() - 0.5) * 0.0005  // Lalmonirhat base + realistic cosine wave + noise
    }
  };
}

// Generate initial data (30 data points)
function generateInitialData() {
  const data = [];
  const baseTime = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const time = new Date(baseTime.getTime() - (i * 1000));
    const tempVariation = Math.sin((Date.now() - i * 1000) / 2500) * 3;
    const humidityVariation = Math.cos((Date.now() - i * 1000) / 2200) * 8;
    const speedVariation = Math.cos((Date.now() - i * 1000) / 1800) * 8;
    const altitudeVariation = Math.sin((Date.now() - i * 1000) / 1500) * 15;
    const pressureVariation = Math.sin((Date.now() - i * 1000) / 2000) * 2;
    
    data.push({
      id: Date.now() - (i * 1000),
      timestamp: time.toISOString(),
      temperature: Math.round((25 + tempVariation + (Math.random() - 0.5) * 2) * 10) / 10,
      humidity: Math.round(65 + humidityVariation + (Math.random() - 0.5) * 4),
      speed: Math.round(30 + speedVariation + (Math.random() - 0.5) * 4),
      altitude: Math.round(150 + altitudeVariation + (Math.random() - 0.5) * 10),
      pressure: Math.round(1010 + pressureVariation + (Math.random() - 0.5) * 3),
      gyroscope: {
        yaw: Math.round((Math.sin((Date.now() - i * 1000) / 1000) * 2 + (Math.random() - 0.5) * 0.5) * 10) / 10,
        pitch: Math.round((Math.cos((Date.now() - i * 1000) / 1200) * 1.5 + (Math.random() - 0.5) * 0.4) * 10) / 10,
        roll: Math.round((Math.sin((Date.now() - i * 1000) / 1400) * 1.2 + (Math.random() - 0.5) * 0.3) * 10) / 10
      },
      gps: {
        lat: 25.8963 + (Math.sin((Date.now() - i * 1000) / 3000) * 0.002) + (Math.random() - 0.5) * 0.0005,
        lng: 89.4483 + (Math.cos((Date.now() - i * 1000) / 3000) * 0.002) + (Math.random() - 0.5) * 0.0005
      }
    });
  }
  
  return data;
}

const sensorSlice = createSlice({
  name: 'sensors',
  initialState: {
    data: generateInitialData(),
    latest: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateSensorData: (state) => {
      const newSensorData = generateSensorData();
      state.latest = newSensorData;
      state.data.push(newSensorData);
      
      // Keep only last 30 sensor readings
      if (state.data.length > 30) {
        state.data = state.data.slice(-30);
      }
    },
    setLatestSensor: (state, action) => {
      state.latest = action.payload;
    },
  },
});

export const { updateSensorData, setLatestSensor } = sensorSlice.actions;
export default sensorSlice.reducer;
