// import { getDefaultStartDate } from "@/src/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PlanDetails } from "../classModels/bookings/planDetails";
import { RootState } from "@/store";
// import { TourPlanInformation } from "../classModels/tourAndTravels/TourPlanInformation";
// import { LocationInfo } from "../classModels/tourAndTravels/TourPackageInfo";
import { getDefaultStartDate } from "../utils/getDefaultStartDate/getDefaultStartDate";
import { PlanDetails } from "@/app/classes/bookings/planDetails";
import { TourPlanInformation } from "@/app/classes/tourAndTravels/TourPlanInformation";
import { LocationInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";

export interface TourBookingState {
  plans_List: PlanDetails[];
  tour_Slug_Name: string;
  tour_Name: string;
  tour_Image_Url: string;
  tour_Duration: number;
  tour_Number_Of_Days: number;
  tour_Number_Of_Nights: number;
  tour_Type: string;

  searched_Text: string;
  searched_Date: Date;
  searched_Adults_Count: number;
  searched_Children_Count: number;

  tour_Start_Date: Date;
  tour_Plan_Map: any;

  total_Tour_Cost: number;
  total_Tax: number;
  total_Price: number;

  total_Adult_Cost: number;
  total_Adult_Tax: number;
  total_Adult_Price: number;

  total_Child_Cost: number;
  total_Child_Tax: number;
  total_Child_Price: number;

  total_Discount: number;
  paying_Amount: number;
  amount_Paid: number;

  total_Plan_Count: number;
  total_Adults_Count: number;
  total_Children_Count: number;
  total_Guests_Count: number;

  tour_Payment_Option: any;
  tour_Partial_Percentage: number;
  tour_Logo_Url: string;
  tour_Theme_Info: any;

  tour_Currency_Code: string;
  tour_Currency_Symbol: string;
  tour_Currency_Value: number;

  booking_Card_Loading: boolean;
}

const initialTourBookingState: TourBookingState = {
  plans_List: [],
  tour_Slug_Name: "",
  tour_Name: "",
  tour_Image_Url: "",
  tour_Duration: 0,
  tour_Number_Of_Days: 1,
  tour_Number_Of_Nights: 0,
  tour_Plan_Map: {},
  tour_Type: "",

  total_Tour_Cost: 0,
  total_Tax: 0,
  total_Price: 0,

  total_Adult_Cost: 0,
  total_Adult_Tax: 0,
  total_Adult_Price: 0,

  total_Child_Cost: 0,
  total_Child_Tax: 0,
  total_Child_Price: 0,

  searched_Text: "",
  searched_Date: getDefaultStartDate(),
  searched_Adults_Count: 1,
  searched_Children_Count: 0,

  tour_Start_Date: getDefaultStartDate(),
  total_Adults_Count: 0,
  total_Children_Count: 0,
  total_Guests_Count: 0,
  total_Plan_Count: 0,

  total_Discount: 0,
  paying_Amount: 0,
  amount_Paid: 0,

  tour_Payment_Option: {
    prepaid_Payment: true,
    postpaid_Payment: false,
    partial_Payment: false,
  },
  tour_Partial_Percentage: 15,
  tour_Logo_Url: "",
  tour_Theme_Info: {},

  tour_Currency_Code: "INR",
  tour_Currency_Symbol: "₹",
  tour_Currency_Value: 0,

  booking_Card_Loading: true,
};

export const tourBookingSlice = createSlice({
  name: "tourBooking",
  initialState: initialTourBookingState,
  reducers: {
    setTourBookingCardLoading(state, action: PayloadAction<boolean>) {
      state.booking_Card_Loading = action.payload;
    },
    updateTourDetails: (
      state,
      action: PayloadAction<{
        tour_Slug_Name: string;
        tour_Name: string;
        tour_Image_Url: string;
        tour_Duration: number;
        tour_Number_Of_Days: number;
        tour_Number_Of_Nights: number;
        tour_Payment_Option: any;
        tour_Partial_Percentage: number;
        tour_Type: string;
      }>,
    ) => {
      state.tour_Slug_Name = action.payload.tour_Slug_Name;
      state.tour_Name = action.payload.tour_Name;
      state.tour_Image_Url = action.payload.tour_Image_Url;
      state.tour_Duration = action.payload.tour_Duration;
      state.tour_Number_Of_Days = action.payload.tour_Number_Of_Days;
      state.tour_Number_Of_Nights = action.payload.tour_Number_Of_Nights;
      state.tour_Payment_Option = action.payload.tour_Payment_Option;
      state.tour_Partial_Percentage = action.payload.tour_Partial_Percentage;
      state.tour_Type = action.payload.tour_Type;
    },
    updateTourDuration: (
      state,
      action: PayloadAction<{
        tour_Start_Date: Date;
        tour_Adults_Count: number;
        tour_Children_Count: number;
      }>,
    ) => {
      state.tour_Start_Date = action.payload.tour_Start_Date;
      state.searched_Adults_Count = action.payload.tour_Adults_Count;
      state.searched_Children_Count = action.payload.tour_Children_Count;
    },
    resetTourBookingInfo: (state) => {
      state.plans_List = [];
      state.tour_Slug_Name = "";
      state.tour_Name = "";
      state.tour_Image_Url = "";
      state.tour_Duration = 0;
      state.tour_Number_Of_Days = 1;
      state.tour_Number_Of_Nights = 0;

      state.tour_Plan_Map = {};

      state.total_Adults_Count = 0;
      state.total_Children_Count = 0;
      state.total_Guests_Count = 0;
      state.total_Plan_Count = 0;

      state.total_Discount = 0;
      state.paying_Amount = 0;
      state.amount_Paid = 0;

      state.total_Adult_Cost = 0;
      state.total_Adult_Tax = 0;
      state.total_Adult_Price = 0;

      state.total_Child_Cost = 0;
      state.total_Child_Tax = 0;
      state.total_Child_Price = 0;

      state.searched_Text = "";
      state.searched_Adults_Count = 1;
      state.searched_Children_Count = 0;

      state.total_Tour_Cost = 0;
      state.total_Tax = 0;
      state.total_Price = 0;
    },
    addTour: (
      state,
      action: PayloadAction<{
        planInfo: TourPlanInformation;
        startDate: Date;
        adultCount: number;
        childCount: number;
        pickUp?: LocationInfo;
        dropOff?: LocationInfo;
      }>,
    ) => {
      const planInfo = action.payload.planInfo;
      const startDate = action.payload.startDate;
      const pickUp = action.payload.pickUp;
      const dropOff = action.payload.dropOff;
      const adultCount = action.payload.adultCount;
      const childCount = action.payload.childCount;
      let tourPkg = new PlanDetails();
      tourPkg.plan_Id = planInfo.tourPlan_Id;
      tourPkg.plan_Title = planInfo.tourPlan_Title;
      // tourPkg.plan_Info = planInfo.tourPlan_Info;
      // tourPkg.plan_Description = planInfo.tourPlan_Description;
      tourPkg.plan_Duration = planInfo.tourPlan_Duration;

      tourPkg.adult_Price_Map = planInfo.tourPlan_Adult_Price_Date_Map;
      tourPkg.child_Price_Map = planInfo.tourPlan_Child_Price_Map;
      tourPkg.plan_Per_Adult_Price = +planInfo.tourPlan_Per_Adult_Price;
      tourPkg.plan_Per_Child_Price = +planInfo.tourPlan_Per_Child_Price;
      tourPkg.plan_Max_Adult_Occupancy = planInfo.tourPlan_Max_Adult_Count;
      tourPkg.plan_Max_Child_Occupancy = planInfo.tourPlan_Max_Child_Count;
      tourPkg.plan_Tax_Percentage = planInfo.tourPlan_Tax_Percentage;
      tourPkg.adult_Count = adultCount;
      tourPkg.child_Count = childCount;
      tourPkg.plan_Start_Date = startDate;
      if (pickUp) {
        tourPkg.plan_Pickup_Info = pickUp;
      }
      if (dropOff) {
        tourPkg.plan_Dropoff_Info = dropOff;
      }
      tourPkg.calculatePlanPrice();

      let pIdx = -1;
      for (let i = 0; i < state.plans_List.length; i++) {
        const tp = state.plans_List[i];
        let { status } = tp.comparePlans(tourPkg);
        if (status) {
          pIdx = i;
          break;
        }
      }

      if (pIdx === -1) {
        state.plans_List = [...state.plans_List, tourPkg];

        state.total_Tour_Cost += tourPkg.total_Plan_Price;
        // state.total_Tax += tourPkg.total_Plan_Tax;
        state.total_Price += tourPkg.total_Price;

        state.total_Adults_Count += tourPkg.total_Adult_Count;
        state.total_Children_Count += tourPkg.total_Child_Count;
        state.total_Guests_Count += tourPkg.total_Guest_Count;
        state.total_Plan_Count += tourPkg.total_Plan_Count;

        state.total_Adult_Cost += tourPkg.total_Adult_Cost;
        // state.total_Adult_Tax += tourPkg.total_Adult_Tax;
        state.total_Adult_Price += tourPkg.total_Adult_Price;

        state.total_Child_Cost += tourPkg.total_Child_Cost;
        // state.total_Child_Tax += tourPkg.total_Child_Tax;
        state.total_Child_Price += tourPkg.total_Child_Price;

        const planMap = Object.assign({}, state.tour_Plan_Map);
        const planKey = tourPkg.plan_Id;

        planMap[planKey]
          ? (state.tour_Plan_Map[planKey] = {
              plan_Count: 1 + planMap[planKey].plan_Count,
              plan_Adult_Count:
                tourPkg.total_Adult_Count + planMap[planKey].plan_Adult_Count,
              plan_Child_Count:
                tourPkg.total_Child_Count + planMap[planKey].plan_Child_Count,
            })
          : (state.tour_Plan_Map[planKey] = {
              plan_Count: 1,
              plan_Adult_Count: tourPkg.total_Adult_Count,
              plan_Child_Count: tourPkg.total_Child_Count,
            });
      } else {
        const pkg = state.plans_List[pIdx];

        state.total_Tour_Cost -= pkg.total_Plan_Price;
        // state.total_Tax -= pkg.total_Plan_Tax;
        state.total_Price -= pkg.total_Price;

        state.total_Adults_Count -= pkg.total_Adult_Count;
        state.total_Children_Count -= pkg.total_Child_Count;
        state.total_Guests_Count -= pkg.total_Guest_Count;
        state.total_Plan_Count -= pkg.total_Plan_Count;

        state.total_Adult_Cost -= pkg.total_Adult_Cost;
        // state.total_Adult_Tax -= pkg.total_Adult_Tax;
        state.total_Adult_Price -= pkg.total_Adult_Price;

        state.total_Child_Cost -= pkg.total_Child_Cost;
        // state.total_Child_Tax -= pkg.total_Child_Tax;
        state.total_Child_Price -= pkg.total_Child_Price;

        state.plans_List.splice(pIdx, 1);

        pkg.planTotalPricing();

        state.total_Tour_Cost += pkg.total_Plan_Price;
        // state.total_Tax += pkg.total_Plan_Tax;
        state.total_Price += pkg.total_Price;

        state.total_Adults_Count += pkg.total_Adult_Count;
        state.total_Children_Count += pkg.total_Child_Count;
        state.total_Guests_Count += pkg.total_Guest_Count;
        state.total_Plan_Count += pkg.total_Plan_Count;

        state.total_Adult_Cost += pkg.total_Adult_Cost;
        // state.total_Adult_Tax += pkg.total_Adult_Tax;
        state.total_Adult_Price += pkg.total_Adult_Price;

        state.total_Child_Cost += pkg.total_Child_Cost;
        // state.total_Child_Tax += pkg.total_Child_Tax;
        state.total_Child_Price += pkg.total_Child_Price;

        state.plans_List.splice(pIdx, 0, pkg);

        const planKey = pkg.plan_Id;
        let planMap = Object.assign({}, state.tour_Plan_Map);

        if (planMap[planKey]) {
          state.tour_Plan_Map[pkg.plan_Id] = {
            plan_Count: planMap[planKey].plan_Count + 1,
            plan_Adult_Count:
              planMap[planKey].plan_Adult_Count + pkg.adult_Count,
            plan_Child_Count:
              planMap[planKey].plan_Child_Count + pkg.child_Count,
          };
        } else {
          state.tour_Plan_Map[pkg.plan_Id] = {
            plan_Count: pkg.total_Plan_Count,
            plan_Adult_Count: pkg.total_Adult_Count,
            plan_Child_Count: pkg.total_Child_Count,
          };
        }
      }
    },
    removeTour: (
      state,
      action: PayloadAction<{
        planIdx: number;
      }>,
    ) => {
      const pIdx = action.payload.planIdx;

      const pkg = state.plans_List[pIdx];
      state.total_Tour_Cost -= pkg.total_Plan_Price;
      // state.total_Tax -= pkg.total_Plan_Tax;
      state.total_Price -= pkg.total_Price;

      state.total_Adults_Count -= pkg.total_Adult_Count;
      state.total_Children_Count -= pkg.total_Child_Count;
      state.total_Guests_Count -= pkg.total_Guest_Count;
      state.total_Plan_Count -= pkg.total_Plan_Count;

      state.total_Adult_Cost -= pkg.total_Adult_Cost;
      // state.total_Adult_Tax -= pkg.total_Adult_Tax;
      state.total_Adult_Price -= pkg.total_Adult_Price;

      state.total_Child_Cost -= pkg.total_Child_Cost;
      // state.total_Child_Tax -= pkg.total_Child_Tax;
      state.total_Child_Price -= pkg.total_Child_Price;

      state.plans_List.splice(pIdx, 1);

      const planKey = pkg.plan_Id;
      let planMap = Object.assign({}, state.tour_Plan_Map);
      state.tour_Plan_Map[planKey] = {
        plan_Count: planMap[planKey].plan_Count - pkg.total_Plan_Count,
        plan_Adult_Count:
          planMap[planKey].plan_Adult_Count - pkg.total_Adult_Count,
        plan_Child_Count:
          planMap[planKey].plan_Child_Count - pkg.total_Child_Count,
      };
      planMap = Object.assign({}, state.tour_Plan_Map);

      if (planMap[planKey].plan_Count === 0) {
        delete state.tour_Plan_Map[planKey];
      } else {
        state.tour_Plan_Map = planMap;
      }
    },
    removeSamePlanType: (
      state,
      action: PayloadAction<{
        planIdx: number;
      }>,
    ) => {
      const pIdx = action.payload.planIdx;
      const pkg = state.plans_List[pIdx];

      state.total_Tour_Cost -= pkg.plan_Price;
      // state.total_Tax -= pkg.plan_Tax;
      state.total_Price -= pkg.plan_Total_Price;

      state.total_Adults_Count -= pkg.adult_Count;
      state.total_Children_Count -= pkg.child_Count;
      state.total_Guests_Count -= pkg.adult_Count + pkg.child_Count;
      state.total_Plan_Count -= 1;

      state.total_Adult_Cost -= pkg.plan_Adult_Price;
      // state.total_Adult_Tax -= pkg.plan_Adult_Tax;
      state.total_Adult_Price -= pkg.plan_Adult_Total_Price;

      state.total_Child_Cost -= pkg.plan_Child_Price;
      // state.total_Child_Tax -= pkg.plan_Child_Tax;
      state.total_Child_Price -= pkg.plan_Child_Total_Price;

      state.plans_List.splice(pIdx, 1);

      if (pkg.total_Plan_Count > 1) {
        pkg.total_Plan_Price -= pkg.plan_Price;
        // pkg.total_Plan_Tax -= pkg.plan_Tax;
        pkg.plan_Total_Price -= pkg.plan_Total_Price;

        pkg.total_Adult_Cost -= pkg.plan_Adult_Price;
        // pkg.total_Adult_Tax -= pkg.plan_Adult_Tax;
        pkg.total_Adult_Price -= pkg.plan_Adult_Total_Price;

        pkg.total_Child_Cost -= pkg.plan_Child_Price;
        // pkg.total_Child_Tax -= pkg.plan_Child_Tax;
        pkg.total_Child_Price -= pkg.plan_Child_Total_Price;

        pkg.total_Adult_Count -= pkg.adult_Count;
        pkg.total_Child_Count -= pkg.child_Count;
        pkg.total_Guest_Count -= pkg.adult_Count + pkg.child_Count;
        pkg.total_Plan_Count -= 1;

        state.plans_List.splice(pIdx, 0, pkg);
      }

      const planKey = pkg.plan_Id;
      let planMap = Object.assign({}, state.tour_Plan_Map);
      state.tour_Plan_Map[planKey] = {
        plan_Count: planMap[planKey].plan_Count - 1,
        plan_Adult_Count: planMap[planKey].plan_Adult_Count - pkg.adult_Count,
        plan_Child_Count: planMap[planKey].plan_Child_Count - pkg.child_Count,
      };
      planMap = Object.assign({}, state.tour_Plan_Map);

      if (planMap[planKey].plan_Count === 0) {
        delete state.tour_Plan_Map[planKey];
      } else {
        state.tour_Plan_Map = planMap;
      }
    },
    updateCurrencyInfo: (
      state,
      action: PayloadAction<{
        currencyCode: string;
        currencySymbol: string;
        currencyValue: number;
      }>,
    ) => {
      state.tour_Currency_Code = action.payload.currencyCode;
      state.tour_Currency_Symbol = action.payload.currencySymbol;
      state.tour_Currency_Value = action.payload.currencyValue;
    },
    updateTourSearchInfo: (
      state,
      action: PayloadAction<{
        searchedDate: Date;
        searchedAdultCount: number;
        searchedChildCount: number;
      }>,
    ) => {
      state.searched_Date = action.payload.searchedDate;
      // state.searched_Adults_Count = action.payload.searchedAdultCount;
      state.searched_Children_Count = action.payload.searchedChildCount;
    },
  },
});

// Action creators are generated for each case render function
export const {
  setTourBookingCardLoading,
  updateCurrencyInfo,
  updateTourDetails,
  updateTourDuration,
  updateTourSearchInfo,
  resetTourBookingInfo,
  addTour,
  removeTour,
  removeSamePlanType,
} = tourBookingSlice.actions;

// Selectors
export const selectTourBookingInfo = (state: RootState) => state.tourBooking;

export const selectPlansList = (state: RootState) =>
  state.tourBooking.plans_List;
export const selectTourSlugName = (state: RootState) =>
  state.tourBooking.tour_Slug_Name;
export const selectTourImageUrl = (state: RootState) =>
  state.tourBooking.tour_Image_Url;
export const selectTourDuration = (state: RootState) =>
  state.tourBooking.tour_Duration;
export const selectTourNumOfDays = (state: RootState) =>
  state.tourBooking.tour_Number_Of_Days;
export const selectTourNumOfNights = (state: RootState) =>
  state.tourBooking.tour_Number_Of_Nights;
export const selectTourType = (state: RootState) => state.tourBooking.tour_Type;

export const selectTotalTourCost = (state: RootState) =>
  state.tourBooking.total_Tour_Cost;
export const selectTotalTourTax = (state: RootState) =>
  state.tourBooking.total_Tax;
export const selectTotalTourPrice = (state: RootState) =>
  state.tourBooking.total_Price;

export const selectTourStartDate = (state: RootState) =>
  state.tourBooking.tour_Start_Date;
export const selectTotalPlansCount = (state: RootState) =>
  state.tourBooking.total_Plan_Count;
export const selectTotalGuestCount = (state: RootState) =>
  state.tourBooking.total_Guests_Count;
export const selectTotalAduldCount = (state: RootState) =>
  state.tourBooking.total_Adults_Count;
export const selectTotalChildCount = (state: RootState) =>
  state.tourBooking.total_Children_Count;
export const selectTourPlanMapping = (state: RootState) =>
  state.tourBooking.tour_Plan_Map;

export const selectSearchedDate = (state: RootState) =>
  state.tourBooking.searched_Date;
export const selectSearchedAdultCount = (state: RootState) =>
  state.tourBooking.searched_Adults_Count;
export const selectSearchedChildCount = (state: RootState) =>
  state.tourBooking.searched_Children_Count;

export const selectCurrencyCode = (state: RootState) =>
  state.tourBooking.tour_Currency_Code;
export const selectCurrencySymbol = (state: RootState) =>
  state.tourBooking.tour_Currency_Symbol;
export const selectCurrencyValue = (state: RootState) =>
  state.tourBooking.tour_Currency_Value;

export const selectTourBookingCardLoading = (state: RootState) =>
  state.tourBooking.booking_Card_Loading;

export default tourBookingSlice.reducer;
