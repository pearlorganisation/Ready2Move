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
