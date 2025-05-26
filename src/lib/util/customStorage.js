import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem: () => Promise.resolve(null),
        setItem: (value) => Promise.resolve(value),
        removeItem: () => Promise.resolve(),
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;


// src/lib/util/customStorage.js

// Import the standard web storage module (which uses localStorage under the hood)
// This module will only work in a browser environment
