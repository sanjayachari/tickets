import { manipulateDateByDays } from "@/app/lib/utils/manipulateDateByDays/manipulateDateByDays";
// import { AgeInfo } from "../hotels/hotelRoomInfo";

export class RoomDetails {
  room_Id: string = "";
  room_Name: string = "";
  room_Info: string = "";
  plan_Id: string = "";
  plan_Name: string = "";
  plan_Info: string = "";

  room_Image_Url: string = "";
  room_Guest_Occupancy: number = 2;
  room_Guest_Count: number = 2;
  room_Guest_Price: number = 0;
  room_Guest_Price_Percentage: number = 10;
  room_Min_Guest_Occupancy: number = 0;
  room_Max_Guest_Occupancy: number = 2;

  room_Age_Bracket_List: any[] = [];
  // room_Age_Pricing_List: AgeInfo[] = [];
  room_Children_Age_Price_Info: any[] = [];
  room_Children_Occupancy: number = 0;
  room_Children_As_Guest_Count: number = 0;
  room_Children_Count: number = 0;
  room_Children_Price: number = 0;
  room_Min_Children_Occupancy: number = 0;
  room_Max_Children_Occupancy: number = 2;

  plan_Start_Date: Date = new Date();
  plan_End_Date: Date = manipulateDateByDays(new Date(), 1);

  plan_Room_Price: number = 0;
  plan_Tax: number = 0;
  plan_Price: number = 0;
  plan_Adult_Price: number = 0;
  plan_Child_Price: number = 0;
  priceBreakUp: any[] = [];

  total_Room_Plan_Price: number = 0;
  total_Plan_Tax: number = 0;
  total_Plan_Price: number = 0;
  total_Adult_Price: number = 0;
  total_Child_Price: number = 0;

  total_Price: number = 0;

  room_Count: number = 1;
  num_Guests: number = 0;
  num_Children: number = 0;

  // calculatePlanPriceForGoogleAri(
  //   priceList: PlanPackageDetails[],
  //   childAgeList: any[],
  //   guestCount: number,
  //   aduldCount: number,
  //   childCount: number,
  // ) {
  //   let currentDate = new Date(
  //     this.plan_Start_Date.getFullYear(),
  //     this.plan_Start_Date.getMonth(),
  //     this.plan_Start_Date.getDate(),
  //   );

  //   let planChildPrice =
  //     childAgeList.length === 0
  //       ? 0
  //       : childAgeList.reduce(
  //           (cPrice, info) =>
  //             +cPrice + Math.ceil(Number(info.price.toFixed(2))),
  //           0,
  //         );
  //   planChildPrice = Math.ceil(Number(+planChildPrice.toFixed(2)));
  //   for (let pkg of priceList) {
  //     const adultPrice = +pkg.adult_Price_Mapping[aduldCount];
  //     const guestPrice = pkg.adult_Price_Mapping[guestCount]
  //       ? +pkg.adult_Price_Mapping[guestCount]
  //       : pkg.adult_Price_Mapping[aduldCount];

  //     const basePrice1 = Math.ceil(Number(+adultPrice.toFixed(2)));
  //     const basePrice2 = Math.ceil(Number(+guestPrice.toFixed(2)));
  //     const basePrice3 = Math.min(
  //       ...Object.keys(pkg.adult_Price_Mapping)
  //         .filter((k) => +k >= +guestCount)
  //         .map((k) => pkg.adult_Price_Mapping[+k]),
  //     );
  //     const taxPrice1 =
  //       basePrice1 > 7500
  //         ? Math.ceil(Number(+(basePrice1 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice1 * 0.05).toFixed(2)));
  //     const taxPrice2 =
  //       basePrice2 > 7500
  //         ? Math.ceil(Number(+(basePrice2 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice2 * 0.05).toFixed(2)));
  //     const taxPrice3 = !isNaN(basePrice3)
  //       ? basePrice3 > 7500
  //         ? Math.ceil(Number(+(basePrice3 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice3 * 0.05).toFixed(2)))
  //       : taxPrice2;
  //     let basePricing = 0,
  //       taxPricing = 0,
  //       totalPricing = 0,
  //       adultPricing = 0,
  //       childPricing = 0;

  //     if (this.room_Children_Occupancy <= 0) {
  //       basePricing = !isNaN(basePrice3)
  //         ? Math.min(basePrice2, basePrice3)
  //         : basePrice2 + planChildPrice;
  //       taxPricing = Math.min(taxPrice2, taxPrice3);
  //       adultPricing = basePricing - planChildPrice;
  //       childPricing = planChildPrice;
  //       totalPricing = basePricing + taxPricing;
  //     } else if (
  //       basePrice1 + taxPrice1 + planChildPrice <
  //       basePrice2 + taxPrice2
  //     ) {
  //       basePricing = basePrice1 + planChildPrice;
  //       taxPricing = taxPrice1;
  //       adultPricing = basePricing - planChildPrice;
  //       childPricing = planChildPrice;
  //       totalPricing = basePrice1 + taxPrice1 + planChildPrice;
  //     } else {
  //       basePricing = basePrice2;
  //       taxPricing = taxPrice2;
  //       adultPricing = basePricing - planChildPrice;
  //       childPricing = planChildPrice;
  //       totalPricing = basePrice2 + taxPrice2;
  //     }

  //     let datePrice = {
  //       date: new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         currentDate.getDate(),
  //       ),
  //       basePrice: +basePricing,
  //       adultPrice: +adultPricing,
  //       childPrice: +childPricing,
  //       taxPrice: +taxPricing,
  //       totalPrice: +totalPricing,
  //     };

  //     this.room_Children_Age_Price_Info = childAgeList;
  //     this.plan_Room_Price += +basePricing;
  //     this.plan_Tax += +taxPricing;
  //     this.plan_Price += +totalPricing;
  //     this.plan_Adult_Price += +adultPricing;
  //     this.plan_Child_Price += planChildPrice;
  //     this.priceBreakUp.push(datePrice);

  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   this.num_Guests = +this.room_Guest_Count;
  //   this.num_Children = +this.room_Children_Occupancy;

  //   this.total_Room_Plan_Price = +this.plan_Room_Price;
  //   this.total_Plan_Tax = +this.plan_Tax;
  //   this.total_Plan_Price = +this.plan_Price;
  //   this.total_Adult_Price = +this.plan_Adult_Price;
  //   this.total_Child_Price = +this.plan_Child_Price;
  // }

  // calculatePlanPrice(
  //   priceList: PlanPackageDetails[],
  //   childAgeList: any[],
  //   guestCount: number,
  //   aduldCount: number,
  //   childCount: number,
  // ) {
  //   let currentDate = new Date(
  //     this.plan_Start_Date.getFullYear(),
  //     this.plan_Start_Date.getMonth(),
  //     this.plan_Start_Date.getDate(),
  //   );

  //   let planChildPrice =
  //     childAgeList.length === 0
  //       ? 0
  //       : childAgeList.reduce(
  //           (cPrice, info) =>
  //             +cPrice + Math.ceil(Number(info.price.toFixed(2))),
  //           0,
  //         );
  //   planChildPrice = Math.ceil(Number(+planChildPrice.toFixed(2)));
  //   for (let pkg of priceList) {
  //     const adultPrice = +pkg.adult_Price_Mapping[aduldCount];
  //     const guestPrice = pkg.adult_Price_Mapping[guestCount]
  //       ? +pkg.adult_Price_Mapping[guestCount]
  //       : pkg.adult_Price_Mapping[aduldCount];

  //     const basePrice1 = Math.ceil(Number(adultPrice.toFixed(2)));
  //     const basePrice2 = Math.ceil(Number(guestPrice.toFixed(2)));
  //     const basePrice3 = basePrice1 + planChildPrice;
  //     const taxPrice1 =
  //       basePrice1 > 7500
  //         ? Math.ceil(Number(+(basePrice1 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice1 * 0.05).toFixed(2)));
  //     const taxPrice2 =
  //       basePrice2 > 7500
  //         ? Math.ceil(Number(+(basePrice2 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice2 * 0.05).toFixed(2)));
  //     const taxPrice3 =
  //       basePrice3 > 7500
  //         ? Math.ceil(Number(+(basePrice3 * 0.18).toFixed(2)))
  //         : Math.ceil(Number(+(basePrice3 * 0.05).toFixed(2)));

  //     let basePricing = 0,
  //       taxPricing = 0,
  //       totalPricing = 0,
  //       adultPricing = 0,
  //       childPricing = 0;
  //     if (this.room_Children_Occupancy <= 0) {
  //       basePricing = basePrice2;
  //       taxPricing = taxPrice2;
  //       adultPricing = basePricing - planChildPrice;
  //       childPricing = planChildPrice;
  //       totalPricing = basePrice2 + taxPrice2;
  //     } else {
  //       basePricing = basePrice3;
  //       taxPricing = taxPrice3;
  //       adultPricing = basePricing - planChildPrice;
  //       childPricing = planChildPrice;
  //       totalPricing = basePrice3 + taxPrice3;
  //     }

  //     let datePrice = {
  //       date: new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         currentDate.getDate(),
  //       ),
  //       basePrice: +basePricing,
  //       adultPrice: +adultPricing,
  //       childPrice: +childPricing,
  //       taxPrice: +taxPricing,
  //       totalPrice: +totalPricing,
  //     };

  //     this.room_Children_Age_Price_Info = childAgeList;
  //     this.plan_Room_Price += +basePricing;
  //     this.plan_Tax += +taxPricing;
  //     this.plan_Price += +totalPricing;
  //     this.plan_Adult_Price += +adultPricing;
  //     this.plan_Child_Price += planChildPrice;
  //     this.priceBreakUp.push(datePrice);

  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   this.num_Guests = +this.room_Guest_Count;
  //   this.num_Children = +this.room_Children_Occupancy;

  //   this.total_Room_Plan_Price += +this.plan_Room_Price;
  //   this.total_Plan_Tax += +this.plan_Tax;
  //   this.total_Plan_Price += +this.plan_Price;
  //   this.total_Adult_Price += +this.plan_Adult_Price;
  //   this.total_Child_Price += +this.plan_Child_Price;
  // }

  addSameRoomPlan() {
    this.total_Room_Plan_Price += this.plan_Room_Price;
    this.total_Plan_Tax += this.plan_Tax;
    this.total_Plan_Price += this.plan_Price;
    this.total_Adult_Price += this.plan_Adult_Price;
    this.total_Child_Price += this.plan_Child_Price;
    this.room_Count += 1;
    this.num_Guests += this.room_Guest_Count;
    this.num_Children += this.room_Children_Occupancy;
  }

  removeSameRoomPlan() {
    this.total_Room_Plan_Price -= this.plan_Room_Price;
    this.total_Plan_Tax -= this.plan_Tax;
    this.total_Plan_Price -= this.plan_Price;
    this.total_Adult_Price -= this.plan_Adult_Price;
    this.total_Child_Price -= this.plan_Child_Price;
    this.room_Count -= 1;
    this.num_Guests -= this.room_Guest_Count;
    this.num_Children -= this.room_Children_Occupancy;
  }

  compareRooms(room: RoomDetails): any {
    const ch1 = !!this.room_Age_Bracket_List
      ? this.room_Age_Bracket_List.reduce(
          (tot, obj, idx) => tot + +obj.age * +obj.price,
          0,
        )
      : 0;
    const ch2 = !!room.room_Age_Bracket_List
      ? room.room_Age_Bracket_List.reduce(
          (tot, obj, idx) => tot + +obj.age * +obj.price,
          0,
        )
      : 0;
    if (
      this.room_Id === room.room_Id &&
      this.room_Name === room.room_Name &&
      this.room_Info === room.room_Info &&
      this.plan_Id === room.plan_Id &&
      this.plan_Name === room.plan_Name &&
      this.plan_Info === room.plan_Info &&
      this.room_Guest_Occupancy === room.room_Guest_Occupancy &&
      this.room_Guest_Count === room.room_Guest_Count &&
      this.room_Children_Occupancy === room.room_Children_Occupancy &&
      ch1 === ch2
    ) {
      if (this.room_Guest_Count === room.room_Guest_Count) {
        return { roomPlan: true, planMap: false };
      } else {
        return { roomPlan: true, planMap: true };
      }
    } else {
      return { roomPlan: false, planMap: false };
    }
  }

  compareForMultipleRooms(room: RoomDetails): any {
    const ch1 = !!this.room_Age_Bracket_List
      ? this.room_Age_Bracket_List.reduce(
          (tot, obj, idx) => tot + +obj.age * +obj.price,
          0,
        )
      : 0;
    const ch2 = !!room.room_Age_Bracket_List
      ? room.room_Age_Bracket_List.reduce(
          (tot, obj, idx) => tot + +obj.age * +obj.price,
          0,
        )
      : 0;
    if (
      this.room_Id === room.room_Id &&
      this.room_Name === room.room_Name &&
      this.room_Info === room.room_Info &&
      this.plan_Id === room.plan_Id &&
      this.plan_Name === room.plan_Name &&
      this.plan_Info === room.plan_Info &&
      this.room_Guest_Occupancy === room.room_Guest_Occupancy &&
      this.room_Guest_Count === room.room_Guest_Count &&
      this.room_Children_Occupancy === room.room_Children_Occupancy &&
      ch1 === ch2
    ) {
      if (this.room_Guest_Count === room.room_Guest_Count) {
        return { roomPlan: true, planMap: false };
      } else {
        return { roomPlan: true, planMap: true };
      }
    } else {
      return { roomPlan: false, planMap: false };
    }
  }
}
