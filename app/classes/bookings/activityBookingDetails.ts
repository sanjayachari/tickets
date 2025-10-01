import { WEBSITE_BASE_URL } from "@/app/lib/helper";
import { ActivityGuestPriceMap, PlanDetails } from "./planDetails";

export type GuestDetailInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  isPrimary: boolean;
  country: string;
  countryCode: string;
};
export interface CountryInfo {
  name: string;
  code: string;
  dialCode: string;
  flag?: string;
}
export type GuestDetailsMap = {
  isPrimary: boolean;
  country?: CountryInfo;
  [fieldId: string]: any;
};

export class ActivityBookingDetails {
  plans_Ari_details: any = [];
  plan_price: any = [];
  plans_List: PlanDetails[] = [];
  booking_Type: string = "activity";
  booking_Confirmation: boolean = false;
  activity_selected_time_slot: any = "";
  activity_Type: string = "";
  activity_Name: string = "";
  activity_Vendor_Type: string = "headout";
  activity_Vendor_Id: number = 0;
  activity_Input_Fields: any = [];
  activity_Slug_Name: string = "";
  activity_Partner_Reference_Id: string = "staybookHeadout4715240340";

  activity_Rating: number = 0;
  activity_Image_Url: string = "";
  activity_Operator_Email_Id: string = "";
  activity_Operator_Phone_Number: string = "9000000000";
  activity_Start_Date: any = new Date();
  activity_Rate: number = 10;
  min_Purchase_Count: number = 1;
  max_Purchase_Count: number = 10
  total_Cost: number = 0;
  total_Tax: number = 0;
  total_Price: number = 0;
  activity_General_Policy: string = "";
  activity_Cancellation_Policy: string = "";
  activity_Refund_Policy: string = "";

  payment_Gateway: string = "None";
  payment_Type: string = "Pay at Activity";
  booking_Created_From: string = WEBSITE_BASE_URL;
  booking_Time: any = new Date();
  booking_Review_Status = false;
  booking_guest_price_map: ActivityGuestPriceMap[] = [];
  user_Name: string = "";
  user_First_Name: string = "";
  user_Last_Name: string = "";
  user_Email_Id: string = "";
  user_Phone_Number: string = "";
  user_Instructions: string = "";
  user_Address: String = "";
  user_Pincode: String = "";
  user_City: String = "";
  user_State: String = "";
  user_Country: string = "IN";
  guest_Details_List: GuestDetailsMap[] = [];

  booking_Id: string = "";
  order_Id: string = "";
  user_Unique_Id: string = "";

  activity_Payment_Option: any = {
    prepaid_Payment: true,
    partial_Payment: false,
    postpaid_Payment: false,
  };
  payment_Made: boolean = false;

  paying_Amount: number = 0;
  amount_Paid: number = 0;
  booking_Confirmation_Url: string = "";
  booking_Redirect_Url: string = "";

  payment_Method_Type: string = "None";
  razorpay_Payment_Id: string = "";
  razorpay_Order_Id: string = "";
  razorpay_Signature_Id: string = "";

  activity_Currency_Code: string = "INR";
  activity_Currency_Symbol: string = "₹";
  activity_Currency_Value: number = 1;

  booking_Status: boolean = true;
  tour_Handling_Charges: number = 0;
  receipt_Id: string = "";
  activity_Handling_Charges: number = 0;
  activity_Pickup_Address: string = "";
  visitor_Details: any[] = [];
  activity_Review_Count: number = 0;
  activity_Info: string = "";
  booking_Confirmation_Data: any = {};

  activity_City_Covered: string[] = [];
  user_Staybook_Coins: number = 0;
  total_Adult_Count: number = 0;
  total_Senior_Count: number = 0;
  total_Student_Count: number = 0;
  total_Child_Count: number = 0;
  total_Plans_Count: number = 1;

  total_Adult_Cost: number = 0;
  total_Senior_Cost: number = 0;
  total_Student_Cost: number = 0;
  total_Child_Cost: number = 0;

  booking_Cancelled_Status: boolean = false;
  booking_Checkin_Status: boolean = false;
  booking_Coins: number = 0;
  booking_Noshow_Status: boolean = false;
  booking_epoc_time?: any = Date.now();

  generateBookingConfirmationUrl() {
    return `https://${WEBSITE_BASE_URL}/bookingInformation/activities/${this.booking_Id}?booking_status=${`Booking Successful`}&activity_Id=${this.activity_Slug_Name}&activity_Name=${this.activity_Name}&user_Name=${this.user_Name}&user_Email=${this.user_Email_Id}&user_Phone=${this.user_Phone_Number}&booking_receipt=${this.receipt_Id}`;
  }

  generateBookingRedirectUrl() {
    return `/bookingInformation/activities/${this.booking_Id}?booking_status=${`Booking Successful`}&activity_Id=${this.activity_Slug_Name}&activity_Name=${this.activity_Name}&user_Name=${this.user_Name}&user_Email=${this.user_Email_Id}&user_Phone=${this.user_Phone_Number}&booking_receipt=${this.receipt_Id}`;
  }
}
