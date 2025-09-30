import { manipulateDateByDays } from "@/src/utils";
import {
  ARI_PLAN_PRICE_UPDATE_TYPE_MANUAL,
  DATE_FORMAT_YYYY_MM_DD,
} from "@/lib/helper";

export class AriQueryParams {
  hotelId: string = "";
  roomId: string = "";
  planId: string = "";
  planDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = manipulateDateByDays(new Date(), 1);
  formatedStartDate: string = "";
  formatedEndDate: string = "";
  dateFormat: string = DATE_FORMAT_YYYY_MM_DD;
  adultPriceMap: any = {};
  planPrice: number = 0;
  perAdultPrice: number = 1200;
  perAdultPricePercentage: number = 10;
  roomGuestOccupancy: number = 2;
  roomGuestMinimumOccupancy: number = 1;
  roomGuestMaximumOccupancy: number = 6;
  roomInventory: number = 0;
  updateMode: string = ARI_PLAN_PRICE_UPDATE_TYPE_MANUAL;
  weekDaysList: boolean[] = [true, true, true, true, true, true, true];
  days: any = {
    Mon: true,
    Tues: true,
    Weds: true,
    Thru: true,
    Fri: true,
    Sat: true,
    Sun: true,
  };
  dbUpdate: boolean = false;
}
