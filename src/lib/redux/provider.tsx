"use client";
import { Provider } from "react-redux";
import { injectStore } from "../constants/constant";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}

injectStore(store); // Inject store once

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
