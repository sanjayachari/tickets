// import ReviewCard from "@/components/common/ReviewCard";
// import AmenityCard from "@/components/hotel/Amenity/AmenityCard";
// import PlaceCard from "@/components/hotel/Place/PlaceCard";
// import FullReviewCard from "@/components/hotel/Rating/FullReviewCard";
// import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useEffect, useRef } from "react";
import ReviewCard from "../../common/ReviewCard";
import AmenityCard from "../../common/AmenityCard";
import PlaceCard from "../../common/PlaceCard";
import FullReviewCard from "../../rating/FullReviewCard";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
  isModelOpen: boolean;
  setIsModelOpen: any;
  data: any;
  data1?: any;
  keyValue: string;
  heading: string;
  selectedReview?: number | null;
};

export default function SlideInOut({
  isModelOpen,
  setIsModelOpen,
  data,
  data1,
  keyValue,
  heading,
  selectedReview,
}: Props) {

  useEffect(() => {
    if (isModelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModelOpen]);

  // only for special reviews
  const reviewRefs = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    if (isModelOpen && selectedReview && reviewRefs.current[selectedReview]) {
      reviewRefs.current[selectedReview]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isModelOpen, selectedReview]);

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-screen w-full transform transition-transform duration-300
      ${isModelOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* backdrop */}
      <div
        onClick={() => setIsModelOpen(false)}
        className="fixed inset-0 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-xl space-y-0.5 bg-light p-4 text-dark">
        <div
          onClick={() => setIsModelOpen(false)}
          className="mb-4 flex h-10 w-full items-end p-1 pr-2.5"
        >
          <button>
            <ChevronLeftIcon className="-ml-2 h-8 w-8 hover:cursor-pointer" />
          </button>
          <h3 className="text-2xl font-bold tracking-wide text-secondary">
            {heading}
          </h3>
        </div>

        <div className="container-snap h-full overflow-y-scroll pb-24">
          {keyValue == "amenities" ? (
            <div>
              {!!data?.length &&
                data.map((item: any, idx: number) => (
                  <AmenityCard key={item.amenity_Id} amenity={item} />
                ))}
            </div>
          ) : keyValue == "reviews" ? (
            <div className="space-y-4">
  {/* Render Google reviews */}
  {!!data?.length &&
    data.map((item: any, index: number) => (
      <FullReviewCard
        key={`google-review-${index}`}
        user_image_url={item.user_image_url}
        user_name={item.user_name}
        review_type_name={item.review_type?.review_type_name}
        user_comment={item.user_comment}
        user_rating={item.user_rating}
        review_posting_time={item.review_posting_time}
      />
    ))}

  {/* Render Staybook reviews */}
{data1?.length > 0 && (
  <div className="mt-6">
    {/* Separator / Heading */}
    <h3 className="text-lg font-semibold text-gray-700 mb-4">User Reviews</h3>
    <div className="space-y-4">
      {data1.map((item: any, index: number) => {
        let reviewDate = "";

        if (item.review_Created_At) {
          if (typeof item.review_Created_At.toDate === "function") {
            // Firestore Timestamp
            reviewDate = item.review_Created_At
              .toDate()
              .toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
          } else if (item.review_Created_At.seconds) {
            // Plain object with seconds/nanoseconds
            reviewDate = new Date(item.review_Created_At.seconds * 1000).toLocaleString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
          }
        }

        return (
          <FullReviewCard
            key={`staybook-review-${index}`}
            user_image_url={item.review_User_Image_Url}
            user_name={item.review_User_Name}
            review_type_name={item.review_Type}
            user_comment={item.review_Description}
            user_rating={item.review_Rating_Level}
            review_posting_time={reviewDate}
            average_review={item.average_review}
            review_images={item.review_Image_Info_List}
          />
        );
      })}
    </div>
  </div>
)}


</div>

          ) : keyValue == "places" ? (
            <div>
              {!!data?.length &&
                data.map((item: any, index: number) => (
                  <PlaceCard key={item.place_Id} place={item} />
                ))}
            </div>
          ) : keyValue == "faq" ? (
            <div className="space-y-4">
              {!!data?.length &&
                data.map((item: any, index: number) => (
                  <div
                    key={`faq-item-${index}`}
                    className="py-1 text-sm lg:text-base"
                  >
                    <h3 className="font-semibold text-secondary">
                      Q. {item.name}
                    </h3>
                    <h4 className="text-justify">
                      Ans. {item.acceptedAnswer.text}
                    </h4>
                  </div>
                ))}
            </div>
          ) : keyValue == "hotel_info" ? (
            <div>
              <p dangerouslySetInnerHTML={{ __html: data }} />
            </div>
          ) : keyValue === "special" ? (
            <div className="space-y-4">
              {!!data?.length &&
                data.map((item: any, index: number) => (
                  <div
                    key={`review-${index}`}
                    ref={(el) => {
                      reviewRefs.current[index] = el;
                    }}
                  >
                    <ReviewCard
                      review={item}
                      isSelected={selectedReview === index}
                    />
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
