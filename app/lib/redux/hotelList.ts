import { RootState } from "@/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HotelListState {
  hotelsList?: any;
  soldOutHotels?:any;
}

const initialHotelState: HotelListState = {
  hotelsList: [],
  soldOutHotels:[]
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialHotelState,
  reducers: {
    setHotelsList: (state, action: PayloadAction<any[] | ((prevData: any[]) => any[])>) => {
      if (typeof action.payload === 'function') {
        state.hotelsList = action.payload(state.hotelsList);
      } else {
        state.hotelsList = action.payload;
      }
    },
    setSoldOutHotels: (state, action: PayloadAction<any[] | ((prevData: any[]) => any[])>) => {
      if (typeof action.payload === "function") {
        state.soldOutHotels = action.payload(state.soldOutHotels);
      } else {
        state.soldOutHotels = action.payload;
      }
    },
  },
});

// Action creators are generated for each case render function
export const { setHotelsList, setSoldOutHotels } = hotelSlice.actions;

// Selectors
export const selectHotelList = (state: RootState) => state.hotel.hotelsList;
export const selectSoldOutHotels = (state: RootState) => state.hotel.soldOutHotels;


export default hotelSlice.reducer;