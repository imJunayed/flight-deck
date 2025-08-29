import { configureStore } from '@reduxjs/toolkit';
import sensorReducer from './sensorSlice';
import flightReducer from './flightSlice';

export const store = configureStore({
  reducer: {
    sensors: sensorReducer,
    flights: flightReducer,
  },
});
