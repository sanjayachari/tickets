/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useMemo, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
// import SlideInOut from "@/components/widgets/Overlay/SlideInOut";
// import { ArrowRightIcon } from "@heroicons/react/outline";
// import { ArrowLeftIcon } from "@heroicons/react/solid";
// import { getDataOfTourReviews } from "@/lib/firebase/thingsToDoHandler";
import SlideInOut from "../widgers/overlay/SlideInOut";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getDataOfTourReviews } from "@/app/lib/firebase/thingsToDoHandler";

interface Review {
  review_Id: string;
  reviewer_Name: string;
  review_Title: string;
  review_Description: string;
  review_Rating: number;
  replies?: string[];
  review_User_Name: string;
}

interface Props {
  data: any;
  reviewsPagination: any;
  lastVisibleReviewId: any;
  setLastVisibleReviewId: any;
  setReviewList: any;
  tourDataCount: any;
  tourRatingDistribution: any;
  tourRating: any;
  tourSlug: any;
}

const MAX_VISIBLE_PAGES = 5; // Maximum number of visible page buttons

// Separate component for each review item to manage its own expanded state
function ReviewItem({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const sentences = review.review_Description.split(".").filter(Boolean);

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      {/* Review Header */}
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-3xl text-gray-400" />
        <div>
          <h3 className="text-md font-semibold">{review.review_User_Name}</h3>
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(review.review_Rating) ? (
                <AiFillStar key={i} className="text-lg" />
              ) : i === Math.floor(review.review_Rating) &&
                review.review_Rating % 1 !== 0 ? (
                <AiTwotoneStar key={i} className="text-lg" />
              ) : (
                <AiOutlineStar key={i} className="text-lg" />
              ),
            )}
            <span className="ml-1 text-gray-600">
              ({review.review_Rating.toFixed(1)})
            </span>
          </div>
        </div>
      </div>

      {/* Review Description */}
      <div className="mt-2 space-y-2 text-gray-700">
        {isExpanded
          ? sentences.map((sentence, index) => (
              <p key={index}>{sentence.trim()}.</p>
            ))
          : sentences
              .slice(0, 3)
              .map((sentence, index) => <p key={index}>{sentence.trim()}.</p>)}
        {sentences.length > 3 && (
          <button
            className="GA_4_TTD_TOUR_REVIEWS_TRIGGER mt-2 text-sm font-medium text-primary"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Tour Guide Reply */}
      <div className="mt-3 border-l-2 border-gray-300 pl-6">
        <div className="flex items-start text-sm text-gray-800">
          <span className="mr-2 text-gray-500">↳</span>
          <div>
            <strong className="text-gray-600">Tour Guide:</strong>
            {review.review_Rating >= 4
              ? `Thank you, ${review.review_User_Name}, for your kind words! We're thrilled that you enjoyed the tour. We look forward to hosting you again! 😊`
              : review.review_Rating === 3
                ? `Thanks for your feedback, ${review.review_User_Name}. We appreciate your honesty and will work on improving our services. We hope to serve you better next time!`
                : `We're sorry to hear that your experience wasn't as expected, ${review.review_User_Name}. Your feedback is invaluable, and we'll take it seriously to improve our tours.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TourReviews({
  data,
  reviewsPagination,
  lastVisibleReviewId,
  setLastVisibleReviewId,
  setReviewList,
  tourDataCount,
  tourRatingDistribution,
  tourRating,
  tourSlug,
}: Props) {
  const [showAll, setShowAll] = useState<boolean>(false);
  let currentPage = 1;
  const reviewsPerPage = 4;
  const reviewsRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  const [pageCount, setPageCount] = useState(0);

  // const { averageRating, starCount } = useMemo(() => {
  //   const totalReviews = data.length;
  //   const totalRating = data.reduce(
  //     (sum, review) => sum + review.review_Rating,
  //     0,
  //   );
  //   const avgRating = totalReviews
  //     ? (totalRating / totalReviews).toFixed(1)
  //     : "0.0";
  //   const stars = [0, 0, 0, 0, 0];
  //   data.forEach((review) => {
  //     const roundedRating = Math.round(review.review_Rating);
  //     if (roundedRating >= 1 && roundedRating <= 5) {
  //       stars[roundedRating - 1] += 1;
  //     }
  //   });
  //   return { averageRating: avgRating, starCount: stars.reverse() };
  // }, [data]);

  const totalPages = Math.ceil(data.length / reviewsPerPage);
  const currentReviews = data.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  // Calculate start page for constant window of MAX_VISIBLE_PAGES
  let startPage = 1;
  if (totalPages > MAX_VISIBLE_PAGES) {
    if (currentPage <= Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = 1;
    } else if (currentPage > totalPages - Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
    } else {
      startPage = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
    }
  }

  const [firstVisibleReviewId, setFirstVisibleReviewId] = useState<any | null>(
    null,
  );

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pageCount]);

  const paginationReviews = async (direction: "forward" | "backward") => {
    try {
      const startDocId =
        direction === "forward" ? lastVisibleReviewId : firstVisibleReviewId;

      const reviews = await getDataOfTourReviews(
        tourSlug,
        startDocId,
        direction,
      );

      if (!reviews?.data || reviews.data.length === 0) return;

      setReviewList(reviews.data);
      setLastVisibleReviewId(reviews.lastVisibleId); // for Next
      setFirstVisibleReviewId(reviews.firstVisibleId); // for Prev
      setPageCount((prev) => {
        if (direction === "forward") {
          return prev + 1;
        }
        return prev - 1;
      });

      // Disable scroll on first render
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const starCount = [
    tourRatingDistribution["5"],
    tourRatingDistribution["4"],
    tourRatingDistribution["3"],
    tourRatingDistribution["2"],
    tourRatingDistribution["1"],
  ];

  return (
    <section id="reviews" className="wrapper border-t-2 pt-5" ref={reviewsRef}>
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Ratings Sidebar - Adjust for Mobile */}
        <div className="w-full self-start rounded-lg border bg-white p-4 md:sticky md:top-20 md:w-1/4">
          <h3 className="text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
            Customer Ratings
          </h3>
          <div className="text-3xl font-bold text-yellow-500">
            {tourRating} ★
          </div>
          <p className="text-gray-600">{tourDataCount} Reviews</p>
          <div className="mt-3 space-y-1">
            {starCount.map((count, index) => {
              const percentage =
                tourDataCount > 0 ? (count / tourDataCount) * 100 : 0;
              return (
                <div key={index} className="flex items-center text-sm">
                  <span className="w-10">{5 - index} ★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="w-full space-y-6 md:w-3/4">
          {currentReviews.map((item : any , index : number) => (
            <ReviewItem key={index} review={item} />
          ))}

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-4 space-x-2">
            {/* Previous Button */}
            <button
              disabled={pageCount === 0}
              onClick={() => paginationReviews("backward")}
              className={`${pageCount === 0 && "cursor-not-allowed"} flex items-center gap-2 disabled:text-gray-400`}
            >
              <ArrowLeftIcon className="h-6 w-6" />
              Prev
            </button>

            <button
              disabled={!lastVisibleReviewId}
              onClick={() => paginationReviews("forward")}
              className={`${!lastVisibleReviewId && "cursor-not-allowed"} flex  items-center gap-2 disabled:text-gray-400`}
            >
              Next <ArrowRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <SlideInOut
        isModelOpen={showAll}
        setIsModelOpen={setShowAll}
        data={data}
        keyValue={"special"}
        heading={"Tour Reviews"}
      />
    </section>
  );
}
