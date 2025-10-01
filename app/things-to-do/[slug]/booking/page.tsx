"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { ChevronLeftIcon } from "@heroicons/react/solid";
// import { encryptBookingInfo, decryptBookingInfo } from "@/src/utils";
// import { routerToThingsToDoPaymentPage } from "@/lib/handlers/pageHandler";
// import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
// import LoadingModel from "@/components/models/LoadingModel";
// import { TourBookingDetails } from "@/lib/classModels/bookings/tourBookingDetails";
import { useDispatch } from "react-redux";
// import { resetTourBookingInfo } from "@/lib/redux/tourBookingSlice";
// import PriceAccordian from "@/components/things-to-do/tour-page/PriceAccordian";
// import TourDetailAccordian from "@/components/things-to-do/tour-page/TourDetailAccordian";
// import BookingHead from "@/components/header/BookingHead";
import { ChevronLeftIcon } from "lucide-react";
import { decryptBookingInfo } from "@/app/lib/utils/decryptBookingInfo/decryptBookingInfo";
import { encryptBookingInfo } from "@/app/lib/utils/encryptBookingInfo/encryptBookingInfo";
import { routerToThingsToDoPaymentPage } from "@/app/lib/handler/pageHandler";
import { PageRouterQueryParams } from "@/app/classes/queryParams/PageRouterQueryParams";
import LoadingModel from "@/app/components/skeleton/LoadingModel";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { resetTourBookingInfo } from "@/app/lib/redux/tourBookingSlice";
import PriceAccordian from "@/app/components/things-to-do/PriceAccordian";
import TourDetailAccordian from "@/app/components/things-to-do/TourDetailAccordian";
import { PhoneInput } from "@/app/components/input/PhoneInput";

interface Details {
  name: string;
  idType: string;
  idNumber: string;
}

export default function BookingPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [visitorDetails, setVisitorDetails] = useState<Details[]>([]);

  const isDev = process.env.NODE_ENV === "development";
  const [tourBookingInfo, setTourBookingInfo] = useState(
    new TourBookingDetails(),
  );
  const [isTicketOnly, setIsTicketOnly] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  const [isTour, setIsTour] = useState(false);

  const [formData, setFormData] = useState({
    firstName: isDev ? "Mohit" : "",
    lastName: isDev ? "Kumar" : "",
    email: isDev ? "mk.mohit2440@gmail.com" : "",
    phoneNumber: isDev ? "8826709142" : "",
    country: "in",
    pickupPoint: isDev ? "hotel" : "",
    railwayStation: "",
    airport: "",
    hotel: isDev ? "Staybook hotel jai balaji, Paharganj, New Delhi" : "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const type = tourBookingInfo.tour_Type;

    const isTicketOnlyType = type === "Ticket-Only";
    const isActivityType = type === "Activity";
    const isTourType = !isTicketOnlyType && !isActivityType;

    setIsTicketOnly(isTicketOnlyType);
    setIsActivity(isActivityType);
    setIsTour(isTourType);
  }, [tourBookingInfo.tour_Type]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = decryptBookingInfo("tInfo");
      if (!result.status) {
        router.back();
        return;
      } else {
        const data = result.data as TourBookingDetails;
        setTourBookingInfo(data);
        dispatch(resetTourBookingInfo());
        if (data.total_Price === 0 || data.plans_List.length === 0) {
          router.back();
          return;
        }
      }
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    setVisitorDetails((prev) => {
      const count = isActivity ? 1 : tourBookingInfo.total_Adult_Count || 1;
      const newArray = Array.from({ length: count }, (_, index) => ({
        name: prev[index]?.name || "",
        idType: prev[index]?.idType || "",
        idNumber: prev[index]?.idNumber || "",
      }));
      return newArray;
    });
  }, [tourBookingInfo.total_Adult_Count, isActivity]);

  const updateVisitorDetail = (
    index: number,
    field: keyof Details,
    value: string,
  ) => {
    setVisitorDetails((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
    setFormErrors((prevErrors) => ({ ...prevErrors, visitorDetails: "" }));
  };

  // handle input change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "firstName" || name === "lastName") {
      setVisitorDetails((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          const firstName = name === "firstName" ? value : formData.firstName;
          const lastName = name === "lastName" ? value : formData.lastName;
          const combinedName =
            `${firstName?.trim() || ""} ${lastName?.trim() || ""}`.trim();

          updated[0] = {
            ...updated[0],
            name: combinedName,
          };
        }
        return updated;
      });
    }
  };

  // handle phone number change
  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
      country: country.countryCode,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
  };

  // form validation logic
  const handleFormValidation = (): boolean => {
    const newFormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      pickupPoint: "",
      railwayStation: "",
      airport: "",
      hotel: "",
      visitorDetails: "",
      idNumber: "",
    };

    const validateEmail = (email: string): boolean => {
      return /\S+@\S+\.\S+/.test(email);
    };

    if (!formData.firstName || !formData.firstName.trim()) {
      newFormErrors.firstName = "First name is required";
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      newFormErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newFormErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 7) {
      newFormErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (isTour) {
      if (!formData.pickupPoint) {
        newFormErrors.pickupPoint = "Please select a pickup point";
      }
      if (
        formData.pickupPoint === "railwayStation" &&
        !formData.railwayStation.trim()
      ) {
        newFormErrors.railwayStation = "Please enter railway station name";
      }
      if (formData.pickupPoint === "airport" && !formData.airport.trim()) {
        newFormErrors.airport = "Please enter airport name";
      }
      if (formData.pickupPoint === "hotel" && !formData.hotel.trim()) {
        newFormErrors.hotel = "Please enter hotel name";
      }
    }

    if (!isTour) {
      const expectedCount = isActivity
        ? 1
        : tourBookingInfo.total_Adult_Count || 1;

      const allNamesFilled =
        visitorDetails.length === expectedCount &&
        visitorDetails.every((visitor) => visitor.name && visitor.name.trim());

      const primaryVisitorHasID =
        visitorDetails[0] &&
        visitorDetails[0].idType &&
        visitorDetails[0].idType.trim() &&
        visitorDetails[0].idNumber &&
        visitorDetails[0].idNumber.trim();

      if (!allNamesFilled || !primaryVisitorHasID) {
        newFormErrors.visitorDetails =
          "Please fill all visitor names and provide ID details of at least one visitor";
      }
    }

    setFormErrors(newFormErrors);
    const isValid = Object.values(newFormErrors).every((error) => error === "");
    return isValid;
  };

  const goToPaymentPage = () => {
    setIsLoading(true);

    if (handleFormValidation()) {
      const obj = { ...tourBookingInfo };

      obj.user_First_Name = formData.firstName || "";
      obj.user_Last_Name = formData.lastName || "";
      obj.user_Name = `${formData.firstName} ${formData.lastName}`;
      obj.user_Email_Id = formData.email || "";
      obj.user_Country = "IN";
      obj.user_Phone_Number = formData.phoneNumber || "";
      obj.tour_Pickup_Address =
        formData.pickupPoint === "contactOperator"
          ? "Contact Operator"
          : formData.pickupPoint === "railwayStation"
            ? `Pickup from Railway Station - ${formData.railwayStation || ""}`
            : formData.pickupPoint === "airport"
              ? `Pickup from Airport - ${formData.airport || ""}`
              : formData.pickupPoint === "hotel"
                ? `Pickup from Hotel - ${formData.hotel || ""}`
                : "";
      obj.visitor_Details = visitorDetails;

      encryptBookingInfo({ ...obj }, "tInfo");
      const pageQuery = new PageRouterQueryParams(router);
      pageQuery.searchedQuery = obj.tour_Slug_Name;

      routerToThingsToDoPaymentPage("payment", pageQuery);
    }
    setIsLoading(false);
  };

  const getPlaceholder = (pickupPoint: string) => {
    switch (pickupPoint) {
      case "railwayStation":
        return "railway station name";
      case "airport":
        return "airport name";
      case "hotel":
        return "hotel name";
      default:
        return "";
    }
  };

  const planName = tourBookingInfo.plans_List[0]?.plan_Title?.toLowerCase();
  const userType =
    planName?.includes("ticket") && planName?.includes("india")
      ? "Indian"
      : "Foreigner";

  const idPatterns: { [key: string]: { regex: RegExp; message: string } } = {
    "PAN Card": {
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "PAN should be in format: ABCDE1234F",
    },
    "Aadhaar Card": {
      regex: /^\d{12}$/,
      message: "Aadhaar should be a 12-digit number",
    },
    Passport: {
      regex: /^[A-Z][0-9]{7}$/,
      message: "Passport should be 1 letter followed by 7 digits",
    },
    "Driving License": {
      regex: /^[A-Z]{2}\d{2}[0-9A-Z]{11}$/,
      message: "Driving License should be in format: XX00XXXXXXXXXXX",
    },
    "Voter Card": {
      regex: /^[A-Z]{3}[0-9]{7}$/,
      message: "Voter ID should be in format: ABC1234567",
    },
  };

  const validateIdNumber = (idType: string, idNumber: string) => {
    let errorMessage = "";

    if (userType === "Foreigner") {
      if (idType === "Passport") {
        const { regex, message } = idPatterns["Passport"];
        if (!regex.test(idNumber)) {
          errorMessage = message;
        }
      }
    } else {
      if (idPatterns[idType]) {
        const { regex, message } = idPatterns[idType];
        if (!regex.test(idNumber)) {
          errorMessage = message;
        }
      }
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      idNumber: errorMessage,
    }));
  };

  const policyPoints = isTour
    ? [
        "By confirming this booking, you acknowledge that it is <strong>non-refundable</strong> and <strong>cannot be cancelled or transferred</strong> under any circumstances. This policy is in place to maintain operational commitments with our partners.",
      ]
    : [
        "<strong>25% refund</strong> up to <strong>7 days</strong> before the tour date",
        "<strong>50% refund</strong> for cancellations <strong>3-7 days</strong> before the tour date",
        "<strong>No refund</strong> for cancellations <strong>less than 3 days</strong> before the tour date",
      ];

  return (
    <>
      {/* <BookingHead
        metaTitle={`Tour booking details`}
        metaDescription={`Confirm booking details at ${tourBookingInfo.tour_Name}`}
        metaImageUrl={tourBookingInfo.tour_Image_Url}
        canonicalUrl={`https://staybook.in/things-to-do/${tourBookingInfo.tour_Slug_Name}/booking`}
      /> */}

      {isLoading && (
        <LoadingModel isLoading={isLoading} setIsLoading={setIsLoading} />
      )}

      <section className="min-h-screen w-full pb-7">
        <h1 className="sr-only">Tour booking page</h1>

        {/* flex section for side by side view */}
        <div className="wrapper">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group flex items-center rounded p-2 pr-4 text-center hover:bg-primary"
            >
              <ChevronLeftIcon className="w-7 transition-transform group-hover:-translate-x-1" />
              <span>Step 1 of 2</span>
            </button>

            <div className="relative">
              <Image
                alt="brand logo"
                src="/brand_logo.svg"
                width={40}
                height={40}
              />
            </div>
          </div>

          {/* <div className="-mb-1 mt-2 text-lg font-bold">Booking details</div> */}
          <div className="flex flex-col gap-4 py-4 md:flex-row lg:gap-7">
            <div className="space-y-3 md:order-2 md:w-full">
              <TourDetailAccordian tourBookingInfo={tourBookingInfo} />
              <PriceAccordian tourBookingInfo={tourBookingInfo} />
              {/* <TourCancellationPolicy tourType={tourBookingInfo.tour_Type} /> */}
            </div>

            <div className="h-full w-full">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Guest Details
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="relative block text-sm font-medium text-gray-700">
                        <span className="leading-0 absolute -top-2.5 left-0 z-10 ml-3 flex items-center bg-white px-1 text-sm">
                          First name <sup className="text-red-700">*</sup>
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Use only English letters"
                          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                        />
                        {formErrors.firstName && (
                          <p className="p-1 text-xs font-medium tracking-wide text-red-800">
                            {formErrors.firstName}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="relative block text-sm font-medium text-gray-700">
                        <span className="leading-0 absolute -top-2.5 left-0 z-10 ml-3 flex items-center bg-white px-1 text-sm">
                          Last Name <sup className="text-red-700">*</sup>
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Use only English letters"
                          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                        />
                        {formErrors.lastName && (
                          <p className="p-1 text-xs font-medium tracking-wide text-red-800">
                            {formErrors.lastName}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="relative block text-sm font-medium text-gray-700">
                      <span className="leading-0 absolute -top-2.5 left-0 z-10 ml-3 flex items-center bg-white px-1 text-sm">
                        Email <sup className="text-red-700">*</sup>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                      />
                      {formErrors.email && (
                        <p className="p-1 text-xs font-medium tracking-wide text-red-800">
                          {formErrors.email}
                        </p>
                      )}
                    </label>
                  </div>

                  <PhoneInput
                    onChanged={handlePhoneChange}
                    value={formData.phoneNumber}
                    required={true}
                    formErrors={formErrors}
                  />

                  {/* Pick point */}
                  {isTour && (
                    <div className="tracking-wide">
                      <Label forKey="pickupPoint">Pick up point</Label>

                      <div className="">
                        <select
                          name="pickupPoint"
                          value={formData.pickupPoint}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                          required
                        >
                          <option value="">Select pick up point</option>
                          <option value="railwayStation">
                            Railway Station
                          </option>
                          <option value="airport">Airport</option>
                          <option value="hotel">Hotel</option>
                          <option value="contactOperator">
                            Contact Operator
                          </option>
                        </select>

                        {/* Conditionally show input if selection requires additional info */}
                        {(formData.pickupPoint === "railwayStation" ||
                          formData.pickupPoint === "airport" ||
                          formData.pickupPoint === "hotel") && (
                          <input
                            type="text"
                            name={formData.pickupPoint}
                            placeholder={`Enter ${getPlaceholder(formData.pickupPoint)}`}
                            className="placeholder:text-muted-foreground mt-3 h-10 w-full rounded border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={formData[formData.pickupPoint]}
                            onChange={handleInputChange}
                            required
                          />
                        )}

                        {/* Error messages */}
                        {formData.pickupPoint === "railwayStation" &&
                          formErrors.railwayStation && (
                            <p className="text-xs tracking-wider text-red-800">
                              {formErrors.railwayStation}
                            </p>
                          )}
                        {formData.pickupPoint === "airport" &&
                          formErrors.airport && (
                            <p className="text-xs tracking-wider text-red-800">
                              {formErrors.airport}
                            </p>
                          )}
                        {formData.pickupPoint === "hotel" &&
                          formErrors.hotel && (
                            <p className="text-xs tracking-wider text-red-800">
                              {formErrors.hotel}
                            </p>
                          )}
                        {formErrors.pickupPoint && (
                          <p className="text-xs tracking-wider text-red-800">
                            {formErrors.pickupPoint}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {!isTour && (
                    <div className="mt-4 border-t border-gray-300 pt-3">
                      <p className="mb-5 font-medium tracking-wide">
                        <strong>Visitor Details</strong>{" "}
                        <span className="text-xs">
                          (Details will get verified at monuments.)
                        </span>
                      </p>

                      <div className="space-y-4">
                        {[
                          ...Array(
                            isActivity
                              ? 1
                              : tourBookingInfo.total_Adult_Count || 1,
                          ),
                        ].map((_, index) => (
                          <div key={index}>
                            <label className="relative block text-sm font-medium text-gray-700">
                              <span className="leading-0 absolute -top-2.5 left-0 z-10 ml-3 flex items-center bg-white px-1 text-sm">
                                {index === 0
                                  ? "Primary Visitor"
                                  : `Visitor ${index + 1} Name`}{" "}
                                <sup className="text-red-700">*</sup>
                              </span>
                              <input
                                type="text"
                                value={visitorDetails[index]?.name || ""}
                                onChange={(e) =>
                                  updateVisitorDetail(
                                    index,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder={`Enter visitor ${index + 1} name`}
                                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                                required
                              />
                            </label>
                          </div>
                        ))}

                        {/* ID Type and ID Number for Primary Visitor Only */}
                        <div className="relative mt-4 w-full border-t border-gray-300 pt-3">
                          <Label forKey="idType">ID Type</Label>
                          <select
                            value={visitorDetails[0]?.idType || ""}
                            onChange={(e) =>
                              updateVisitorDetail(0, "idType", e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                            required
                          >
                            <option value="">Select ID Type</option>

                            {tourBookingInfo.tour_Type === "Activity" ? (
                              <>
                                <option value="Passport">Passport</option>
                                <option value="PAN Card">PAN Card</option>
                                <option value="Driving License">
                                  Driving License
                                </option>
                                <option value="Voter Card">Voter Card</option>
                                <option value="Other">Other</option>
                              </>
                            ) : userType === "Indian" ? (
                              <>
                                <option value="Passport">Passport</option>
                                <option value="PAN Card">PAN Card</option>
                                <option value="Driving License">
                                  Driving License
                                </option>
                                <option value="Voter Card">Voter Card</option>
                                <option value="Other">Other</option>
                              </>
                            ) : (
                              <>
                                <option value="Passport">Passport</option>
                                <option value="National ID">National ID</option>
                              </>
                            )}
                          </select>
                          {visitorDetails[0]?.idType && (
                            <input
                              type="text"
                              value={visitorDetails[0]?.idNumber || ""}
                              onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                updateVisitorDetail(0, "idNumber", value);
                                validateIdNumber(
                                  visitorDetails[0]?.idType,
                                  value,
                                );
                                setFormErrors((prevErrors) => ({
                                  ...prevErrors,
                                  "primaryVisitor.idNumber": "",
                                }));
                              }}
                              className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-0"
                              placeholder="Enter ID Number"
                              required
                            />
                          )}
                        </div>
                      </div>
                      {formErrors.visitorDetails && (
                        <p className="p-1 text-xs font-medium tracking-wide text-red-800">
                          {formErrors.visitorDetails}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <button
                    onClick={goToPaymentPage}
                    className="mt-2 w-full rounded-lg bg-secondary px-4 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
                  >
                    Proceed to payment
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Secure payment
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="rounded-xl border p-4"> */}
              {/* <div className="flex w-full flex-col items-center gap-x-4 sm:flex-row">
                  <div className="mb-3 w-full tracking-wide">
                    <Label forKey="firstName">First Name</Label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className="placeholder:text-muted-foreground h-10 w-full rounded border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs tracking-wider text-red-800">
                      {formErrors.firstName}
                    </p>
                  </div>
                  <div className="mb-3 w-full tracking-wide">
                    <Label forKey="lastName">Last Name</Label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      className="placeholder:text-muted-foreground h-10 w-full rounded border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs tracking-wider text-red-800">
                      {formErrors.lastName}
                    </p>
                  </div>
                </div>
                <div className="mb-3 tracking-wide">
                  <Label forKey="email">
                    Email Address{" "}
                    <span className="hidden text-xs sm:inline">
                      (Booking voucher will be sent to this email address)
                    </span>
                  </Label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="placeholder:text-muted-foreground h-10 w-full rounded border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs tracking-wider text-red-800">
                    {formErrors.email}
                  </p>
                </div>
                <div className="mb-3 tracking-wide">
                  <Label forKey="phone">Phone No.</Label>
                  <PhoneInput
                    country={formData.country}
                    inputProps={{
                      name: "phoneNumber",
                      required: true,
                    }}
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    countryCodeEditable={false}
                    buttonStyle={{
                      padding: "2px",
                    }}
                    inputClass="!placeholder:text-muted-foreground !h-10 !w-full !rounded !border !bg-transparent !pl-14 !py-1 !shadow-sm !transition-colors !focus-visible:outline-none !focus-visible:border-secondary !focus-visible:ring-4 !disabled:cursor-not-allowed !disabled:opacity-50 !md:text-sm"
                  />
                  <p className="text-xs tracking-wider text-red-800">
                    {formErrors.phoneNumber}
                  </p>
                </div> */}

              {/* <div className="mt-3">
                  <button
                    type="submit"
                    onClick={goToPaymentPage}
                    className="w-full rounded bg-secondary p-2.5 px-7 text-light hover:bg-secondary/75"
                  >
                    Proceed to payment
                  </button>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const Label = ({
  forKey,
  children,
}: {
  forKey: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={forKey}
      className="text-sm font-medium leading-none text-secondary"
    >
      {children}
    </label>
  );
};
