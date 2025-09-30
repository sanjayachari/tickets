

"use client"; // THIS MUST BE THE FIRST LINE
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { usePathname, useSearchParams } from "next/navigation";

// import {
//   TourImageDetails,
//   TourPackageInfo,
// } from "@/lib/classModels/tourAndTravels/TourPackageInfo";


// import {
//   getDataOfSinglePackage,
//   getTourPlansInvPriceList,
// } from "@/lib/firebase/thingsToDoHandler";


// import College from "@/components/things-to-do/College";
// import TourHead from "@/components/header/TourHead";
// import TourReviews from "@/components/things-to-do/tour-page/TourReviews";
// import TourAccordian from "@/components/things-to-do/tour-page/TourAccordian";
// import TourActivityInfo from "@/components/things-to-do/tour-page/TourActivityInfo";
// import TourBacklinks from "@/components/things-to-do/tour-page/TourBacklinks";
// import TourNearbyList from "@/components/things-to-do/tour-page/TourNearbyList";
// import TourBanner from "@/components/things-to-do/tour-page/TourBanner";
// import TourItineary from "@/components/things-to-do/tour-page/TourItineary";
// import TourBottomBar from "@/components/things-to-do/tour-page/TourBottomBar";

// import {
//   resetTourBookingInfo,
//   updateTourDetails,
//   updateCurrencyInfo,
//   setTourBookingCardLoading,
//   selectSearchedDate,
//   selectTourBookingInfo,
//   selectPlansList,
// } from "@/lib/redux/tourBookingSlice";

// import TourBookingCard from "@/components/common/TravelBookingCard";
// import { TourPlansList } from "@/components/things-to-do/tour-page/plans/TourPlansList";
// import { locationCurencyValue } from "@/lib/helper";
// import TourAdditionalContent from "@/components/things-to-do/tour-page/AdditionalContent";
// import { updateChatStatus } from "@/lib/handlers/things-to-do/needHelpChatbot";
// import { TourPlanInformation } from "@/lib/classModels/tourAndTravels/TourPlanInformation";
// import { TourPlanCardSkeleton2 } from "@/components/skeleton/ThingsToDoSkeleton";
// import { TourBookingDetails } from "@/lib/classModels/bookings/tourBookingDetails";
// import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
// import { routerToThingsToDoBookingPage } from "@/lib/handlers/pageHandler";


import { isValidUrl } from "@/app/lib/utils/isValidUrl/isValidUrl";
import { encryptBookingInfo } from "@/app/lib/utils/encryptBookingInfo/encryptBookingInfo";
import { formatSecondToDaysNights } from "@/app/lib/utils/formatSecondToDaysNights/formatSecondToDaysNights";
import { TourImageDetails, TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";
import { getDataOfSinglePackage, getTourPlansInvPriceList } from "@/app/lib/firebase/thingsToDoHandler";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import Gallery from "@/app/components/things-to-do/Gallery";
import Breadcrumbs from "@/app/components/common/Breadcrumbs";
import College from "@/app/components/things-to-do/College";
import TourReviews from "@/app/components/things-to-do/TourReviews";
import TourAccordian from "@/app/components/things-to-do/TourAccordian";
import TourActivityInfo from "@/app/components/things-to-do/TourActivityInfo";
import TourBacklinks from "@/app/components/things-to-do/TourBacklinks";
import TourNearbyList from "@/app/components/things-to-do/TourNearbyList";
import TourBanner from "@/app/components/things-to-do/TourBanner";
import TourItinerary from "@/app/components/things-to-do/TourItineary";
import TourBottomBar from "@/app/components/things-to-do/TourBottomBar";
import { resetTourBookingInfo, selectPlansList, selectSearchedDate, selectTourBookingInfo, setTourBookingCardLoading, updateCurrencyInfo, updateTourDetails } from "@/app/lib/redux/tourBookingSlice";
// import { selectPlansList, selectSearchedDate, updateCurrencyInfo } from "@/app/lib/redux/activityBookingSlice";
import TourBookingCard from "@/app/components/common/TravelBookingCard";
import { TourPlansList } from "@/app/components/things-to-do/plans/TourPlansList";
import { locationCurencyValue } from "@/app/lib/helper";
import TourAdditionalContent from "@/app/components/things-to-do/AdditionalContent";
import { updateChatStatus } from "@/app/lib/handler/things-to-do/needHelpChatbot";
import { TourPlanInformation } from "@/app/classes/tourAndTravels/TourPlanInformation";
import { TourPlanCardSkeleton2 } from "@/app/components/skeleton/ThingsToDoSkeleton";
import { PageRouterQueryParams } from "@/app/classes/queryParams/PageRouterQueryParams";
import { routerToThingsToDoBookingPage } from "@/app/lib/handler/pageHandler";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/ui/navbar/Navbar";

interface tourDataProps {
  tourData: TourPackageInfo;
}

interface SectionKeys {
  tourHighlights: boolean;
  tourHighlightInclusion: boolean;
  tourHighlightExclusion: boolean;
  tourImportantInformation: boolean;
  tourMeetingPoint: boolean;
  tourEndingPoint: boolean;
  tourDescription: boolean;
  tourCancellationPolicy: boolean;
  tourMustKnowFeatures: boolean;
}

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export const TourClientComponent = ({ tourData , tourSlug }: any) => {
  
  const router = useRouter();
  const dispatch = useDispatch();

  const isTicketOnly = tourData.tour_Type === "Ticket-Only";
  const isActivity = tourData.tour_Type === "Activity";
  const isStrictPolicy = isTicketOnly || isActivity;

  const searchedDate = useSelector(selectSearchedDate);
  const selectionRefMobile = useRef<HTMLDivElement>(null);
  const selectionRefDesktop = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openNeedHelp, setOpenNeedHelp] = useState(false);
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [openCalendarState, setOpenCalendarState] = useState(false);
  const [openAdultAge, setOpenAdultAge] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [formattedDateState, setFormattedDate] = useState("");
  const [lastVisibleReviewId, setLastVisibleReviewId] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [tourPlansList, setTourPlansList] = useState<
    TourPlanInformation[] | null
  >(null);
  const [loadReviews, setLoadReviews] = useState(true);
  const [imagesList, setAvailableImages] = useState<TourImageDetails[]>([]);
  const [maxAdultCount, setMaxAdultCount] = useState(15);
  const [lowestPrice, setLowestPrice] = useState<null | number>(null);
  const [slotModel, setSlotModel] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  console.log('__lowestPrice' , lowestPrice)
  const [isOpen, setIsOpen] = useState<SectionKeys>({
    tourHighlights: true,
    tourHighlightInclusion: true,
    tourHighlightExclusion: true,
    tourImportantInformation: true,
    tourMeetingPoint: true,
    tourEndingPoint: true,
    tourDescription: true,
    tourCancellationPolicy: true,
    tourMustKnowFeatures: true,
  });
  const [showPolicyDuration, setShowPolicyDuration] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [chatId, setChatId] = useState("");
  const tourBookingInfo = useSelector(selectTourBookingInfo);
  const selectedTourPlansList = useSelector(selectPlansList);
  // calculate total price from plansList to get accurate price in booking
  const totalPlanPrices = selectedTourPlansList.reduce(
    (accumulator : any , currentPlan : any ) => {
      return accumulator + currentPlan.total_Plan_Price;
    },
    0,
  );

  // handle the toggle of the isOpen state
  const handleToggle = (infoType: keyof SectionKeys) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [infoType]: !prevState[infoType],
    }));
  };

  // get the max adult count
  const getMaxAdultCount = (plansData: TourPlanInformation[]) => {
    const allAdultCounts = plansData.flatMap((option) => {
      const map = option.tourPlan_Adult_Price_Map;
      return map ? Object.keys(map).map(Number) : [];
    });
    return allAdultCounts.length ? Math.max(...allAdultCounts) : 10;
  };

  // get lowest price of tour
  const getLowestTourPrice = (plansData: TourPlanInformation[]) => {
    let lowestPrice = Infinity;
    let taxPercentage = 5; // Default fallback tax

    // Helper function to extract price from a map safely
    const getPrice = (map?: { [key: number]: number }) => map?.[1] ?? null;

    for (const plan of plansData) {
      if (plan.tourPlan_Inventory_Count <= 0) continue;

      const priceFromDateMap = getPrice(plan.tourPlan_Adult_Price_Date_Map);
      const priceFromPriceMap = getPrice(plan.tourPlan_Adult_Price_Map);

      const price = priceFromDateMap ?? priceFromPriceMap;

      if (price !== null && price < lowestPrice) {
        lowestPrice = price;
        taxPercentage = plan.tourPlan_Tax_Percentage ?? 5;
      }
    }

    // Fallbacks if no price found
    if (lowestPrice === Infinity) {
      return tourData?.tour_Cost_Breakup?.base_Price ?? 20000;
    }

    // Final price (note: tax is fetched but not applied – use it if needed)
    return lowestPrice;
  };

useEffect(() => {
  const pathname = window.location.pathname; // or use usePathname()
  const tourSlugName = pathname.split("/").pop(); // last part of URL

  if (!tourSlugName) return;

  dispatch(setTourBookingCardLoading(true));
    const tourWorker = new Worker("/workers/tourInfo.worker.js");

  // send the data to the worker
  tourWorker.postMessage({ tourSlugName });

  tourWorker.onmessage = (event) => {
    const data = event.data;
    console.log('data____' , data)
    if (data.error) {
      console.error("Error from worker:", data.error);
    } else {
      setReviewList(data.reviewsList.data);
      setLastVisibleReviewId(data.reviewsList.lastVisibleId);
      setAvailableImages(data.ImagesList);
      setTourPlansList(data.tourPlansList);
      setMaxAdultCount(getMaxAdultCount(data.tourPlansList));
      setLowestPrice(getLowestTourPrice(data.tourPlansList));
    }

    setLoadReviews(false);
    dispatch(setTourBookingCardLoading(false));
  };

  tourWorker.onerror = (error) => {
    setLoadReviews(false);
    console.error("Worker error:", error);
  };

  return () => tourWorker.terminate();
}, []); // remove router dependency


  // scroll into view
  const scrollToSelection = () => {
    selectionRefMobile.current?.scrollIntoView({ behavior: "smooth" });
    selectionRefDesktop.current?.scrollIntoView({ behavior: "smooth" });
    planRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // hide the body overflow if any condition is met
  useEffect(() => {
    if (
      isGalleryOpen ||
      isCollegeOpen ||
      openCalendarState ||
      openAdultAge ||
      openNeedHelp
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isGalleryOpen,
    openNeedHelp,
    isCollegeOpen,
    openCalendarState,
    openAdultAge,
  ]);

  async function getCurrencyDetails() {
    dispatch(setTourBookingCardLoading(true));
    const { currencyCode, currencySymbol, currencyValue } =
      await locationCurencyValue();
    dispatch(
      updateCurrencyInfo({
        currencyCode: currencyCode,
        currencySymbol: currencySymbol,
        currencyValue: currencyValue,
      }),
    );
  }

  const createTourBooking = () => {
    if (selectedTourPlansList.length === 0) {
      toast.error("Please select at least one plan");
      return;
    }
    const bookingDetails = new TourBookingDetails();

    bookingDetails.plans_List = tourBookingInfo.plans_List;
    bookingDetails.tour_Name = tourBookingInfo.tour_Name;
    bookingDetails.tour_Image_Url = tourBookingInfo.tour_Image_Url;
    bookingDetails.tour_Operator_Email_Id = tourData.tour_Contact_Email_Id;
    bookingDetails.tour_Operator_Phone_Number =
      tourData.tour_Contact_Phone_Number;
    bookingDetails.tour_Start_Date = tourBookingInfo.tour_Start_Date;
    bookingDetails.tour_Duration = tourBookingInfo.tour_Duration;
    bookingDetails.tour_Days = tourBookingInfo.tour_Number_Of_Days;
    bookingDetails.tour_Nights = tourBookingInfo.tour_Number_Of_Nights;
    bookingDetails.total_Tour_Cost = tourBookingInfo.total_Tour_Cost;
    bookingDetails.total_Tax = tourBookingInfo.total_Tax;
    bookingDetails.total_Price = totalPlanPrices;
    bookingDetails.tour_Slug_Name = tourData.tour_Slug_Name;
    bookingDetails.tour_Partial_Payment_Percentage =
      tourData.tour_Partial_Percentage;
    bookingDetails.tour_Info = tourData.tour_Info;
    bookingDetails.tour_Rating = tourData.tour_Rating || 0;
    bookingDetails.tour_City_Covered = tourData.tour_City_Covered;
    bookingDetails.tour_Type = tourData.tour_Type;
    bookingDetails.tour_Cancellation_Policy = policyPoints.join("<br/>");
    // bookingDetails.tour_General_Policy = tourData.tour_General_Policy.description;
    // bookingDetails.tour_Cancellation_Policy = tourData.tour_Cancellation_Policy.description;
    // bookingDetails.tour_Refund_Policy = tourData.tour_Refund_Policy.description;

    bookingDetails.tour_Payment_Option = tourData.tour_Payment_Option;
    bookingDetails.total_Adult_Count = tourBookingInfo.total_Adults_Count;
    bookingDetails.total_Child_Count = tourBookingInfo.total_Children_Count;
    bookingDetails.total_Guest_Count = tourBookingInfo.total_Guests_Count;
    bookingDetails.total_Plans_Count = tourBookingInfo.plans_List.length;

    bookingDetails.tour_Currency_Code = tourBookingInfo.tour_Currency_Code;
    bookingDetails.tour_Currency_Symbol = tourBookingInfo.tour_Currency_Symbol;
    bookingDetails.tour_Currency_Value = tourBookingInfo.tour_Currency_Value;
    encryptBookingInfo({ ...bookingDetails }, "tInfo");

    const params = new PageRouterQueryParams(router);
    params.checkin = tourBookingInfo.tour_Start_Date;
    params.num_adults = tourBookingInfo.total_Adults_Count;
    params.num_children = tourBookingInfo.total_Children_Count;
    params.num_guests =
      tourBookingInfo.total_Adults_Count + tourBookingInfo.total_Children_Count;
    params.searchedQuery = tourSlug as string;
    routerToThingsToDoBookingPage("booking", params);
  };

  // set the mounted state to true when the component gets mounted
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");

    if (savedChatHistory) {
      const parsedChatHistory = JSON.parse(savedChatHistory);
      updateChatStatus(parsedChatHistory?.liveChat?.message_id, false);
      setChatId(parsedChatHistory?.liveChat?.message_id || "");
    }

    // reset the redux state
    // dispatch(resetTourBookingInfo());
    getCurrencyDetails();
    const res = formatSecondToDaysNights(tourData.tour_Duration);
    const [days, nights] = res.split(" / ");
    // update the tour data in the redux store
    dispatch(
      updateTourDetails({
        tour_Slug_Name: tourData.tour_Slug_Name,
        tour_Name: tourData.tour_Name,
        tour_Image_Url: tourData.tour_Image_Url,
        tour_Duration: tourData.tour_Duration,
        tour_Number_Of_Days: parseInt(days) || 1,
        tour_Number_Of_Nights: parseInt(nights) || 0,
        tour_Payment_Option: tourData.tour_Payment_Option,
        tour_Partial_Percentage: tourData.tour_Partial_Percentage,
        tour_Type: tourData.tour_Type,
      }),
    );
  }, []);

  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");

    if (savedChatHistory) {
      const parsedChatHistory = JSON.parse(savedChatHistory);
      setChatId(parsedChatHistory?.liveChat?.message_id || "");
    }
  }, [openNeedHelp]);

  useEffect(() => {
    const fetchTourPlans = async () => {
      dispatch(setTourBookingCardLoading(true));
      try {
        const newTourPlansList = await getTourPlansInvPriceList(
          tourSlug + "",
          searchedDate,
        );
        setTourPlansList(newTourPlansList);
      } catch (error) {
        console.error("Error fetching tour plans:", error);
      }
    };

    if (searchedDate) {
      fetchTourPlans();
    }
  }, [searchedDate]);

  const policyPoints = isStrictPolicy
    ? [
        "By confirming this booking, you acknowledge that it is <strong>non-refundable</strong> and <strong>cannot be cancelled or transferred</strong> under any circumstances. This policy is in place to maintain operational commitments with our partners.",
      ]
    : [
        "<strong>25% refund</strong> up to <strong>7 days</strong> before the tour date",
        "<strong>50% refund</strong> for cancellations <strong>3–7 days</strong> before the tour date",
        "<strong>No refund</strong> for cancellations <strong>less than 3 days</strong> before the tour date",
      ];

  const cancellationPolicy = (
    <div>
      <p>
        By proceeding with any booking via Staybook, you acknowledge and agree
        to adhere to all the{" "}
        <button
          onClick={() => setShowPolicyDuration(!showPolicyDuration)}
          className="text-blue-600 underline"
        >
          terms and conditions
        </button>
        .
      </p>
      {showPolicyDuration && (
        <div className="mt-2 space-y-2 rounded-xl border p-4">
          <p className="font-semibold tracking-wide">Cancellation Policy</p>
          <ul className="list-disc pl-8">
            {policyPoints.map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  const shuffledTourCities = shuffleArray(tourData.tour_City_Covered);

  const memoizedNearbyList = useMemo(() => {
    if (tourData.tour_City_Covered && tourData.tour_City_Covered.length > 0) {
      return (
        <TourNearbyList
          tourSlug={tourData.tour_Slug_Name}
          data={shuffledTourCities}
          tourType={tourData.tour_Type}
        />
      );
    }
    return null;
  }, [tourData.tour_Slug_Name]);

  return (
    <>
      {/* <TourHead
        title={
          tourData?.tour_Meta_Object_Details?.meta_Title ||
          `${tourData.tour_Name} - Staybook`
        }
        description={
          tourData?.tour_Meta_Object_Details?.meta_Description ||
          "Discover the best tours with private guides, skip-the-line tickets, and comfortable day trips. Explore top attractions, cultural landmarks, and historical sites with flexible booking and hassle-free experiences."
        }
        keywords={
          tourData?.tour_Meta_Object_Details?.meta_Keywords ||
          "book tour, private guided tour, sightseeing tour, day trip package, cultural heritage, private tour, best tours India, popular tourist attractions, skip the line tickets, private car tour, top rated tours, India travel packages, city tour, affordable day trips, private day tour, heritage sites, must see places, travel itinerary, family friendly tours"
        }
        imageUrl={tourData.tour_Image_Url}
        imageList={imagesList.map((img) => img.image_Url) || []}
        tourRating={tourData.tour_Rating || 0}
        reviewCount={tourData.tour_Review_Count || 0}
        tourReviews={reviewList}
        tourLowestPrice={lowestPrice || 0}
        tourSlug={tourData.tour_Slug_Name}
        canonicalUrl={`https://staybook.in/things-to-do/${router.query.tourId}`}
      /> */}
    <Navbar />

        <div className="">


      {isCollegeOpen && (
        <College
          imageList={imagesList}
          onClose={() => setIsCollegeOpen(false)}
          setIsGalleryOpen={setIsGalleryOpen}
          setImageIndex={setImageIndex}
        />
      )}

      {isGalleryOpen && (
        <Gallery
          imageList={imagesList}
          onClose={() => setIsGalleryOpen(false)}
          imageIndex={imageIndex}
        />
      )}

      <div className="flex w-full flex-col">
        {/* tour banner with highlights image section */}
        <TourBanner
          tourData={tourData}
          setIsCollegeOpen={setIsCollegeOpen}
          tourImageList={imagesList}
        />

        <div className="wrapper flex flex-col-reverse gap-4 border-t-2 lg:flex-row lg:items-start">
          {/* left side content */}
          <section className="w-full lg:w-[70%]">
            <p
              className="hidden md:block"
              dangerouslySetInnerHTML={{ __html: tourData.tour_Info }}
            />

            {tourPlansList ? (
              <TourPlansList
                tourData={tourData}
                tourPlansList={tourPlansList}
                planRef={planRef}
                createTourBooking={createTourBooking}
                slotModel={slotModel}
                setSlotModel={setSlotModel}
                selectedSlot={selectedSlot}
              />
            ) : (
              <div className="mb-2 flex w-full flex-col space-y-2 lg:mt-2">
                <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
                  Our Plans
                </h2>
                <div ref={planRef} className="space-y-3">
                  {[...Array(tourData.tour_Plan_Count || 2)].map((_, index) => (
                    <TourPlanCardSkeleton2 key={index} isActive={0 === index} />
                  ))}
                </div>
              </div>
            )}

            {/* about this tour */}
            {tourData.tour_Activity_Info &&
              tourData.tour_Activity_Info.length > 0 && (
                <TourActivityInfo
                  data={tourData.tour_Activity_Info}
                  tourOperatorInfo={
                    tourData.tour_Operator_Info
                      ? tourData.tour_Operator_Info
                      : null
                  }
                />
              )}

            {/* experiance section of this tour */}
            {tourData.tour_Experience_Itinerary_List &&
              tourData.tour_Experience_Itinerary_List.length > 0 && (
                <TourItinerary data={tourData.tour_Experience_Itinerary_List} />
              )}
          </section>

          {/* right side content */}
          <aside className="z-10 w-full lg:sticky lg:top-2 lg:w-[30%] lg:max-w-sm">
            <TourBookingCard
              maxAdultCount={maxAdultCount}
              lowestPrice={lowestPrice}
              setFormattedDate={setFormattedDate}
              selectionRef={selectionRefDesktop}
              availabilityRef={availabilityRef}
              scrollToSelection={scrollToSelection}
              createTourBooking={createTourBooking}
              slotModel={slotModel}
              setSlotModel={setSlotModel}
              setSelectedSlot={setSelectedSlot}
            />
          </aside>
        </div>

        <div className="wrapper z-0 my-5 bg-white">{memoizedNearbyList}</div>

        {/* Reviews about the tour if exsists */}
        {reviewList && reviewList.length > 0 && (
          <TourReviews
            data={reviewList}
            reviewsPagination={reviewList}
            lastVisibleReviewId={lastVisibleReviewId}
            setLastVisibleReviewId={setLastVisibleReviewId}
            setReviewList={setReviewList}
            tourDataCount={tourData.tour_Review_Count || reviewList.length}
            tourRatingDistribution={tourData.tour_Rating_Distribution}
            tourRating={tourData.tour_Rating}
            tourSlug={tourSlug}
          />
        )}

        {/* tour accordian data */}
        <div className="wrapper border-t-2">
          <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
            Tour Details
          </h2>

          {/* tour highlights list if exsists*/}
          {tourData.tour_Highlights_List &&
            tourData.tour_Highlights_List.length > 0 && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Highlights_List}
                sectionKey="tourHighlights"
                title="Highlights"
                type="list"
              />
            )}

          {/* tour inclusion list if exsists*/}
          {tourData.tour_Highlights_Inclusion_List &&
            tourData.tour_Highlights_Inclusion_List.length > 0 && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Highlights_Inclusion_List}
                sectionKey="tourHighlightInclusion"
                title="Included"
                type="inclusionlist"
              />
            )}

          {/* tour exclusion list if exsists*/}
          {tourData.tour_Highlights_Exclusion_List &&
            tourData.tour_Highlights_Exclusion_List.length > 0 && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Highlights_Exclusion_List}
                sectionKey="tourHighlightExclusion"
                title="Excluded"
                type="exclusionlist"
              />
            )}

          {/* tour important info if exsists */}
          {tourData.importantInformation &&
            tourData.importantInformation.length > 0 && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.importantInformation[0].importantInfoData}
                sectionKey="tourImportantInformation"
                title="Important Information"
                type="importantInfo"
              />
            )}

          {/* tour meeting point if exsists */}
          {tourData.tour_Meeting_Point &&
            tourData.tour_Meeting_Point.hasOwnProperty("map_Url") &&
            isValidUrl(tourData.tour_Meeting_Point.map_Url) && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Meeting_Point}
                sectionKey="tourMeetingPoint"
                title="Meeting Point"
                type="location"
              />
            )}

          {/* tour ending point if exsists */}
          {tourData.tour_Ending_Point &&
            tourData.tour_Ending_Point.hasOwnProperty("map_Url") &&
            isValidUrl(tourData.tour_Ending_Point.map_Url) && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Ending_Point}
                sectionKey="tourEndingPoint"
                title="Ending Point"
                type="location"
              />
            )}

          {/* tour description if exsists */}
          {tourData.tour_Description && tourData.tour_Description !== "" && (
            <TourAccordian
              handleToggle={handleToggle}
              isOpen={isOpen}
              data={String(tourData.tour_Description)
                .replaceAll("<ul>", '<ul class="list-disc ml-6 pl-2">')
                .replaceAll("<li>", '<li class="">')}
              sectionKey={"tourDescription"}
              title={"Full description"}
              type="html"
            />
          )}

          {/* tour Mustknow if exsists */}
          {tourData.tour_Must_Know_Features_List &&
            tourData.tour_Must_Know_Features_List.length > 0 && (
              <TourAccordian
                handleToggle={handleToggle}
                isOpen={isOpen}
                data={tourData.tour_Must_Know_Features_List}
                sectionKey={"tourMustKnowFeatures"}
                title={"Must know features"}
                type="list"
              />
            )}

          {/* cancellation policy if exsists */}
          <TourAccordian
            handleToggle={handleToggle}
            isOpen={isOpen}
            data={cancellationPolicy}
            sectionKey="tourCancellationPolicy"
            title="Cancellation policy"
            type="jsx"
          />
        </div>

        {/* Nearby Tours List is exsists */}
        {tourData.tour_More_Info && tourData.tour_More_Info.length > 0 && (
          <section className="wrapper border-t-2">
            <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
              More About this Tour Experience
            </h2>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: tourData.tour_More_Info }}
            />
          </section>
        )}

        {/* tour backlinks if exsists */}
        {tourData.tour_City_Covered &&
          tourData.tour_City_Covered.length > 0 && (
            <TourBacklinks data={tourData.tour_City_Covered} />
          )}

        <section className="wrapper border-t-2">
          <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
            Know Before You Go
          </h2>
          <TourAdditionalContent
            tourName={tourData.tour_Name}
            tourCity={tourData.tour_City_Covered[0]}
          />
        </section>

        <div className="wrapper py-1 md:hidden">
          <Breadcrumbs />
        </div>

        {/* bottom price section with check availability */}
        <TourBottomBar
          // lowestPrice={lowestPrice}
          // scrollToSelection={scrollToSelection}
          // availabilityRef={availabilityRef}
          // createTourBooking={createTourBooking}
        />

        {/* tour options slider */}
        {/* <TourOptionsSlideModel
          isModelOpen={openCalendarState}
          setIsModelOpen={setOpenCalendarState}
          heading={"Tour Options"}
        >
          
        </TourOptionsSlideModel> */}
      </div>
        </div>

      {/* )} */}
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { params } = context;
//   const tourSlug = params?.tourId as string;

//   if (!tourSlug) {
//     return {
//       notFound: true,
//     };
//   }

//   const res = await getDataOfSinglePackage(tourSlug);
//   // const reviews = await getDataOfTourReviews(tourSlug);
//   if (!res.status) {
//     return {
//       notFound: true,
//     };
//   }

//   const serializedTourData = JSON.stringify(res.data);
//   return {
//     props: {
//       tourData: JSON.parse(serializedTourData),
//       // reviews: reviews,
//     },
//   };
// }
