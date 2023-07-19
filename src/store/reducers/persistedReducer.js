import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Import your reducers and create the root reducer
import rootReducer from './reducers';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  // Add any specific reducers that you want to persist
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(persistedReducer);

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
