import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: DataProcess = {
  isFetchingData: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setDataFetchingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFetchingData = action.payload;
    },
  },
});

export const { setDataFetchingStatus } = dataProcess.actions;
