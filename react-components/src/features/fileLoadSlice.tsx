import * as toolkitRaw from '@reduxjs/toolkit';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const { createSlice, createAsyncThunk } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IFileLoadState } from '../types/types';

function loadFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const fetchLoadFile = createAsyncThunk<string, File, { rejectValue: string }>(
  'file/fetchLoadFile',
  async function (file, { rejectWithValue }) {
    let imageUrl = '';

    try {
      imageUrl = (await loadFile(file)) as string;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error as string);
    }

    return imageUrl;
  }
);

const initialState: IFileLoadState = {
  file: '',
  loading: false,
  error: null,
};

export const fileLoadSlice = createSlice({
  name: 'fileLoad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoadFile.fulfilled, (state, action) => {
        state.file = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default fileLoadSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
