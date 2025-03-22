import { store } from "./store";

// Manually define the entire Redux state structure
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
