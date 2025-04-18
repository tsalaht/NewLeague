import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionSettingsState {
  waveIcon: string; // SVG XML for wave icon
  docsIcon: string; // SVG XML for docs icon
  rocketIcon: string; // SVG XML for rocket icon
  rappitIcon: string; // SVG XML for rappit icon
  turtleIcon: string; // SVG XML for turtle icon
  selectedLevel: string; // Selected level name (e.g., "متوسط")
}

const initialState: SessionSettingsState = {
  waveIcon: '', // Initialize with default inactive icon
  docsIcon: '',
  rocketIcon: '',
  rappitIcon: '',
  turtleIcon: '',
  selectedLevel: 'متوسط', // Default level
};

const sessionSettingsSlice = createSlice({
  name: 'sessionSettings',
  initialState,
  reducers: {
    setWaveIcon(state, action: PayloadAction<string>) {
      state.waveIcon = action.payload;
    },
    setDocsIcon(state, action: PayloadAction<string>) {
      state.docsIcon = action.payload;
    },
    setRocketIcon(state, action: PayloadAction<string>) {
      state.rocketIcon = action.payload;
    },
    setRappitIcon(state, action: PayloadAction<string>) {
      state.rappitIcon = action.payload;
    },
    setTurtleIcon(state, action: PayloadAction<string>) {
      state.turtleIcon = action.payload;
    },
    setSelectedLevel(state, action: PayloadAction<string>) {
      state.selectedLevel = action.payload;
    },
  },
});

export const { 
  setWaveIcon, 
  setDocsIcon, 
  setRocketIcon, 
  setRappitIcon, 
  setTurtleIcon, 
  setSelectedLevel 
} = sessionSettingsSlice.actions;
export default sessionSettingsSlice.reducer;