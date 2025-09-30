import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
// import bookingConfirmationReducer from "./app/lib/redux/bookingConfirmationSlice";
// import bookingReducer from "@/lib/redux/bookingSlice";
import tourBookingReducer from "./app/lib/redux/tourBookingSlice";
// import activityBookingReducer from "./app/lib/redux/activityBookingSlice";
import userReducer from "./app/lib/redux/userSlice";
import global from "./app/lib/redux/globalSlice";
import loginModalReducer from "./app/lib/redux/loginModalSlice";
import cookieModalSlice from "./app/lib/redux/cookieModalSlice";
import hotelReducer from "./app/lib/redux/hotelList";
import bookingConfirmationReducer from "./app/lib/redux/bookingConfirmationSlice";

import { persistReducer } from "redux-persist";
import storage from "./storage";
// import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  // booking: bookingReducer,
  tourBooking: tourBookingReducer,
  user: userReducer,
  bookingConfirmation: bookingConfirmationReducer,
  loginModal: loginModalReducer,
  cookieModal: cookieModalSlice,
  hotel: hotelReducer,
  // activityBooking: activityBookingReducer,
  global: global,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["bookingConfirmation"],
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {booking: BookingState, user: UserState, isLoggedIn: LoginState}
export type AppDispatch = typeof store.dispatch;
