export type WeekDay =
  | 'Mon'
  | 'Tues'
  | 'Weds'
  | 'Thur'
  | 'Fri'
  | 'Sat'
  | 'Sun';

export interface WeekDayInfo {
  is_Open: boolean;
  info: string;
  opening_Time: string;
  closing_Time: string;
  timing_Slot_List: string[];
}

export class TourPlanInformation {
  tourPlan_Available: boolean = true;
  tourPlan_Adult_Price_Map: any = {};
  tourPlan_Adult_Price_Date_Map: any = {};
  tourPlan_Child_Price_Map: any = {};
  tourPlan_Child_Price_Date_Map: any = {};
  tourPlan_Id: any = "";
  tourPlan_Title: string = "";
  tourPlan_Info: string = "";
  tourPlan_Description: string = "";
  tourPlan_Image_List: any[] = [];
  tourPlan_Count: number = 3;
  tourPlan_Inventory_Count: number = 0;
  tourPlan_Min_Adult_Count: number = 1;
  tourPlan_Max_Adult_Count: number = 9;
  tourPlan_Max_Child_Count: number = 5;
  tourPlan_Per_Adult_Price: number = 10000;
  tourPlan_Per_Child_Price: number = 8000;
  tourPlan_Starting_Price: number = 0;
  tourPlan_Tax_Percentage: number = 5;

  tourPlan_Pickup_Included: boolean = false;
  tourPlan_Pickup_Timing_List: string[] = [];
  tourPlan_Pickup_Location_List: any[] = [];

  tourPlan_Dropoff_Included: boolean = false;
  tourPlan_Dropoff_Timing_List: string[] = [];
  tourPlan_Dropoff_Location_List: any[] = [];

  tourPlan_Duration: number = 0;
  tourPlan_Week_Opening_Info: Record<WeekDay, WeekDayInfo> = {
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
