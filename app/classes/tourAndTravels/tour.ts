export class TourPackageInfo {
  tour_Name = "";
  tour_Info = "";
  tour_Description = "";
  tour_Image_Url = "";
  tour_Status = {
    tour_Operational_Status: false,
    tour_Cab_Included: false,
    tour_Hotel_Included: false,
  };
  tour_Id = "";
  tour_Slug_Name = "";
  tour_City_Covered = [];
  tour_Cost_Breakup = {
    base_Price: 0,
    total_Price: 0,
    tax_Price: 0,
    tax_Percentage: 0,
  };
  tour_Iframe_Url = "";
  tour_Map_Url = "";
  tour_Contact_Email_Id = "";
  tour_Contact_Phone_Number = "";
  tour_Activity_Info = [
    {
      order: 0,
      title: "",
      description: "",
      image_Url: "",
      logo_Url: "",
    },
  ]; // to be updated
  tour_Operator_Info = "";
  tour_Duration = 0;
  tour_Duration_Info = {
    coverage: false,
    no_of_days: 0,
    no_of_nights: 0,
  };
  tour_No_Of_Days = 0;
  tour_No_Of_Nights = 0;
  tour_Payment_Option = {
    prepaid_Payment: true,
    postpaid_Payment: true,
    partial_Payment: true,
  };
  tour_Type = "";
  tour_Review_Count = 0;
  tour_Rating_Distribution = {
    "3_stars": 0,
    "4_stars": 0,
    "2_stars": 0,
    "1_stars": 0,
    "5_stars": 0,
  };

  tour_General_Policy = { description: "", policy_List: [] };
  tour_Cancellation_Policy = { description: "", policy_List: [] };
  tour_Refund_Policy = { description: "", policy_List: [] };
  tour_Reviews_List = [];
  tour_Highlights_List = [];
  tour_Highlights_Inclusion_List = [];
  tour_Activity_Slug_List = [];
  tour_Point_Of_Interest_Slug_List = [];
  tour_Experience_Itinerary_List = [
    {
      order: 0,
      title: "",
      description: "",
      image_Url: "",
      logo_Url: "",
    },
  ];
  tour_Timing_List = [];
  tour_Image_Url_List = [];
}
