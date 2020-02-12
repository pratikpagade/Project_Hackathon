import { createStore, applyMiddleware,compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
  // blacklist: ['navigation']
  // whitelist: ['auth', 'notes']
};

const pReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ ? 
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) :
    compose(applyMiddleware(...middleware));
export const store = createStore(
  pReducer,
  initialState,
  composeEnhancers
);

export const persistor = persistStore(store);
