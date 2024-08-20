import { configureStore } from "@reduxjs/toolkit";
import { authApi as restApi } from "./services/restApi";
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer: {
        [restApi.reducerPath]: restApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(restApi.middleware),
})

export default store;