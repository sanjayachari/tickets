// import { WEBSITE_BASE_URL } from "@/lib/helper";
import { WEBSITE_BASE_URL } from "@/app/lib/helper";
import { PlanDetails } from "./planDetails";

export class TourBookingDetails {
  plans_List: PlanDetails[] = [];
  booking_Type: string = "tour";
  booking_Confirmation: boolean = false;

  tour_Type: string = "";
  tour_Name: string = "";
  tour_Slug_Name: string = "";
  tour_Info: string = "";
  tour_City_Covered: string[] = [];
  tour_Rating: number = 0;
  tour_Image_Url: string = "";
  tour_Operator_Email_Id: string = "";
  tour_Operator_Phone_Number: string = "";
  tour_Start_Date: any = new Date();
  tour_Duration: number = 0;
  tour_Days: number = 1;
  tour_Nights: number = 0;
  total_Tour_Cost: number = 0;
  total_Tax: number = 0;
  total_Price: number = 0;

  tour_General_Policy: string = "";
  tour_Cancellation_Policy: string = "";
  tour_Refund_Policy: string = "";

  tour_Pickup_Address: string = "";
  tour_Drop_Location: string = "";

  tour_Handling_Charges: number = 0;
  payment_Gateway: string = "None";
  payment_Type: string = "Pay at Tour";
  booking_Created_From: string = WEBSITE_BASE_URL;
  booking_Time: any = new Date();
  booking_Review_Status = false;
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

  booking_Id: string = "";
  user_Unique_Id: string = "";
  user_Staybook_Coins: number = 0;

  tour_Payment_Option: any = {
    prepaid_Payment: true,
    partial_Payment: false,
    postpaid_Payment: false,
  };
  payment_Made: boolean = false;
  paying_Amount: number = 0;
  amount_Paid: number = 0;
  tour_Partial_Payment_Percentage: number = 15;
  booking_Confirmation_Url: string = "";
  booking_Redirect_Url: string = "";

  payment_Method_Type: string = "None";
  payment_Testing_Info: string = "";
  razorpay_Payment_Id: string = "";
  razorpay_Order_Id: string = "";
  razorpay_Signature_Id: string = "";
  receipt_Id: string = "";

  total_Adult_Count: number = 1;
  total_Child_Count: number = 0;
  total_Guest_Count: number = 1;
  total_Plans_Count: number = 1;

  tour_Currency_Code: string = "INR";
  tour_Currency_Symbol: string = "₹";
  tour_Currency_Value: number = 0;

  booking_Cancelled_Status: boolean = false;
  booking_Checkin_Status: boolean = false;
  booking_Coins: number = 0;
  booking_Noshow_Status: boolean = false;
  booking_Status: boolean = true;

  visitor_Details: any[] = [];
}
