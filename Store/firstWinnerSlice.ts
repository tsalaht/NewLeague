import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirstWinnerState {
  prizeAmount: string;
}

const initialState: FirstWinnerState = {
  prizeAmount: '0',
};

const firstWinnerSlice = createSlice({
  name: 'firstWinner',
  initialState,
  reducers: {
    setPrizeAmount(state, action: PayloadAction<string>) {
      state.prizeAmount = action.payload;
    },
  },
});

export const { setPrizeAmount } = firstWinnerSlice.actions;
export default firstWinnerSlice.reducer;