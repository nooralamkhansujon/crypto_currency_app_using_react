import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/CryptoApi.js";
import { CryptoNewsApi } from "../services/CryptoNewsApi.js";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [CryptoNewsApi.reducerPath]: CryptoNewsApi.reducer,
  },
});
