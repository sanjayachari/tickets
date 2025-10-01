
import { DATE_FORMAT_YYYY_MM_DD, HOTEL_DETAILS_INFORMATION_COLLECTION_NAME } from "@/app/lib/helper";
import { formatDateToString } from "@/app/lib/utils/formatDateToString/formatDateToString";


export class WhereQuery {
  field: any = "";
  comparator: any = "";
  value: any = 0;

  constructor(field: string = "", comparator: string = "", value: any = 0) {
    this.field = field;
    this.comparator = comparator;
    this.value = value;
  }
}

export class FirebaseQueryParams {
  hotelId = "";
  roomId = "";
  planId = "";
  dateFormat = DATE_FORMAT_YYYY_MM_DD;
  formattedStartDate = formatDateToString(new Date(), DATE_FORMAT_YYYY_MM_DD);
  formattedEndDate = formatDateToString(new Date(), DATE_FORMAT_YYYY_MM_DD);
  parentCollectionName: string = HOTEL_DETAILS_INFORMATION_COLLECTION_NAME;
  startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
  );
  limit = 1000;
  orderByOrder = "asc";
  orderByField = "";
  filterQuery = new WhereQuery();
  whereEnabled = false;

  filtersList: WhereQuery[] = [];

  set setStartDate(givenDate: Date) {
    this.startDate = givenDate;
    this.formattedStartDate = formatDateToString(givenDate, this.dateFormat);
  }
  set setEndDate(givenDate: Date) {
    this.endDate = givenDate;
    this.formattedEndDate = formatDateToString(givenDate, this.dateFormat);
  }
}
