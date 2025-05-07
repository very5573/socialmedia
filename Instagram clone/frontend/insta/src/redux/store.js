import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { combineReducers } from 'redux';
import feedReducer from './slices/feedSlice'; // your slice

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  feed: feedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
