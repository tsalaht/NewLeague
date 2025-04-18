import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import timeReducer from './timeSlice';
import leagueSettingsReducer from './leagueSettingsSlice';
import sessionSettingsReducer from './sessionSettingsSlice';
import firstWinnerReducer from './firstWinnerSlice';
import featurePriceReducer from './featurePriceSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    time: timeReducer,
    leagueSettings: leagueSettingsReducer,
    sessionSettings: sessionSettingsReducer,
    firstWinner: firstWinnerReducer,
    featurePrice: featurePriceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;