import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../components/search-bar/searchSlice';

export default configureStore({
  reducer: {
    search: searchReducer
  }
});
