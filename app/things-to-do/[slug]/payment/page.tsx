"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
// import { ChevronLeftIcon } from "@heroicons/react/solid";

// import {
//   priceCurrencyConvertor,
//   generateAlphaNumericUniqueId,
//   decryptBookingInfo,
//   encryptData,
// } from "@/src/utils";

// import { routerToTourConfirmationPage } from "@/lib/handlers/pageHandler";
// import { makeRazorpayPaymentForTour } from "@/lib/handlers/razorpayHandler";
// import { TourBookingDetails } from "@/lib/classModels/bookings/tourBookingDetails";
// import { tourPaymentInfoCreation } from "@/lib/handlers/client";
// import PriceAccordian from "@/components/things-to-do/tour-page/PriceAccordian";
// import TourDetailAccordian from "@/components/things-to-do/tour-page/TourDetailAccordian";
// import BookingHead from "@/components/header/BookingHead";
// import PaymentSelection from "@/components/payment/PaymentSelection";
import { useSelector } from "react-redux";
// import { selectCurrencySymbol } from "@/lib/redux/tourBookingSlice";
import { toast } from "sonner";
import { ChevronLeftIcon } from "lucide-react";
import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
import { generateAlphaNumericUniqueId } from "@/app/lib/utils/generateAlphaNumericUniqueId/generateAlphaNumericUniqueId";
import { decryptBookingInfo } from "@/app/lib/utils/decryptBookingInfo/decryptBookingInfo";
import { encryptData } from "@/app/lib/utils/dataEncryption/dataEncryption";
import { routerToTourConfirmationPage } from "@/app/lib/handler/pageHandler";
import { makeRazorpayPaymentForTour } from "@/app/lib/handler/razorpayHandler";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { tourPaymentInfoCreation } from "@/app/lib/handler/client";
import PriceAccordian from "@/app/components/things-to-do/PriceAccordian";
import TourDetailAccordian from "@/app/components/things-to-do/TourDetailAccordian";
import PaymentSelection from "@/app/components/payment/PaymentSelection";
import { selectCurrencySymbol } from "@/app/lib/redux/tourBookingSlice";

export default function PaymentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const currencyCode = useSelector(selectCurrencySymbol);
  const [tourBookingInfo, setTourBookingInfo] = useState(
    new TourBookingDetails(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("fullPayment");
  const [selectedMethod, setSelectedMethod] = useState<string>("payu");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showMethods, setShowMethods] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorModal, setErrorModal] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = decryptBookingInfo("tInfo");
      if (!result.status) {
        router.back();
        return;
      } else {
        const data = result.data as TourBookingDetails;
        setTourBookingInfo(data);
        if (data.total_Price === 0 || data.plans_List.length === 0) {
          router.back();
          return;
        }
      }
    }
    setIsLoading(false);
  }, [router]);

  const razorPayHandler = async () => {
    setIsLoading(true);
    tourBookingInfo.tour_Handling_Charges = 0;
    tourBookingInfo.payment_Type = "Prepaid payment";
    tourBookingInfo.paying_Amount = Math.ceil(tourBookingInfo.total_Price);
    tourBookingInfo.payment_Gateway = "razorpay";
    tourBookingInfo.booking_Created_From = "staybook.in";
    tourBookingInfo.receipt_Id = generateAlphaNumericUniqueId(14);
    tourBookingInfo.booking_Id = generateAlphaNumericUniqueId();

    const response: any = await makeRazorpayPaymentForTour(
      router,
      tourBookingInfo,
      setErrorMessage,
      setErrorModal,
      setIsLoading,
    );

    setIsLoading(false);
  };
  const payuHandler = async () => {
    setIsLoading(true);
    tourBookingInfo.tour_Handling_Charges = 0;
    tourBookingInfo.payment_Type = "Prepaid payment";
    tourBookingInfo.paying_Amount = Math.ceil(tourBookingInfo.total_Price);
    tourBookingInfo.payment_Gateway = "payu";
    tourBookingInfo.booking_Created_From = "staybook.in";
    tourBookingInfo.receipt_Id = generateAlphaNumericUniqueId(14);
    tourBookingInfo.booking_Id = generateAlphaNumericUniqueId();
    tourBookingInfo.booking_Redirect_Url = tourBookingInfo.booking_Redirect_Url = pathname || "/";
    tourBookingInfo.booking_Confirmation_Url = `https://staybook.in/bookingInformation/things-to-do/${tourBookingInfo.booking_Id}?booking_status=Booking Successful&tour_Id=${tourBookingInfo.tour_Slug_Name}&tour_Name=${tourBookingInfo.tour_Name}&user_Name=${tourBookingInfo.user_Name}&user_Email=${tourBookingInfo.user_Email_Id}&user_Phone=${tourBookingInfo.user_Phone_Number}&booking_receipt=${tourBookingInfo.receipt_Id}`;

    await tourPaymentInfoCreation(tourBookingInfo);

    const cipherResponse = encryptData(tourBookingInfo);

    const res = await fetch("/api/payu/initializePayu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cipherResponse }),
    });

    const html = await res.text();

    document.open();
    document.write(html);
    document.close();
    setIsLoading(false);
  };

  const handlePartialPayuPayment = async () => {
    setIsLoading(true);

    tourBookingInfo.tour_Handling_Charges = 0;
    tourBookingInfo.payment_Type = "Partial payment";
    tourBookingInfo.paying_Amount = Math.ceil(
      +tourBookingInfo.tour_Partial_Payment_Percentage ||
        50 * 0.01 * tourBookingInfo.total_Price,
    );
    tourBookingInfo.payment_Gateway = "razorpay";
    tourBookingInfo.booking_Created_From = "staybook.in";
    tourBookingInfo.receipt_Id = generateAlphaNumericUniqueId(14);
    tourBookingInfo.booking_Id = generateAlphaNumericUniqueId();
    tourBookingInfo.booking_Redirect_Url = tourBookingInfo.booking_Redirect_Url = pathname || "/";
    tourBookingInfo.booking_Confirmation_Url = `https://staybook.in/bookingInformation/things-to-do/${tourBookingInfo.booking_Id}?booking_status=Booking Successful&tour_Id=${tourBookingInfo.tour_Slug_Name}&tour_Name=${tourBookingInfo.tour_Name}&user_Name=${tourBookingInfo.user_Name}&user_Email=${tourBookingInfo.user_Email_Id}&user_Phone=${tourBookingInfo.user_Phone_Number}&booking_receipt=${tourBookingInfo.receipt_Id}`;

    await tourPaymentInfoCreation(tourBookingInfo);

    const cipherResponse = encryptData(tourBookingInfo);

    const res = await fetch("/api/payu/initializePayu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cipherResponse }),
    });

    const html = await res.text();

    document.open();
    document.write(html);
    document.close();
    setIsLoading(false);
  };

  const handlePartialRazorPayPayment = async () => {
    setIsLoading(true);

    tourBookingInfo.tour_Handling_Charges = 0;
    tourBookingInfo.payment_Type = "Partial payment";
    tourBookingInfo.paying_Amount = Math.ceil(
      +tourBookingInfo.tour_Partial_Payment_Percentage ||
        50 * 0.01 * tourBookingInfo.total_Price,
    );
    tourBookingInfo.payment_Gateway = "razorpay";
    tourBookingInfo.booking_Created_From = "staybook.in";
    tourBookingInfo.receipt_Id = generateAlphaNumericUniqueId(14);
    tourBookingInfo.booking_Id = generateAlphaNumericUniqueId();

    const response: any = await makeRazorpayPaymentForTour(
      router,
      tourBookingInfo,
      setErrorMessage,
      setErrorModal,
      setIsLoading,
    );

    setIsLoading(false);
  };

  // postpaid payment handler
  const handelPayLater = async () => {
    setIsLoading(true);

    tourBookingInfo.tour_Handling_Charges = 0;
    tourBookingInfo.paying_Amount = 0;
    tourBookingInfo.booking_Created_From = "staybook.in";
    tourBookingInfo.receipt_Id = generateAlphaNumericUniqueId(14);
    tourBookingInfo.booking_Id = generateAlphaNumericUniqueId();

    const cipherBookingInfo = encryptData(tourBookingInfo);

    const res = await fetch("/api/booking/tourBooking", {
      method: "POST",
      body: JSON.stringify({
        cipherBookingInfo: cipherBookingInfo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status) {
      routerToTourConfirmationPage(router, tourBookingInfo);
    }
    setIsLoading(false);
  };

  const handleSelectPaymentMethod = (e: string) => {
    setSelectedOption(e);
  };

  const handleProceed = (method: string) => {
    if (method === "") {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
      toast.error("Please select a payment method");
      return;
    }
    if (selectedOption === "partialPayment") {
      if (method === "razorpay") {
        handlePartialRazorPayPayment();
      } else {
        handlePartialPayuPayment();
      }
    } else {
      if (method === "razorpay") {
        razorPayHandler();
      } else {
        payuHandler();
      }
    }
  };

  const paymentOptions = [
    {
      key: "prepaid_Payment",
      method: "fullPayment",
      title: "Full Payment",
      amount: tourBookingInfo.total_Price,
      buttonText: "Pay now",
    },
    {
      key: "partial_Payment",
      method: "partialPayment",
      title: "Partial Payment",
      amount: Math.ceil(
        +tourBookingInfo.tour_Partial_Payment_Percentage *
          0.01 *
          tourBookingInfo.total_Price ||
          50 * 0.01 * tourBookingInfo.total_Price,
      ),
      buttonText: "Pay now",
    },
    {
      key: "postpaid_Payment",
      method: "postPayment",
      title: "Pay on Arrival",
      amount: Math.ceil(tourBookingInfo.total_Price),
      buttonText: "Pay Later",
      onClick: handelPayLater,
    },
  ].filter((option) => tourBookingInfo.tour_Payment_Option[option.key]);

  return (
    <>
      {/* <BookingHead
        metaTitle={`Tour payments details`}
        metaDescription={`Confirm booking details at ${tourBookingInfo.tour_Name}`}
        metaImageUrl={tourBookingInfo.tour_Image_Url}
        canonicalUrl={`https://staybook.in/things-to-do/${tourBookingInfo.tour_Slug_Name}/booking`}
      /> */}

      {isLoading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90">
          <div className="space-y-4">
            <div className="relative aspect-square w-32 text-center">
              <Image
                alt="loading_image"
                src="/brand_logo.svg"
                width={100}
                height={100}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-center font-dream text-2xl tracking-widest text-white">
              Please wait
            </p>
          </div>
        </div>
      )}

      <section className="h-fit w-full pb-7">
        <h1 className="sr-only">Payment page</h1>

        {/* flex section for side by side view */}
        <div className="wrapper">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group flex items-center rounded p-2 pr-4 text-center hover:bg-primary"
            >
              <ChevronLeftIcon className="w-7 transition-transform group-hover:-translate-x-1" />
              <span>Step 2 of 2</span>
            </button>

            <div className="relative">
              <Image alt="" src="/brand_logo.svg" width={40} height={40} />
            </div>
          </div>

          <div className="-mb-1 mt-2 text-lg font-bold">Payment details</div>
          <div className="flex flex-col gap-4 py-4 md:flex-row lg:gap-7">
            <div className="space-y-3 md:order-2 md:w-full">
              <TourDetailAccordian tourBookingInfo={tourBookingInfo} />
              <PriceAccordian tourBookingInfo={tourBookingInfo}
              selectedOption={selectedOption} />
              <button
                onClick={() => handleProceed("")}
                disabled={!selectedOption || (showMethods && !selectedMethod)}
                className={`mb-4 hidden w-full rounded-xl px-6 py-4 font-semibold transition-all duration-200 md:block ${
                  selectedOption && (!showMethods || selectedMethod)
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg hover:from-teal-700 hover:to-teal-800"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                {selectedOption === "hotel"
                  ? "Confirm Booking"
                  : selectedMethod
                    ? `Pay      ${
                        selectedOption === "prepaid"
                          ? currencyCode + tourBookingInfo.total_Price
                          : selectedOption === "partial"
                            ? currencyCode +
                              Math.ceil(
                                tourBookingInfo.total_Price -
                                  (tourBookingInfo.total_Price *
                                    tourBookingInfo.tour_Partial_Payment_Percentage) /
                                    100,
                              )
                            : selectedOption === "partialPayment"
                        ? currencyCode + Math.ceil(tourBookingInfo.total_Price / 2)
                        : currencyCode + tourBookingInfo.total_Price
                      }`
                    : "Select Payment Method"}
              </button>
              {/* <TourCancellationPolicy tourType={tourBookingInfo.tour_Type} /> */}
            </div>

            <div className="h-fit w-full rounded-xl border p-4">
              <div>
                <span className="text-lg font-semibold text-secondary">
                  How would you like to pay ?
                </span>
                {/* <div className="flex w-full space-x-4 py-3">
                  <div
                    className={`relative h-[60px] w-[145px] cursor-pointer rounded-xl ${paymentGateWay === "razorpay" ? "border border-secondary shadow-md" : "border-[1px] hover:shadow-md"}`}
                    onClick={() => setPaymentGateWay("razorpay")}
                  >
                    <input
                      type="checkbox"
                      checked={paymentGateWay === "razorpay"}
                      readOnly
                      className="absolute left-1.5 top-1.5 h-5 w-5 appearance-none rounded-full checked:bg-secondary"
                    />
                    <Image
                      alt="loading_image"
                      src="/icons/things-to-do/razorpe.svg"
                      width={200}
                      height={100}
                      priority
                      className="h-full w-full px-6"
                    />
                  </div>
                  <div
                    className={`relative h-[60px] w-[145px] cursor-pointer rounded-xl ${paymentGateWay === "airpay" ? "border border-secondary" : "border-[1px] hover:shadow-md"}`}
                    onClick={() => setPaymentGateWay("payu")}
                  >
                    <input
                      type="checkbox"
                      checked={paymentGateWay === "payu"}
                      readOnly
                      className="absolute left-1.5 top-1.5 h-5 w-5 appearance-none rounded-full checked:bg-secondary"
                    />

                    <Image
                      alt="loading_image"
                      src="/payu.svg"
                      width={200}
                      height={100}
                      priority
                      className="h-full w-full px-6"
                    />
                  </div>
                </div> */}
                <div className="my-3 flex w-full flex-col space-y-4">
                  {paymentOptions.map(
                    ({ method, title, amount, buttonText, onClick }) => (
                      <div
                        key={method}
                        onClick={() => handleSelectPaymentMethod(method)}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 shadow-sm transition-all duration-200 ${
                          selectedOption === method
                            ? "border-secondary bg-secondary/5 shadow-md"
                            : "border-gray-200 hover:border-secondary hover:bg-gray-50"
                        }`}
                      >
                        {/* Left section with icon + title */}
                        <div className="flex items-start gap-3">
                          {/* Circle radio indicator */}
                          <div
                            className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              selectedOption === method
                                ? "border-secondary bg-secondary"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedOption === method && (
                              <div className="h-2.5 w-2.5 rounded-full bg-white" />
                            )}
                          </div>

                          {/* Text */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Paying Amount{" "}
                              <span className="font-medium text-gray-700">
                                (incl. taxes)
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Right section with price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            {tourBookingInfo.tour_Currency_Code === "INR"
                              ? "₹"
                              : tourBookingInfo.tour_Currency_Symbol}
                            {priceCurrencyConvertor(
                              amount,
                              tourBookingInfo.tour_Currency_Value,
                            )?.toLocaleString("en-IN")}
                          </p>
                          {/* {buttonText && (
                            <button
                              onClick={onClick}
                              className="mt-1 rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-white hover:bg-secondary/90"
                            >
                              {buttonText}
                            </button>
                          )} */}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <PaymentSelection
                  selectedOption={paymentMethod}
                  setSelectedOption={setPaymentMethod}
                  onClick={(method: string) => handleProceed(method)}
                />
              </div>

              <p className="mt-3">
                By clicking Pay Now, you agree to Staybook Customer Terms of Use
                and Privacy Statement, and you also agree to enter into a direct
                contract with the supplier of the experience as described on the
                listing page You also consent to receive updates from satybook,
                including inspirations, tips, and other information, from which
                you can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="sticky bottom-0 block border-t border-gray-200 bg-white p-4 md:hidden">
        <div className="mx-auto max-w-md">
          <button
            onClick={() => handleProceed("")}
            disabled={!selectedOption || (showMethods && !selectedMethod)}
            className={`w-full rounded-xl px-6 py-4 font-semibold transition-all duration-200 ${
              selectedOption && (!showMethods || selectedMethod)
                ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg hover:from-teal-700 hover:to-teal-800"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            {selectedOption === "hotel"
              ? "Confirm Booking"
              : selectedMethod
                ? `Pay      ${
                    selectedOption === "prepaid"
                      ? currencyCode + tourBookingInfo.total_Price
                      : selectedOption === "partial"
                        ? currencyCode +
                          Math.ceil(
                            tourBookingInfo.total_Price -
                              (tourBookingInfo.total_Price *
                                tourBookingInfo.tour_Partial_Payment_Percentage) /
                                100,
                          )
                        : currencyCode + tourBookingInfo.total_Price
                  }`
                : "Select Payment Method"}
          </button>
        </div>
      </div>
    </>
  );
}
