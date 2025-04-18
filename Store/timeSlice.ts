import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeState {
  selectedTime: string | null;
}

const initialState: TimeState = {
  selectedTime: "بعد ساعة",
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setSelectedTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
  },
});

export const { setSelectedTime } = timeSlice.actions;
export default timeSlice.reducer;