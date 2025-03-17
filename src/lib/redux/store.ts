import { encryptTransform } from "redux-persist-transform-encrypt";
import rootReducer, { RootState } from ".";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "../util/customStorage";

const rootReducerWithClear = (state: RootState | undefined, action: any) => {
  if (action.type === "readyToMove/clearReduxState") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return rootReducer(state, action);
};

// Redux-persist configuration
const persistConfig = {
  key: "readyToMoveClientPanel", // Ensure unique key
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `abcdefghi1234567890`,
      onError: (err) => {
        console.error("Persist Transform Error:", err);
      },
    }),
  ],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducerWithClear);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// export type AppDispatch = typeof store.dispatch;
