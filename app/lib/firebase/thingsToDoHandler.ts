import {
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

// import { getWeekDayMapping, formatDateToString } from "@/src/utils";

// import {
//   TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
//   TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
//   TOUR_AND_TRAVEL_COLLECTION_NAME,
//   TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
//   TOUR_PLANS_COLLECTION_NAME,
//   USER_BOOKINGS_COLLECTION_NAME,
//   TOUR_BOOKING_COLLECTION_NAME,
//   TOUR_PLANS_BOOKING_COLLECTION_NAME,
//   TOUR_GOOGLE_REVIEWS_INFORMATION,
//   TOUR_INVENTORY_PRICE_DATE_INFORMATION,
//   TOUR_IMAGES_COLLECTION_NAME,
//   GOOGLE_OPERATORS_INFORMATION,
//   STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//   PAYMENT_INFO_COLLECTION_NAME,
//   STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
// } from "./helper";

// import {
//   TourImageDetails,
//   TourOperator,
//   TourPackageInfo,
// } from "../classModels/tourAndTravels/TourPackageInfo";

// import {
//   TourPlanInformation,
//   WeekDay,
//   WeekDayInfo,
// } from "../classModels/tourAndTravels/TourPlanInformation";

// import { TourBookingDetails } from "../classModels/bookings/tourBookingDetails";

// import { PlanDetails } from "../classModels/bookings/planDetails";

import { db } from ".";

import { GOOGLE_OPERATORS_INFORMATION, PAYMENT_INFO_COLLECTION_NAME, STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME, STAYBOOK_TOUR_BOOKINGS_SECTION_NAME, TOUR_AND_TRAVEL_COLLECTION_NAME, TOUR_AND_TRAVEL_SUB_COLLECTION_NAME, TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME, TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT, TOUR_BOOKING_COLLECTION_NAME, TOUR_GOOGLE_REVIEWS_INFORMATION, TOUR_IMAGES_COLLECTION_NAME, TOUR_INVENTORY_PRICE_DATE_INFORMATION, TOUR_PLANS_BOOKING_COLLECTION_NAME, TOUR_PLANS_COLLECTION_NAME, USER_BOOKINGS_COLLECTION_NAME } from "../helper";
import { TourImageDetails, TourOperator, TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";
import { formatDateToString } from "../utils/formatDateToString/formatDateToString";
import { getWeekDayMapping } from "../utils/getWeekDayMapping/getWeekDayMapping";
import { TourPlanInformation, WeekDay, WeekDayInfo } from "@/app/classes/tourAndTravels/TourPlanInformation";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { PlanDetails } from "@/app/classes/bookings/planDetails";

// fetch all details of a single booking from DB
export const getBookingData = async (tourSlug: string, bookingId: string) => {
  const docRef = doc(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    tourSlug,
    TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
    bookingId,
  );

  try {
    const bookingData = await getDoc(docRef);
    if (!bookingData.exists()) {
      return null;
    }

    return { ...bookingData.data() };
  } catch (error: any) {
    console.error("error in getBookingData:", error?.message || error);
    return null;
  }
};

// fetch all tours slug from DB
export const fetchAllTourSlugFromDB = async () => {
  const collectionRef = collection(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  );

  try {
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((doc) => doc.id);
    return data;
  } catch (error: any) {
    console.error(
      "error in fetchAllTourSlugFromDB line 56",
      error?.message || error,
    );
    throw new Error(
      "error in fetchAllTourSlugFromDB line 57",
      error?.message || error,
    );
  }
};

export const fetchTourPlanPriceInvDateInfo = async (
  tourId: string,
  tourPlanId: string,
  tourPlanDate: Date,
) => {
  const dateKey = formatDateToString(tourPlanDate);
  const tourPlanPriceInvDoc = doc(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    tourId,
    TOUR_PLANS_COLLECTION_NAME,
    tourPlanId,
    TOUR_INVENTORY_PRICE_DATE_INFORMATION,
    dateKey,
  );
  const tourPriceInvRef = await getDoc(tourPlanPriceInvDoc);
  if (tourPriceInvRef.exists()) {
    return { status: true, data: tourPriceInvRef.data(), error: null };
  } else {
    return {
      status: false,
      data: null,
      error: `Tour Plan Price Inventory Document with ID ${tourPlanId} not found.`,
    };
  }
};

export const getTourPlansInvPriceList = async (
  tourId: string,
  tourDate: Date = new Date(),
): Promise<TourPlanInformation[]> => {
  const planCollectonRef = collection(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    tourId,
    TOUR_PLANS_COLLECTION_NAME,
  );

  const planSnapshot = await getDocs(planCollectonRef);
  const list: TourPlanInformation[] = [];

  for (const plan of planSnapshot.docs) {
    const tourInfo = plan.data() as TourPlanInformation;

    const weekDay: WeekDay = getWeekDayMapping(tourDate);
    const dayInfo: WeekDayInfo = tourInfo.tourPlan_Week_Opening_Info[weekDay];

    const { status, data: tourDateInfo } = await fetchTourPlanPriceInvDateInfo(
      tourId,
      plan.id,
      tourDate,
    );

    if (status) {
      if (!isNaN(tourDateInfo?.tourPlan_Count)) {
        tourInfo.tourPlan_Inventory_Count = +tourDateInfo?.tourPlan_Count;
      } else {
        tourInfo.tourPlan_Inventory_Count = dayInfo.is_Open
          ? tourInfo.tourPlan_Count
          : 0;
      }

      if (
        tourDateInfo?.tourPlan_Adult_Price_Map &&
        typeof tourDateInfo.tourPlan_Adult_Price_Map === "object" &&
        Object.keys(tourDateInfo.tourPlan_Adult_Price_Map).length > 0
      ) {
        tourInfo.tourPlan_Adult_Price_Date_Map =
          tourDateInfo.tourPlan_Adult_Price_Map;
      } else {
        tourInfo.tourPlan_Adult_Price_Date_Map =
          tourInfo.tourPlan_Adult_Price_Map;
      }
    } else {
      tourInfo.tourPlan_Adult_Price_Date_Map =
        tourInfo.tourPlan_Adult_Price_Map;
      tourInfo.tourPlan_Inventory_Count = dayInfo.is_Open
        ? tourInfo.tourPlan_Count
        : 0;
    }

    list.push(tourInfo);
  }

  return list.sort((a, b) => {
    if (a.tourPlan_Adult_Price_Map && b.tourPlan_Adult_Price_Map) {
      return b.tourPlan_Adult_Price_Map[1] - a.tourPlan_Adult_Price_Map[1];
    } else {
      return 0;
    }
  });
};

// export the data of a perticular packages
export const getDataOfSinglePackage = async (
  packageSlug: string,
  tourDate: Date = new Date(),
) => {
  try {
    const docRef = doc(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
      packageSlug,
    );
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return {
        status: false,
        data: null,
        error: `Package with slug "${packageSlug}" not found.`,
      };
    }

    const tour = docSnapshot.data() as TourPackageInfo;
    const operatorSlug = tour.tour_Operator_Slug ?? "";

    if (operatorSlug.trim().length > 0) {
      const operatorDocRef = doc(
        db,
        TOUR_AND_TRAVEL_COLLECTION_NAME,
        TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
        GOOGLE_OPERATORS_INFORMATION,
        operatorSlug,
      );
      const operatorDocSnapshot = await getDoc(operatorDocRef);

      if (operatorDocSnapshot.exists()) {
        const operator = operatorDocSnapshot.data();
        tour.tour_Operator_Info = {
          id: operator?.operator_Id,
          operator_Address: operator?.operator_Address,
          operator_City: operator?.operator_City,
          operator_Name: operator?.operator_Name,
          operator_Phone: operator?.operator_Phone,
          operator_State: operator?.operator_State,
          operator_Website_Url: operator?.operator_Website_Url,
        };
      } else {
        tour.tour_Operator_Info = { ...new TourOperator() };
      }
    } else {
      tour.tour_Operator_Info = { ...new TourOperator() };
    }

    return { status: true, data: tour, error: null };
  } catch (error: any) {
    console.error("Error fetching package data:", error);
    return { status: false, data: null, error: error?.message || error };
  }
};

export const getTourImageObjectList = async (
  tourId: string,
  imageCount: number = 100,
): Promise<TourImageDetails[]> => {
  try {
    const tourCollectionRef = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
      tourId,
      TOUR_IMAGES_COLLECTION_NAME,
    );

    // Add orderBy to the query
    const tourImagesQuerySnapshot = await getDocs(
      query(tourCollectionRef, orderBy("order", "asc"), limit(imageCount)),
    );

    let list: TourImageDetails[] = tourImagesQuerySnapshot.docs.map(
      (roomImage: any) => {
        let imageInfo = { ...roomImage.data() } as TourImageDetails;
        return imageInfo;
      },
    );

    return list;
  } catch (error) {
    console.error("Error fetching tour images:", error);
    return [];
  }
};

export const getDataOfTourReviews = async (
  packageSlug: string,
  lastVisibleId?: string,
  direction: "forward" | "backward" = "forward",
) => {
  try {
    const reviewsRef = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT, // restored this
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
      packageSlug,
      TOUR_GOOGLE_REVIEWS_INFORMATION,
    );

    const fullPageLimit = 4;
    let q;

    if (lastVisibleId) {
      const lastDocRef = doc(reviewsRef, lastVisibleId);
      const lastDocSnap = await getDoc(lastDocRef);
      if (!lastDocSnap.exists()) {
        return {
          status: false,
          data: [],
          error: `Document with ID ${lastVisibleId} not found for pagination.`,
        };
      }

      q =
        direction === "forward"
          ? query(
              reviewsRef,
              orderBy("review_Date", "desc"),
              startAfter(lastDocSnap),
              limit(fullPageLimit),
            )
          : query(
              reviewsRef,
              orderBy("review_Date", "desc"),
              endBefore(lastDocSnap),
              limitToLast(fullPageLimit),
            );
    } else {
      q = query(
        reviewsRef,
        orderBy("review_Date", "desc"),
        limit(fullPageLimit),
      );
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const reviews = docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Record<string, any>),
    }));

    const firstId = docs.length > 0 ? docs[0].id : null;
    const lastId = docs.length > 0 ? docs[docs.length - 1].id : null;

    return {
      tourId: packageSlug,
      status: true,
      data: reviews,
      firstVisibleId: firstId, // newly added to help track "Prev"
      lastVisibleId: lastId, // as you already had
      error: null,
    };
  } catch (error: any) {
    console.error("Error fetching paginated reviews:", error);
    return { status: false, data: null, error: error?.message || error };
  }
};

export const getNearybyPackages = async (
  tourSlugName: string,
  city: string,
  tourType: string,
) => {
  const docRef = collection(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  );

  const querySnap = await getDocs(
    query(
      docRef,
      where("tour_City_Covered", "array-contains", city.trim()),
      where("tour_Type", "==", tourType),
      limit(10),
    ),
  );

  const nearbyPackages = querySnap.docs.map((doc) => ({
    ...doc.data(),
  })) as TourPackageInfo[];

  const filteredTours = nearbyPackages.filter((pkg) => {
    return pkg.tour_Slug_Name !== tourSlugName;
  });
  return filteredTours;
};

export const getNearybyEmail = async (
  city: string,
  type: "Activity" | "tour" = "tour",
  limitCount: number = 10,
) => {
  const docRef = collection(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  );

  const buildQuery = (cityName: string) => {
    if (type === "Activity") {
      return query(
        docRef,
        where("tour_City_Covered", "array-contains", cityName.trim()),
        where("tour_Type", "==", "Activity"),
        limit(limitCount * 4),
      );
    } else {
      const subTypes = [
        "Ticket-Only",
        "Self-Guided",
        "Guided-Tours",
        "Day-Tours",
        "Private-Tours",
        "Group-Tours",
      ];
      const randomType = subTypes[Math.floor(Math.random() * subTypes.length)];

      return query(
        docRef,
        where("tour_City_Covered", "array-contains", cityName.trim()),
        where("tour_Type", "==", randomType),
        limit(limitCount * 4),
      );
    }
  };

  const filterValidTours = (docs: any[]) =>
    docs
      .map((doc) => doc.data() as TourPackageInfo)
      .filter(
        (data) =>
          Boolean(data.tour_Image_Url?.trim()) &&
          Boolean(data.tour_Name?.trim()),
      )
      .slice(0, limitCount) // limit after filtering
      .map((data) => ({
        tour_Image_Url: data.tour_Image_Url,
        tour_Name: data.tour_Name,
        tour_Slug_Name: data.tour_Slug_Name,
        tour_Review_Count: data.tour_Review_Count,
        tour_Rating: data.tour_Rating,
        tour_Availability: data.tour_Availability,
        tour_Cost_Breakup: data.tour_Cost_Breakup,
        tour_Info: data.tour_Info,
        tour_Description: data.tour_Description,
      }));

  let querySnap = await getDocs(buildQuery(city));
  let nearbyPackages = filterValidTours(querySnap.docs);

  // Fallback
  if (nearbyPackages.length < 2) {
    const fallbackSnap = await getDocs(buildQuery("Delhi"));
    nearbyPackages = filterValidTours(fallbackSnap.docs);
  }

  return nearbyPackages;
};

// return the objects of same city
export const getListOfTourIdsWithSameCity = async (
  cityName: string,
  docsLimit: number = 18,
) => {
  try {
    const toursRef = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    );
    const q = query(
      toursRef,
      where("tour_City_Covered", "array-contains", cityName),
      limit(docsLimit),
    );

    const querySnapshot = await getDocs(q);
    const docIds = querySnapshot.docs.map((doc) => ({
      tourSlugName: doc.id,
      tourName: doc.data().tour_Name,
    }));
    return docIds;
  } catch (error) {
    console.error("Error fetching tours by city:", error);
    return null;
  }
};

// return the objects of same city
export const getListOfTourDataWithSameCity = async (
  cityName: string,
  docsLimit: number = 7,
) => {
  try {
    const toursRef = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    );

    const q = query(
      toursRef,
      where("tour_Availability", "==", true),
      where("tour_City_Covered", "array-contains", cityName),
      orderBy("tour_Review_Count", "desc"),
      limit(docsLimit),
    );

    const querySnapshot = await getDocs(q);

    const tourDocs = querySnapshot.docs;

    const tourData = await Promise.all(
      tourDocs.map(async (doc) => {
        const tour = doc.data() as TourPackageInfo;

        const planCollectonRef = collection(
          db,
          TOUR_AND_TRAVEL_COLLECTION_NAME,
          TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
          TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
          doc.id,
          TOUR_PLANS_COLLECTION_NAME,
        );

        const planSnapshot = await getDocs(planCollectonRef);
        tour.tour_Plans_List = planSnapshot.docs.map(
          (plan) => plan.data() as TourPlanInformation,
        );
        return tour;
      }),
    );
    return { status: true, data: tourData };
  } catch (error) {
    console.error("Error fetching tours by city:", error);
    return { status: false, data: null };
  }
};

export const getActivityByCity = async (cityName: string) => {
  try {
    const activitiesRef = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
    );

    const q = query(
      activitiesRef,
      where("tour_Availability", "==", true),
      where("tour_Type", "==", "Activity"),
      where("tour_City_Covered", "array-contains", cityName),
      orderBy("tour_Review_Count", "desc"),
      limit(4),
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const activityData = await Promise.all(
      docs.map(async (doc) => {
        const activity = doc.data() as TourPackageInfo;

        const planRef = collection(
          db,
          TOUR_AND_TRAVEL_COLLECTION_NAME,
          TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
          TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
          doc.id,
          TOUR_PLANS_COLLECTION_NAME,
        );

        const planSnapshot = await getDocs(planRef);

        activity.tour_Plans_List = planSnapshot.docs.map(
          (plan) => plan.data() as TourPlanInformation,
        );

        return activity;
      }),
    );

    return { status: true, data: activityData };
  } catch (error) {
    console.error("Error fetching activities by city:", error);
    return { status: false, data: null };
  }
};

export const getTourBookingInformation = async (
  booking_Id: string,
  user_Email_Id: string,
) => {
  const bookingDoc = doc(
    db,
    USER_BOOKINGS_COLLECTION_NAME,
    user_Email_Id,
    TOUR_BOOKING_COLLECTION_NAME,
    booking_Id,
  );

  let tourBookingInfo = new TourBookingDetails();
  const bookingInfo = await getDoc(bookingDoc);
  if (bookingInfo.exists()) {
    const planCol = collection(
      db,
      USER_BOOKINGS_COLLECTION_NAME,
      user_Email_Id,
      TOUR_BOOKING_COLLECTION_NAME,
      booking_Id,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );

    tourBookingInfo = { ...bookingInfo.data() } as TourBookingDetails;
    let plansList: PlanDetails[] = [];

    const planColRef = await getDocs(planCol);
    for (let pInfo of planColRef.docs) {
      const planDetails = { ...pInfo.data() } as PlanDetails;
      plansList.push(planDetails);
    }

    tourBookingInfo.plans_List = plansList;

    return { status: true, data: tourBookingInfo };
  } else {
    return { status: false, data: new TourBookingDetails() };
  }
};
export const getTourBookingPaymentInformation = async (booking_Id: string) => {
  const bookingDoc = doc(
    db,
    STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
    STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
    PAYMENT_INFO_COLLECTION_NAME,
    booking_Id,
  );

  let tourBookingInfo = new TourBookingDetails();
  const bookingInfo = await getDoc(bookingDoc);
  if (bookingInfo.exists()) {
    const planCol = collection(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      PAYMENT_INFO_COLLECTION_NAME,
      booking_Id,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );

    tourBookingInfo = { ...bookingInfo.data() } as TourBookingDetails;
    let plansList: PlanDetails[] = [];

    const planColRef = await getDocs(planCol);
    for (let pInfo of planColRef.docs) {
      const planDetails = { ...pInfo.data() } as PlanDetails;
      plansList.push(planDetails);
    }

    tourBookingInfo.plans_List = plansList;

    return tourBookingInfo;
  } else {
    return null;
  }
};
