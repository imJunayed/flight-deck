import { createSlice } from '@reduxjs/toolkit';

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    data: [
      {
        id: 1,
        startTime: "2025-01-29T09:00:00Z",
        endTime: "2025-01-29T09:15:00Z",
        duration: 15,
        maxAltitude: 220,
        avgSpeed: 35,
        status: "Completed"
      },
      {
        id: 2,
        startTime: "2025-01-29T08:30:00Z",
        endTime: "2025-01-29T08:42:00Z",
        duration: 12,
        maxAltitude: 180,
        avgSpeed: 28,
        status: "Completed"
      },
      {
        id: 3,
        startTime: "2025-01-29T08:00:00Z",
        endTime: "2025-01-29T08:08:00Z",
        duration: 8,
        maxAltitude: 150,
        avgSpeed: 25,
        status: "Aborted"
      }
    ],
    status: 'idle',
    error: null,
  },
  reducers: {},
});

export default flightSlice.reducer;
