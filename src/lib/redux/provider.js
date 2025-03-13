"use client";
import { Provider } from "react-redux";
import { injectStore } from "../constants/constant";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

 // Ensure this is a Client Component

 injectStore(store) // Inject store once

export function ReduxProvider({
    children
}) {
    return ( 
    <Provider store = {store} >
        <PersistGate loading = {null} persistor = {persistor} > 
            {children} 
        </PersistGate>  
    </Provider>
    );
}
