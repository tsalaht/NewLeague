import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeaturePriceState {
  totalPrice: string;
}

const initialState: FeaturePriceState = {
  totalPrice: '0',
};

const featurePriceSlice = createSlice({
  name: 'featurePrice',
  initialState,
  reducers: {
    addFeaturePrice(state, action: PayloadAction<string>) {
      const priceToAdd = parseFloat(action.payload) || 0;
      const currentTotal = parseFloat(state.totalPrice) || 0;
      state.totalPrice = (currentTotal + priceToAdd).toString();
    },
  },
});

export const { addFeaturePrice } = featurePriceSlice.actions;
export default featurePriceSlice.reducer;