// import { manipulateDateByDays } from "@/src/utils";
import { manipulateDateByDays } from "@/app/lib/utils/manipulateDateByDays/manipulateDateByDays";
import { LocationInfo } from "../tourAndTravels/TourPackageInfo";

export class PlanDetails {
  plan_Id: number = 0;
  plan_Title: string = "";
  plan_Info: string = "";
  plan_Description: string = "";
  plan_Vendor_Type: string = "";
  plan_Inventory_Id: string = "";

  // Pricing details of tour plan saved in DB
  adult_Price_Map: any = {};
  child_Price_Map: any = {};
  student_Price_Map: any = {};
  senior_Price_Map: any = {};

  plan_Per_Adult_Price: number = 1000;
  plan_Per_Child_Price: number = 800;
  plan_Per_Student_Price: number = 500;
  plan_Per_Senior_Price: number = 1000;

  plan_Min_Adult_Occupancy: number = 1;
  plan_Max_Adult_Occupancy: number = 9;
  plan_Min_Child_Occupancy: number = 0;
  plan_Max_Child_Occupancy: number = 5;
  plan_Min_Student_Occupancy: number = 0;
  plan_Max_Student_Occupancy: number = 2;
  plan_Min_Senior_Occupancy: number = 0;
  plan_Max_Senior_Occupancy: number = 2;

  plan_Tax_Percentage: number = 5;

  plan_Pickup_Info: LocationInfo = {
    available: false,
    time: "",
    location: "",
    location_Url: "",
  };
  plan_Dropoff_Info: LocationInfo = {
    available: false,
    time: "",
    location: "",
    location_Url: "",
  };

  // Plan Duration Information saved in DB
  plan_Start_Date: Date = new Date();
  plan_End_Date: Date = manipulateDateByDays(new Date(), 1);
  plan_Duration: number = 0;
  plan_Days: number = 1;
  plan_Nights: number = 0;

  // Pricing Details for Adult per selected Plan
  plan_Adult_Price: number = 0;
  plan_Adult_Tax: number = 0;
  plan_Adult_Total_Price: number = 0;
  adult_Count: number = 0;

  // Pricing Details for Children per selected Plan
  plan_Child_Price: number = 0;
  plan_Child_Tax: number = 0;
  plan_Child_Total_Price: number = 0;
  child_Count: number = 0;

  // Pricing Details for Student per selected Plan
  plan_Student_Price: number = 0;
  plan_Student_Tax: number = 0;
  plan_Student_Total_Price: number = 0;
  student_Count: number = 0;

  // Pricing Details for Senior per selected Plan
  plan_Senior_Price: number = 0;
  plan_Senior_Tax: number = 0;
  plan_Senior_Total_Price: number = 0;
  senior_Count: number = 0;

  // Pricing Details for Discounts per selected Plan
  plan_Discount_Type: string = "percentage";
  plan_Discount_Percentage: number = 0;
  plan_Discount_Value: number = 0;
  plan_Discount_Max_Value: number = 0;

  // Plan Pricing Information per selected Plan
  plan_Price: number = 0;
  plan_Tax: number = 0;
  plan_Total_Price: number = 0;
  plan_Price_Break_Up: any[] = [];

  // Total Plan Pricing Information
  total_Plan_Price: number = 0;
  total_Plan_Tax: number = 0;
  total_Price: number = 0;

  total_Adult_Cost: number = 0;
  total_Adult_Tax: number = 0;
  total_Adult_Price: number = 0;
  total_Adult_Count: number = 0;

  total_Child_Cost: number = 0;
  total_Child_Tax: number = 0;
  total_Child_Price: number = 0;
  total_Child_Count: number = 0;

  total_Student_Cost: number = 0;
  total_Student_Tax: number = 0;
  total_Student_Price: number = 0;
  total_Student_Count: number = 0;

  total_Senior_Cost: number = 0;
  total_Senior_Tax: number = 0;
  total_Senior_Price: number = 0;
  total_Senior_Count: number = 0;

  // dynamic type properties
  [key: string]: any;


  total_Plan_Count: number = 0;
  total_Guest_Count: number = 0;

  calculatePlanPrice() {
    let currentDate = new Date(
      this.plan_Start_Date.getFullYear(),
      this.plan_Start_Date.getMonth(),
      this.plan_Start_Date.getDate(),
    );

    // Adult Price Info
    this.plan_Adult_Price = this.adult_Price_Map[this.adult_Count]
      ? +this.adult_Price_Map[this.adult_Count]
      : +this.plan_Per_Adult_Price * this.adult_Count;
    // this.plan_Adult_Tax = Math.ceil(
    //   Number(
    //     (this.plan_Adult_Price * +this.plan_Tax_Percentage * 0.01).toFixed(2),
    //   ),
    // );
    this.plan_Adult_Total_Price = Math.ceil(
      Number((this.plan_Adult_Price + this.plan_Adult_Tax).toFixed(2)),
    );

    // Child Price Info
    this.plan_Child_Price = this.child_Price_Map[this.child_Count]
      ? +this.child_Price_Map[this.child_Count]
      : // : +this.plan_Per_Child_Price * this.child_Count;
        +this.adult_Price_Map[this.child_Count]
        ? +this.adult_Price_Map[this.child_Count]
        : +this.plan_Per_Child_Price * this.child_Count;
    // this.plan_Child_Tax = Math.ceil(
    //   Number(
    //     (this.plan_Child_Price * +this.plan_Tax_Percentage * 0.01).toFixed(2),
    //   ),
    // );

    // Student Price Info
    this.plan_Student_Price = this.student_Price_Map[this.student_Count]
      ? +this.student_Price_Map[this.student_Count]
      : +this.plan_Per_Student_Price * this.student_Count;
    // this.plan_Student_Tax = Math.ceil(
    //   Number(
    //     (this.plan_Student_Price * +this.plan_Tax_Percentage * 0.01).toFixed(2),
    //   ),
    // );

    // Senior Price Info
    this.plan_Senior_Price = this.senior_Price_Map[this.senior_Count]
      ? +this.senior_Price_Map[this.senior_Count]
      : +this.plan_Per_Senior_Price * this.senior_Count;
    // this.plan_Senior_Tax = Math.ceil(
    //   Number(
    //     (this.plan_Senior_Price * +this.plan_Tax_Percentage * 0.01).toFixed(2),
    //   ),
    // );

    this.plan_Child_Total_Price = Math.ceil(
      Number((this.plan_Child_Price + this.plan_Child_Tax).toFixed(2)),
    );

    this.plan_Student_Total_Price = Math.ceil(
      Number((this.plan_Student_Price + this.plan_Student_Tax).toFixed(2)),
    );

    this.plan_Senior_Total_Price = Math.ceil(
      Number((this.plan_Senior_Price + this.plan_Senior_Tax).toFixed(2)),
    );

    // Plan Price Info
    this.plan_Price = Math.ceil(
      Number(
        (
          this.plan_Adult_Price +
          this.plan_Child_Price +
          this.plan_Student_Price +
          this.plan_Senior_Price
        ).toFixed(2),
      ),
    );
    // this.plan_Tax = Math.ceil(
    //   Number((this.plan_Adult_Tax + this.plan_Child_Tax).toFixed(2)),
    // );
    this.plan_Total_Price = Math.ceil(
      Number(this.plan_Price.toFixed(2)) + Number(this.plan_Tax.toFixed(2)),
    );

    this.planTotalPricing();
  }

  planTotalPricing() {
    this.total_Plan_Price += this.plan_Price;
    this.total_Plan_Tax += this.plan_Tax;
    this.total_Price += this.plan_Total_Price;

    this.total_Adult_Cost += this.plan_Adult_Price;
    this.total_Adult_Tax += this.plan_Adult_Tax;
    this.total_Adult_Price += this.plan_Adult_Total_Price;
    this.total_Adult_Count += this.adult_Count;

    this.total_Child_Cost += this.plan_Child_Price;
    this.total_Child_Tax += this.plan_Child_Tax;
    this.total_Child_Price += this.plan_Child_Total_Price;
    this.total_Child_Count += this.child_Count;

    this.total_Student_Cost += this.plan_Student_Price;
    this.total_Student_Tax += this.plan_Student_Tax;
    this.total_Student_Price += this.plan_Student_Total_Price;
    this.total_Student_Count += this.student_Count;

    this.total_Senior_Cost += this.plan_Senior_Price;
    this.total_Senior_Tax += this.plan_Senior_Tax;
    this.total_Senior_Price += this.plan_Senior_Total_Price;
    this.total_Senior_Count += this.senior_Count;

    this.total_Guest_Count +=
      this.adult_Count +
      this.child_Count +
      this.student_Count +
      this.senior_Count;
    this.total_Plan_Count++;
  }

  comparePlans(planInfo: PlanDetails) {
    if (
      this.plan_Id === planInfo.plan_Id &&
      this.plan_Adult_Price === planInfo.plan_Adult_Price &&
      this.plan_Adult_Tax === planInfo.plan_Adult_Tax &&
      this.plan_Adult_Total_Price === planInfo.plan_Adult_Total_Price &&
      this.adult_Count === planInfo.adult_Count &&
      this.plan_Child_Price === planInfo.plan_Child_Price &&
      this.plan_Child_Tax === planInfo.plan_Child_Tax &&
      this.plan_Child_Total_Price === planInfo.plan_Child_Total_Price &&
      this.child_Count === planInfo.child_Count &&
      this.plan_Discount_Type === planInfo.plan_Discount_Type &&
      this.plan_Discount_Percentage === planInfo.plan_Discount_Percentage &&
      this.plan_Discount_Value === planInfo.plan_Discount_Value &&
      this.plan_Discount_Max_Value === planInfo.plan_Discount_Max_Value
    ) {
      return { status: true };
    } else {
      return { status: false };
    }
  }
}

export interface PlanARI {
  id: number;
  slug: string;
  plan_id: number;
  date: string; // format: YYYY-MM-DD
  availability: boolean;
  start_time: string; // format: HH:mm:ss
  end_time: string; // format: HH:mm:ss
  inventory_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PlanInfo {
  id: number;
  slug: string;
  name: string;
  type: string; // e.g., "senior", "standard", etc.
}

export interface ARIInfo {
  id: number;
  slug: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  plan_info: PlanInfo;
}

export interface PackageInfo {
  duration: string;
  exclusions: string[];
  inclusions: string[];
  max_group_size: number;
}

export interface ActivityPlanARIPriceInfo {
  id: number;
  ari_id: number;
  currency: string;

  adult_male: number;
  adult_female: number;
  child_male: number;
  child_female: number;
  senior_male: number;
  senior_female: number;

  package: PackageInfo;

  created_at: string; // ISO string
  updated_at: string;

  ari_info: ARIInfo;
  activity_plan_slug: string;
  availability: boolean;
}

export interface ActivityGuestPriceMap {
  inventory_id: string;
  count: number;
  individual_price: number;
  type: string;
  headoutSellingPrice: number;
  availability: string;
  name: string;
  remaining: number;
  total_price?: number;
  price: number;
}
