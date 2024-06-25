import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSummary } from '../services/api';
import { Summary } from '../models/Summary';

interface SummaryState {
  data: Summary | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SummaryState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchSummary = createAsyncThunk('summary/fetchSummary', async () => {
  const response = await getSummary();
  return response;
});

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch summary';
      });
  },
});

export default summarySlice.reducer;
