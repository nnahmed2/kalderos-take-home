import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import summaryReducer from './slices/summarySlice';

// Redux store
const store = configureStore({
  reducer: {
    summary: summaryReducer,
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;


