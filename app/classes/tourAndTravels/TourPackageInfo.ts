import { TourPlanInformation, WeekDay, WeekDayInfo } from "./TourPlanInformation";

export class LocationInfo {
  available: boolean = false;
  time: string = "";
  location: string = "";
  location_Url: string = "";

  constructor(
    available: boolean = false,
    time: string = "",
    location: string = "",
    location_Url: string = "",
  ) {
    this.available = available;
    this.time = time;
    this.location = location;
    this.location_Url = location_Url;
  }
}

export class TourItenary {
  order: number = 0;
  title: string = "";
  description: string = "";
  image_Url: string = "";
  logo_Url: string = "";
  admission_Availability: boolean = false;
}
class CostBreakup {
  base_Price: number = 0;
  total_Price: number = 0;
  tax_Price: number = 0;
  tax_Percentage: number = 0;
}

class RefundPolicy {
  description: string = "";
  policy_List: string[] = [];
}

export class TourImageDetails {
  image_Alt: string = "";
  image_Description: string = "";
  image_Id: string = "";
  image_order: number = 0;
  image_Url: string = "";
}

export class ActivityInfo {
  order: number = 0;
  title: string = "";
  description: string = "";
  image_Url: string = "";
  logo_Url: string = "";
}

export class TourPoint {
  address: string = "";
  map_Url: string = "";
  info: string = "";
}

export class TourOperator {
  id: string = "";
  operator_Address: string = "";
  operator_City: string = "";
  operator_Name: string = "";
  operator_Phone: string = "";
  operator_State: string = "";
  operator_Website_Url: string = "";
}

export class TourPackageInfo {
  tour_Name: string = "";
  tour_Info: string = "";
  tour_Description: string = "";
  tour_Image_Url: string = "";
  tour_Status = {
    tour_Operational_Status: false,
    tour_Cab_Included: false,
    tour_Hotel_Included: false,
  };
  tour_Id: string = "";
  tour_Slug_Name: string = "";
  tour_City_Covered: string[] = [];
  tour_Cost_Breakup: CostBreakup = {
    base_Price: 0,
    total_Price: 0,
    tax_Price: 0,
    tax_Percentage: 0,
  };
  tour_Iframe_Url: string = "";
  tour_Map_Url: string = "";
  tour_Contact_Email_Id: string = "";
  tour_Contact_Phone_Number: string = "";
  tour_Activity_Info: ActivityInfo[] = [];
  tour_Authorisation: boolean = true;
  tour_Action_Center_Available: boolean = true;
  tour_Website_Available: boolean = true;
  tour_Relative_Order: number = 0;
  tour_Duration: number = 0;
  tour_Duration_Info: any = { coverage: false, no_of_days: 0, no_of_nights: 0 };
  tour_Meeting_Point: TourPoint = { ...new TourPoint() };
  tour_Ending_Point: TourPoint = { ...new TourPoint() };
  tour_No_Of_Days: number = 0;
  tour_No_Of_Nights: number = 0;
  tour_Payment_Option = {
    prepaid_Payment: true,
    postpaid_Payment: false,
    partial_Payment: false,
  };
  tour_Partial_Percentage: number = 15;
  importantInformation: any[] = [];
  tour_Type: string = "";
  tour_Review_Count: number = 0;
  tour_Rating: number = 0;
  tour_Rating_Distribution = {
    "3_stars": 0,
    "4_stars": 0,
    "2_stars": 0,
    "1_stars": 0,
    "5_stars": 0,
  };
  tour_Adult_Price_Map: any;
  tour_Availability: boolean = false;
  tour_General_Policy = { description: "", policy_List: [] };
  tour_Cancellation_Policy = { description: "", policy_List: [] };
  tour_Refund_Policy = { description: "", policy_List: [] };
  tour_Reviews_List: any[] = [];
  tour_Highlights_List: string[] = [];
  tour_Highlights_Inclusion_List: string[] = [];
  tour_Highlights_Exclusion_List: string[] = [];
  tour_Must_Know_Features_List: string[] = [];
  tour_Activity_Slug_List: any[] = [];
  tour_Point_Of_Interest_Slug_List: string[] = [];
  tour_Experience_Itinerary_List: TourItenary[] = [];
  tour_Timing_List: any[] = [];
  tour_Pricing_Options: any[] = [];
  tour_Operator_Info: TourOperator = { ...new TourOperator() };
  tour_Plans_List: TourPlanInformation[] = [];
  tour_More_Info: string = "";
  tour_Meta_Object_Details: any = {};
  tour_Plan_Count: number = 0;
  tour_Operator_Slug: string = "";

  tour_Week_Opening_Info: Record<WeekDay, WeekDayInfo> = {
    Mon: {
      is_Open: true,
      info: "Open on Monday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Tues: {
      is_Open: true,
      info: "Open on Tuesday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Weds: {
      is_Open: true,
      info: "Open on Wednesday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Thur: {
      is_Open: true,
      info: "Open on Thursday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Fri: {
      is_Open: true,
      info: "Open on Friday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Sat: {
      is_Open: true,
      info: "Open on Saturday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
    Sun: {
      is_Open: true,
      info: "Open on Sunday between 9 AM to 6 PM",
      opening_Time: "09:00",
      closing_Time: "18:00",
      timing_Slot_List: [],
    },
  };
}
