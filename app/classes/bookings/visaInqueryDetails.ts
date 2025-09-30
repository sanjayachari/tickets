export class VisaInqueryDetails {
  visa_Query_Time: Date = new Date();
  visa_Query_Confirmation: boolean = false;
  visa_Request_Id: string = "";
  visa_Duration_Days: string = "";
  visa_Request_Creation_Time: string = "";
  visa_Request_Status: boolean = true;
  visa_User_Contact_Number: string = "";
  visa_User_Email_Id: string = "";
  visa_User_First_Name: string = "";
  visa_User_Last_Name: string = "";
  visa_User_Middle_Name: string = "";
  visa_User_Nationality: string = "";
  visa_User_Passport_Number: string = "";
  visa_User_Query: string = "";
  visa_User_Visiting_Date: string = "";
  payment_Gateway: string = "Razorpay";
  payment_Id: string = "";
  order_Id: string = "";
  signature_Id: string = "";
  visa_Cancellation_Status: boolean = false;
  visa_Cancellation_Reason: string = "";
  visa_Cancellation_Amount: number = 0;
  visa_Cancellation_Refund_Status: boolean = false;
  visa_Cancellation_Refund_Amount: number = 0;
  visa_Cancellation_Refund_Reason: string = "";

  paying_Amount: number = 200;
  amount_Paid: number = 0;
  payment_Made: boolean = false;
  payment_Method: string = "";
}
