import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeagueSettingsState {
  selectedTeam: string | null;
  selectedGame: string | any | null;
}

const initialState: LeagueSettingsState = {
  selectedTeam: "8 (16 لاعب)",
  selectedGame: 1,
};

const leagueSettingsSlice = createSlice({
  name: 'leagueSettings',
  initialState,
  reducers: {
    setSelectedTeam(state, action: PayloadAction<string>) {
      state.selectedTeam = action.payload;
    },
    setSelectedGame(state, action: PayloadAction<string>) {
      state.selectedGame = action.payload;
    },
  },
});

export const { setSelectedTeam, setSelectedGame } = leagueSettingsSlice.actions;
export default leagueSettingsSlice.reducer;