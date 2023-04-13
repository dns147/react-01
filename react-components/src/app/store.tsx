import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../components/search-bar';

export default configureStore({
  reducer: {
    searchBar: searchBarReducer
  }
});
